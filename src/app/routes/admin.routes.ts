import { Routes } from "@angular/router";
import { ShellComponent } from "../pages/admin/shell/shell.component";

export const AdminRoutes:Routes = [

  {
      path: 'admin',
      component: ShellComponent,
      children: [
        {
          path: '',
          loadComponent: () => import('../pages/admin/admin-home/admin-home.component').then(c => c.AdminHomeComponent)
        },
        {
          path:'homeProduct',
          loadComponent: () => import('../pages/admin/product-home/product-home.component').then(c => c.ProductHomeComponent)
        },
        {
         path:'createProduct',
         loadComponent: () => import('../pages/admin/create-and-edit-product/create-and-edit-product.component').then(c => c.CreateAndEditProductComponent)
        },
        {
          path:'editProduct/:id',
          loadComponent: () => import('../pages/admin/create-and-edit-product/create-and-edit-product.component').then(c => c.CreateAndEditProductComponent)
        },
      ],
    }

];
