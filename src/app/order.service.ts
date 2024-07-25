import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "./order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  "url": string = "http://localhost:8082/orders";

  constructor(private httpClient: HttpClient) {
  }

  addOrder(order: Order, id: number): Observable<Order> {
    return this.httpClient.post<Order>(`${this.url}/${id}`, order)
  }

  getOrdersByUser(index: number, id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get<any>(`${this.url}/${index}`, {params});
  }
}
