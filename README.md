# Fragrancias Front

Frontend built with **Angular 19**, designed for performance, scalability, and clean architecture.  
It delivers a modern and responsive e-commerce experience, integrating seamlessly with the [Fragrancias API](https://github.com/GuilhermeARCora/fragranciasAPI.git).

## 🚀 Used Technologies

![Angular](https://img.shields.io/badge/Angular-CA2C39?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Signals](https://img.shields.io/badge/Signals-A92E2E?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-009688?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FE729A?style=for-the-badge&logo=sweetalert2&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![Ng2-Charts](https://img.shields.io/badge/Ng2--Charts-4285F4?style=for-the-badge&logo=chartdotjs&logoColor=white)

## 🧩 Overview

- **Standalone Components** with **Lazy Loading** routes for fast initial load.  
- **HTTP communication** via `HttpClient` services.  
- **Interceptors**:
  - 🔐 `AuthInterceptor` — attaches JWT from cookies
  - ⏳ `LoadingInterceptor` — global loading feedback
  - ⚠️ `ErrorInterceptor` — centralized error handling with SweetAlert2
- **State Management** — hybrid: **Angular Signals** + **RxJS** where appropriate.

## 🧠 Core Features

### 🏠 Home
- Banner
- Highlights & newest products in **SessionStorage**
- Category navigation
- Informational sections (policies, about us, contact)

### 🛒 Cart & Checkout
- Cart stored in memory + **LocalStorage**
- Checkout persists orders to the backend
- Automatic **WhatsApp** message to the store with order details

### 👤 Authentication
- Admin-only login using **JWT** (stored in cookies)
- Logout clears cookies and cache
- Multiple **Route Guards** (e.g., AuthGuard, AdminGuard)

### 📊 Admin Area
- Dashboard with **ng2-charts**
- Product & order management
- Filtering, sorting, and admin actions (finalize orders, create products)

## 🧪 Testing

![Karma](https://img.shields.io/badge/Karma-3DDC84?style=for-the-badge&logo=karma&logoColor=white)
![Jasmine](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=jasmine&logoColor=white)

- **Configured**: Karma + Jasmine + coverage.  
- **Status**: Unit tests to be added gradually, starting from critical components/services.

## 🧹 Code Quality

Linting and style enforcement with **ESLint (Angular Recommended Rules + Custom Additions)**.  
Ensures a consistent and clean codebase with strong typing and best practices for both **Signals** and **RxJS**.

**Highlights:**
- ✅ Angular ESLint with recommended presets  
- ⚙️ Custom rules for naming, imports, and clean code  
- 🚫 Prevents `console.log`, `var`, unused variables  

## 🧰 Development

```bash
# Install dependencies
npm install

# Start dev server
ng serve -o

# Open
http://localhost:4200
```

## 🧩 Backend Integration

Frontend consumes: **Fragrancias API**  
https://github.com/GuilhermeARCora/fragranciasAPI.git
