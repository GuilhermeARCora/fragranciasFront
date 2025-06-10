import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { RoleGuard } from './core/guards/role.guard';

const protectedRoutes:Routes = [
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'passwordChange', component: ChangePasswordComponent, canActivate: [AuthGuard] },
];

const adminRoutes:Routes = [
  {path:'adminHome', component:AdminHomeComponent, canActivate:[RoleGuard], data:{roles: ['admin','master']}}
];

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },

  // Protected routes
  ...protectedRoutes,
  ...adminRoutes,

  // 404 route
  { path: 'not-found', component: NotFoundComponent },

  { path: '**', redirectTo: '/not-found' },
];
