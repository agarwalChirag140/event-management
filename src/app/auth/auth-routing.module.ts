import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AfterLoginGuard } from '../event/Afterlogin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AfterLoginGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AfterLoginGuard]},
  // { path: '**', redirectTo: 'login', canActivate: [AfterLoginGuard]}, // Wildcard route for handling unknown paths
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
