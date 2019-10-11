import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss']
})
export class PasswordResetPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false })
  resetPasswordForm: AuthFormComponent;
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async resetPassword(credentials): Promise<void> {
    try {
      await this.authService.resetPassword(credentials.email);
      await this.resetPasswordForm.hideLoading();
      const alert = await this.alertCtrl.create({
        message: 'Check your inbox for the password reset link',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('login');
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      await this.resetPasswordForm.hideLoading();
      this.resetPasswordForm.handleError(error);
    }
  }
}
