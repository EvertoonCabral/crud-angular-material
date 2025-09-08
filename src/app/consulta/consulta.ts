import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, ɵnormalizeQueryParams } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

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
  colunasTable: string[] = ['id', 'nome', 'dataNascimento', 'cpf', 'email', 'acoes'];
  nomeBusca: string = '';
  snackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {}

  ngOnInit() {
    this.listaClientes = this.service.listarClientes('');
  }

  pesquisar() {
    this.listaClientes = this.service.listarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.listarClientes('');
    this.mostrarMensagem(`O Cliente ${cliente.nome} foi excluido com sucesso.`);
  }
  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
