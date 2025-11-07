import type { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminRoutes } from './routes/admin.routes';
import { ClientRoutes } from './routes/client.routes';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },

  ...ClientRoutes,
  ...AdminRoutes,

  // 404 routes
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
