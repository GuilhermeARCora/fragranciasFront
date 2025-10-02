import { Routes } from "@angular/router";

export const ClientRoutes:Routes = [

  {
    path: 'cart',
    loadComponent: () => import('../pages/client/cart/cart.component').then(c => c.CartComponent)
  },
  //falta checkout
  {
    path: 'category/aromatizadores',
    loadComponent: () => import('../pages/client/category/category.component').then(c => c.CategoryComponent)
  },
  {
    path: 'category/autoCuidado',
    loadComponent: () => import('../pages/client/category/category.component').then(c => c.CategoryComponent)
  },
  {
    path: 'category/casaEBemEstar',
    loadComponent: () => import('../pages/client/category/category.component').then(c => c.CategoryComponent)
  },

];
