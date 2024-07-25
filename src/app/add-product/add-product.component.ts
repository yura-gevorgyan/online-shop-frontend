import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {User} from "../user";
import {UserService} from "../user.service";


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  product: Product = new Product();
  "selectedFile": File;
  "url": any;
  "user": User = new User();

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserService,) {
  }

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
    })
  }

  onSubmit() {
    if (this.selectedFile) {
      console.log(this.user);
      this.product.userId = this.user.id
      const formData = new FormData();
      formData.append('picture', this.selectedFile, this.selectedFile.name);
      formData.append('product', new Blob([JSON.stringify(this.product)], {type: 'application/json'}));
      console.log(formData)

      this.productService.saveProduct(formData).subscribe(data => {
        this.router.navigate([`/products`]);
      })

    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  }

}
