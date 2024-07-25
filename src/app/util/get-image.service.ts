import { Injectable } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor(private productService: ProductService) {
  }

  loadImage(product: Product): void {
    this.productService.getImageUrl(product.picName).subscribe(data => {
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        product.imageUrl = reader.result as string;
      }, false);

      if (data) {
        reader.readAsDataURL(data);
      }
    }, error => {
      console.error('Error loading image', error);
    });
  }
}
