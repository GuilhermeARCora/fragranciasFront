import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { authGuard } from './core/guards/auth.guard';

const protectedRoutes:Routes = [
  { path: 'userProfile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'passwordChange', component: ChangePasswordComponent, canActivate: [authGuard] },
]

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },

  // Protected routes
  ...protectedRoutes,

  // 404 route
  { path: 'not-found', component: NotFoundComponent },

  // Catch-all (must be last!)
  { path: '**', redirectTo: '/not-found' },
];
