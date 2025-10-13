import { Routes } from "@angular/router";

export const ClientRoutes:Routes = [

  {
    path: 'carrinho',
    loadComponent: () => import('../pages/client/cart/cart.component').then(c => c.CartComponent),
    data: { title: 'Carrinho' }
  },
  {
    path:'checkout',
    loadComponent: () => import('../pages/client/checkout/checkout.component').then(c => c.CheckoutComponent),
    data: { title: 'Checkout' }
  },
  {
    path:'pedido/:id',
    loadComponent: () => import('../pages/client/cart/cart.component').then(c => c.CartComponent),
    data: { title: 'Pedido'}
  },
  {
    path: 'categoria/:categoria',
    loadComponent: () => import('../pages/client/category/category.component').then(c => c.CategoryComponent)
  }

];
