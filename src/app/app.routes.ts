import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userGuard } from './guards/user-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'products', component: ProductsComponent, canActivate: [userGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [userGuard] },
    { path: 'add-products', component: AddProductsComponent, canActivate: [userGuard] },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
