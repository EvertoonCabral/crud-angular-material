import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../cadastro/cliente';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'dataNascimento', 'cpf', 'email'];

  constructor(private service: ClienteService) {}

  ngOnInit() {
    this.listaClientes = this.service.listarClientes('');
  }
}
