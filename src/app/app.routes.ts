import { Router, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthComponent } from './features/auth/auth.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { CartComponent } from './features/cart/cart.component';
import { CatalogDetailComponent } from './features/catalog/catalog-detail/catalog-detail.component';
import { CatalogListComponent } from './features/catalog/catalog-list/catalog-list.component';
import { setLayout } from './layout/resolver';
import { PageLayout } from './enum/page-layout';
import { DashboardComponent } from './features-admin/dashboard/dashboard.component';
import { CategoryComponent } from './features-admin/category/category.component';
import { ProductComponent } from './features-admin/product/product.component';
import { ProductListComponent } from './features-admin/product/product-list/product-list.component';
import { ProductFormComponent } from './features-admin/product/product-form/product-form.component';
import { OrderComponent } from './features-admin/order/order.component';
import { OrderListComponent } from './features-admin/order/order-list/order-list.component';
import { inject } from '@angular/core';
import { AuthService } from './features/auth/auth.service';
import { UnauthorizedComponent } from './features/auth/unauthorized/unauthorized.component';
import { TransactionComponent } from './features/transaction/transaction.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingPageComponent,
        resolve: {
            layout: setLayout(PageLayout.Customer)
        }
        // loadComponent: () => import('./features/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    },
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path: "login",
                component: LoginComponent,
            },
            {
                path: "signup",
                component: RegisterComponent
            }
        ],
        canActivate: [
            () => {
                const router = inject(Router);
                if(inject(AuthService).getCurrentUser()?.role === 'customer') {
                    router.navigate(['catalog']);
                    return false;
                }else if(inject(AuthService).getCurrentUser()?.role === 'admin') {
                    router.navigate(['admin/dashboard']);
                    return false;
                }else {
                    return true;
                }
            }
        ],
        resolve: {
            layout: setLayout(PageLayout.Customer)
        }
    },
    {
        path: 'admin',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      },
    {
        path: "admin",
        resolve: {
            layout: setLayout(PageLayout.Admin)
        },
        children: [
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "category",
                component: CategoryComponent
            },
            {
                path: "product",
                component: ProductComponent,
                children: [
                    {
                        path: "",
                        component: ProductListComponent
                    },
                    {
                        path: "add",
                        component: ProductFormComponent
                    },
                    {
                        path: "edit/:id",
                        component: ProductFormComponent
                    }
                ]
            },
            {
                path: "order",
                component: OrderComponent,
                children: [
                    {
                        path: "",
                        component: OrderListComponent
                    }
                ]
            }
        ],
        canActivate: [
            () => {
                const router = inject(Router);
                if(inject(AuthService).getCurrentUser()?.role === 'admin') {
                    return true;
                }else {
                    router.navigate(['unauthorized']);
                    return false;
                }
            }
        ]
    },
    {
        path: "catalog",
        component: CatalogComponent,
        children: [
            {
                path: "",
                component: CatalogListComponent
            },
            {
                path: "detail/:id",
                component: CatalogDetailComponent
            }
        ],
        canActivate: [
            () => {
                const router = inject(Router);
                if(inject(AuthService).getCurrentUser()?.role === 'customer') {
                    return true;
                }else {
                    router.navigate(['unauthorized']);
                    return false;
                }
            }
        ],
        resolve: {
            layout: setLayout(PageLayout.Customer)
        }
    },
    {
        path: "cart",
        component: CartComponent,
        canActivate: [
            () => {
                const router = inject(Router);
                if(inject(AuthService).getCurrentUser()?.role === 'customer') {
                    return true;
                }else {
                    router.navigate(['unauthorized']);
                    return false;
                }
            }
        ],
        resolve: {
            layout: setLayout(PageLayout.Customer)
        }
    },
    {
        path: "transaction",
        component: TransactionComponent,
        canActivate: [
            () => {
                const router = inject(Router);
                if(inject(AuthService).getCurrentUser()?.role === 'customer') {
                    return true;
                }else {
                    router.navigate(['unauthorized']);
                    return false;
                }
            }
        ],
        resolve: {
            layout: setLayout(PageLayout.Customer)
        }
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
