import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-user',
    loadChildren: './pages/add-user/add-user.module#AddUserPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'password-reset',
    loadChildren:
      './pages/password-reset/password-reset.module#PasswordResetPageModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
