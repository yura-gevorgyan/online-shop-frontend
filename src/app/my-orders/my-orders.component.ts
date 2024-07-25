import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../product";
import {OrderService} from "../order.service";
import {UserService} from "../user.service";
import {User} from "../user";
import {ProductService} from "../product.service";
import {GetImageService} from "../util/get-image.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  "orders": any[];
  "index": number;
  "totalPages": number;
  "user": User = new User();
  "product": Product = new Product();

  constructor(private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService,
              private getImageService: GetImageService,) {
  }

  ngOnInit() {
    this.index = 1;
    this.userService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
      this.getAllOrder(this.index)
    })
  }


  next() {
    if (this.index >= this.totalPages) {
      this.getAllOrder(this.totalPages)
    } else {
      this.getAllOrder(++this.index)
    }
  }

  prev() {
    if (this.index < 1) {
      this.getAllOrder(1)
    } else {
      this.getAllOrder(--this.index)
    }
  }

  deleteOrder(id: number) {

  }

  getAllOrder(index: number) {
    this.orderService.getOrdersByUser(index, this.user.id).subscribe(data => {
      this.orders = data.content;
      this.totalPages = data.page.totalPages
      for (const order of this.orders) {
        this.productService.getProduct(order.productId).subscribe(data => {
          order.product = data;
          this.getImageService.loadImage(order.product)
        })
      }
    })
  }
}
