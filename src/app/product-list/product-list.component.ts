import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../product.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {GetImageService} from "../util/get-image.service";
import {OrderProductComponent} from "../order-product/order-product.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ConfigUtility} from "../util/configUtility";
import {OrderService} from "../order.service";
import {Order} from "../order";
import {User} from "../user";
import {UserService} from "../user.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    SlicePipe,
    MatButton,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  "products": any[];
  "order": Order = new Order();
  "index": number;
  "totalPages": number;
  "dialogRef": MatDialogRef<OrderProductComponent> | undefined;
  "user": User = new User();

  constructor(private router: Router,
              protected productService: ProductService,
              private getImageService: GetImageService,
              private matDialog: MatDialog,
              private configUtility: ConfigUtility,
              private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.index = 1
    this.getAllProducts(this.index)
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data
    })
  }

  addProduct() {
    if (this.user != null && this.user.userType === "ADMIN") {
      this.router.navigate([`/products/add`]);
    }
  }

  private getAllProducts(index: number) {
    console.log(this.user)
    this.productService.getAllProducts(index).subscribe(data => {
      this.products = data.content;
      this.totalPages = data.page.totalPages
      this.products.forEach(product => {
        this.getImageService.loadImage(product);
      });
    })
  }

  prev() {
    if (this.index < 1) {
      this.getAllProducts(1)
    } else {
      this.getAllProducts(--this.index)
    }
  }

  next() {
    if (this.index >= this.totalPages) {
      this.getAllProducts(this.totalPages)
    } else {
      this.getAllProducts(++this.index)
    }
  }

  singlePage(productId: number) {
    this.router.navigate([`/products/item/${productId}`]);
  }

  addProductOrder(id: number) {
    if (this.user != null) {

      const dialogConfig = new MatDialogConfig()

      dialogConfig.data = {
        product: id
      }
      this.dialogRef = this.matDialog.open(OrderProductComponent, this.configUtility.getDialogConfig())

      this.dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.order.orderQuantity = result.orderQuantity
          this.order.userId = this.user.id
          this.order.productId = id
          this.orderService.addOrder(this.order, id).subscribe({
            next: () => {
              this.router.navigate([`/products`])
            }, error() {
              console.log("error")
            }
          })
        }
      })
    }
  }

  delete(id: number) {
    if (this.user != null && this.user.userType == "ADMIN") {
      this.productService.deleteProduct(id).subscribe(data => {
        this.getAllProducts(this.index)
      })
    }

  }
}
