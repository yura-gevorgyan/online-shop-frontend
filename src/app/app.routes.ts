import {Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SingleProductComponent} from "./single-product/single-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {MyOrdersComponent} from "./my-orders/my-orders.component";
import {OrderProductComponent} from "./order-product/order-product.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/add', component: AddProductComponent},
  {path: 'products/item/:id', component: SingleProductComponent},
  {path: 'orders', component: MyOrdersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
