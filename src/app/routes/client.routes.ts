import type { Routes } from '@angular/router';
import { emptyCartGuard } from '../core/guards/cart/empty-cart.guard';

export const ClientRoutes:Routes = [

  {
    path: 'carrinho',
    canMatch:[emptyCartGuard],
    loadComponent: () => import('../pages/client/cart/cart.component').then(c => c.CartComponent),
    data: {
      title: 'Carrinho',
      description: 'Revise seus produtos antes de finalizar sua compra.',
      image: 'https://fragranciasdecor.com.br/assets/img/logo.png',
      keywords: 'carrinho, checkout, fragrâncias decor'
    }
  },
  {
    path:'checkout',
    loadComponent: () => import('../pages/client/checkout/checkout.component').then(c => c.CheckoutComponent),
    data: {
      title: 'Checkout',
      description: 'Conclua sua compra com segurança e conforto.',
      image: 'https://fragranciasdecor.com.br/assets/img/logo.png',
      keywords: 'checkout, fragrâncias decor, pagamento, compra segura'
    }
  },
  {
    path:'produto/:id',
    loadComponent: () => import('../pages/client/individual-product/individual-product.component').then(c => c.IndividualProductComponent)
  },
  {
    path:'pedido/:id',
    loadComponent: () => import('../pages/client/cart/cart.component').then(c => c.CartComponent),
    data: {
      title: 'Pedido - Fragrâncias Decor',
      description: 'Veja meu pedido!',
      image: 'https://fragranciasdecor.com.br/assets/img/logo.png',
      keywords: 'pedido, fragrâncias, auto cuidado, casa e bem-estar'
    }
  },
  {
    path: 'categoria/:categoria',
    loadComponent: () => import('../pages/client/category/category.component').then(c => c.CategoryComponent),
    data: {
      title: 'Categoria - Fragrâncias Decor',
      description: 'Encontre produtos exclusivos por categoria: Aromatizadores, Auto Cuidado e Casa & Bem-Estar.',
      image: 'https://fragranciasdecor.com.br/assets/img/logo.png',
      keywords: 'categoria, fragrâncias, auto cuidado, casa e bem-estar'
    }
  }

];
