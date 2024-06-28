import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarroService } from 'src/app/shared/service/carro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss'],
})
export class CarroComponent implements OnInit {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carroService: CarroService,
    private dialogRef: MatDialogRef<CarroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.carForm = this.fb.group({
      model: '',
      year: '',
      licensePlate: '',
      color: ''
    });
  }

  ngOnInit(): void {
    this.carForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.carForm.valid) {
      if (this.data) {
        this.carroService
          .atualizarCarro(this.data.id, this.carForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success('Carro atualizado com sucesso!', 'Sucesso');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.toastr.error(err.error.message, 'Erro');
              console.error(err);
            },
          });
      } else {
        this.carroService.adicionarCarro(this.carForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Carro adicionado com sucesso!', 'Sucesso');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err.error.message, 'Erro');
            console.error(err);
          },
        });
      }
    }
  }
}