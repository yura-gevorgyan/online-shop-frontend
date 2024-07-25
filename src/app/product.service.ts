import {Injectable} from '@angular/core';
import {Product} from "./product";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://localhost:8081/products";


  constructor(private httpClient: HttpClient) {
  }

  saveProduct(formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}`, formData);
  }

  getAllProducts(index: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${index}`)
  }

  getImageUrl(image: string): Observable<Blob> {
    return this.httpClient.get(`${this.url}/getImage/${image}`, {responseType: "blob"});
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/item/${id}`)
  }

  deleteProduct(id: number): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.url}/${id}`)
  }
}
