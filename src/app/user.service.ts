import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {AuthResponseDto} from "./auth-response-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  "url": string = "http://localhost:8083";

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<User>(`${this.url}/currentUser`, {headers})
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/register`, user)
  }

  login(user: User): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(`${this.url}/login`, user)
  }
}
