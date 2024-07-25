import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Product} from "../product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {GetImageService} from "../util/get-image.service";

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  "product": Product = new Product();
  "id": number;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private getImageService: GetImageService,) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
      this.getImageService.loadImage(this.product)
    })
  }


}
