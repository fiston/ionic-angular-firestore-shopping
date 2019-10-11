import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss']
})
export class AddUserPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false })
  addUserForm: AuthFormComponent;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async addUser(credentials): Promise<void> {
    try {
      await this.authService.createRegularUser(credentials.email);
      await this.addUserForm.hideLoading();
      this.router.navigateByUrl('/tabs/inventory');
    } catch (error) {
      await this.addUserForm.hideLoading();
      this.addUserForm.handleError(error);
    }
  }
}
