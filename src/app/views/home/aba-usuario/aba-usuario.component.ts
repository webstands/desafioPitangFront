import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'aba-usuario',
  templateUrl: './aba-usuario.component.html',
  styleUrls: ['./aba-usuario.component.css']
})
export class AbaUsuarioComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'birthday',
    'login',
    'phone',
    'photo',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListaUsuario();
  }

  adicionarUsuario() {
    const dialogRef = this.dialog.open(UsuarioComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListaUsuario();
        }
      },
    });
  }

  getListaUsuario() {
    this.usuarioService.getListaUsuario().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editarUsuario(data: any) {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListaUsuario();
        }
      },
    });
  }

  deletarUsuario(id: number) {
    this.usuarioService.deletarUsuario(id).subscribe({
      next: (res) => {
        this.toastr.success('Usuário deletado com sucesso!', 'Sucesso');
        this.getListaUsuario();
      },
      error: (err) => {
        this.toastr.error('Erro ao deletar usuário', 'Erro');
        console.log(err);
      },
    });
  }
}
