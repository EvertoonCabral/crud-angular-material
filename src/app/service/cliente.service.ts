import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTE = '_CLIENTES';

  constructor() {}

  listarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.getStorage();

    console.log(clientes);

    if (!nomeBusca) {
      return clientes;
    } else {
      return clientes.filter((cliente) => cliente.nome?.indexOf(nomeBusca) !== -1);
    }
  }

  salvar(cliente: Cliente) {
    const storage = this.getStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storage));
  }

  deletar(cliente: Cliente) {
    const storage = this.getStorage();

    const novaLista = storage.filter((c) => c.id !== cliente.id);

    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(novaLista));
  }

  getStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTE);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(clientes));
    return clientes;
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.getStorage();
    return clientes.find((cliente) => cliente.id === id);
  }

  atualizar(cliente: Cliente) {
    const storage = this.getStorage();
    storage.forEach((c) => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storage));
  }
}
