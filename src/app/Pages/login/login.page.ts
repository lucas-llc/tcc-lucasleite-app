import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    public us: UserService,
    public formBuilder: FormBuilder,
    public util: UtilService
  ) {
    this.loginForm = formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  login() {

  }

  showForm() {

  }

}
