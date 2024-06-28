import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CarroComponent } from '../carro/carro.component';
import { CarroService } from 'src/app/shared/service/carro.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'aba-carro',
  templateUrl: './aba-carro.component.html',
  styleUrls: ['./aba-carro.component.css']
})
export class AbaCarroComponent {
  displayedColumns: string[] = [
    'id',
    'model',
    'color',
    'year',
    'licensePlate',
    'photo',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private carroService: CarroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCarList();
  }

  openAddEditCarForm() {
    const dialogRef = this.dialog.open(CarroComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCarList();
        }
      },
    });
  }

  getCarList() {
    this.carroService.getListaCarro().subscribe({
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


  editarCarro(data: any) {
    const dialogRef = this.dialog.open(CarroComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCarList();
        }
      },
    });
  }

  deletarCarro(id: number) {
    this.carroService.deletarCarro(id).subscribe({
      next: (res) => {
        this.toastr.success('Carro deletado com sucesso!', 'Sucesso');
        this.getCarList();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao deletar o carro.', 'Erro');
      }
    });
  }
}
