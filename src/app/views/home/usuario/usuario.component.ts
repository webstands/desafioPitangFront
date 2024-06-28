import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],

})
export class UsuarioComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      birtday: [new Date()],
      login: '',
      password: '',
      phone: ''
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.usuarioService
          .atualizarUsuario(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Usuário atualizado com sucesso!', 'Sucesso');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message, 'Erro');
            },
          });
      } else {
        this.usuarioService.adicionarUsuario(this.userForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Usuário adicionado com sucesso!', 'Sucesso');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err.error.message, 'Erro');
          },
        });
      }
    }
  }
}
