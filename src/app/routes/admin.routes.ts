import { Routes } from '@angular/router';
import { ShellComponent } from '../pages/admin/shell/shell.component';
import { loginRedirectGuard } from '../core/guards/loginRedirect/login-redirect.guard';
import { AuthGuard } from '../core/guards/auth-guard/auth.guard';
import { RoleGuard } from '../core/guards/role-guard/role.guard';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../pages/admin/login/login.component').then(
            c => c.LoginComponent
          ),
        canMatch:[loginRedirectGuard]
      },
      {
        path: '',
        component: ShellComponent,
        canMatch:[AuthGuard, RoleGuard],
        data:{ roles: ['admin'] },
        children: [
          {
            path: 'painel-admin',
            loadComponent: () =>
              import('../pages/admin/admin-home/admin-home.component').then(c => c.AdminHomeComponent),
            data: { title: 'Painel Administrativo'}
          },
          {
            path:'produtos',
            loadComponent:() => import('../pages/admin/product-home/product-home.component').then(c => c.ProductHomeComponent),
            data: { title: 'Produtos'}
          },
          {
            path: 'criar-produto',
            loadComponent: () =>
              import('../pages/admin/product-home/create-and-edit-product/create-and-edit-product.component').then(c => c.CreateAndEditProductComponent),
            data: { title: 'Criar Produto'}
          },
          {
            path: 'editar-produto/:id',
            loadComponent: () =>
              import('../pages/admin/product-home/create-and-edit-product/create-and-edit-product.component').then(c => c.CreateAndEditProductComponent),
            data: { title: 'Editar Produto'}
          },
          {
            path:'pedidos',
            loadComponent:() => import('../pages/admin/order-home/order-home.component').then(c => c.OrderHomeComponent),
            data: { title: 'Pedidos'}
          }
        ],
      },
    ],
  },
];
