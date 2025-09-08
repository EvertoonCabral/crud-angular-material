import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Brasilapi } from '../service/brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snackBar = inject(MatSnackBar);
  municipios: Municipio[] = [];
  estados: Estado[] = [];

  constructor(
    private service: ClienteService,
    private brasilApiService: Brasilapi,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.uf) {
            const event = { value: this.cliente.uf };
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    });

    this.carregarUFs();
  }

  salvar() {
    if (this.atualizando == false) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem(`Cliente salvo com sucesso!`);
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso.');
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados) => (this.estados = listaEstados),
      error: (erro) => console.error('Ocorreu um erro: ', erro),
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const ufSelecionado = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionado).subscribe({
      next: (listaMunicipio) => (this.municipios = listaMunicipio),
      error: (erro) => console.error('Ocorreu um erro'),
    });
  }
}
