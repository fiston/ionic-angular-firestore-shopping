import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        children: [
          {
            path: '',
            loadChildren:
              '../pages/shopping-list/shopping-list.module#ShoppingListPageModule'
          },
          {
            path: 'shopping-list-add',
            loadChildren:
              '../pages/shopping-list-add/shopping-list-add.module#ShoppingListAddPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren:
              '../pages/inventory/inventory.module#InventoryPageModule'
          },
          {
            path: 'inventory-add',
            loadChildren:
              '../pages/inventory-add/inventory-add.module#InventoryAddPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/shopping-list',
        pathMatch: 'full'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/tabs/inventory',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
