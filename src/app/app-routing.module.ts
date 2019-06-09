import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule'
  },
  {
    path: 'password-reset',
    loadChildren:
      './pages/password-reset/password-reset.module#PasswordResetPageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },

  {
    path: 'add-user',
    loadChildren: './pages/add-user/add-user.module#AddUserPageModule',
    ...canActivate(redirectUnauthorizedToLogin)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
