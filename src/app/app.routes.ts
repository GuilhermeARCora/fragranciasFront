import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { IndividualProductComponent } from './pages/individual-product/individual-product.component';


const protectedRoutes:Routes = [
  { path: 'userProfile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'passwordChange', component: ChangePasswordComponent, canActivate: [AuthGuard] },
];

const adminRoutes:Routes = [
  {
    path:'adminHome',
    loadComponent: () => import('./pages/admin/admin-home/admin-home.component')
    .then(c => c.AdminHomeComponent),
    canActivate:[RoleGuard],
    data:{roles: ['admin','master']},
    children: [
        {
          path:'createEditProduct/:id',
          loadComponent: () => import('./pages/admin/create-and-edit-product/create-and-edit-product.component')
          .then(c => c.CreateAndEditProductComponent)
        }
    ]
  }
];

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/individual-product/individual-product.component')
    .then(c => c.IndividualProductComponent)
  },

  // Protected routes
  ...protectedRoutes,
  ...adminRoutes,

  // 404 route
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
