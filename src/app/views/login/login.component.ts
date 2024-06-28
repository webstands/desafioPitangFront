import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      login: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      const result = await this.authService.login(this.loginForm.value);
      console.log(`Login efetuado: ${result}`);

      this.toastr.success('Login efetuado com sucesso!', 'Sucesso');

      this.router.navigate(['']);
    } catch (error) {
      console.error(error);

      this.toastr.error('Falha ao fazer login. Verifique suas credenciais.', 'Erro');
    }
  }
}
