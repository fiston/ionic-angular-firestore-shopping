import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [AuthFormComponent],
  entryComponents: [AuthFormComponent]
})
export class AuthModule {}
