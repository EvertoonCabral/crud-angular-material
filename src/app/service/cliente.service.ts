import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTE = '_CLIENTES';

  constructor() {}

  listarClientes(nome: String): Cliente[] {
    return this.getStorage();
  }

  salvar(cliente: Cliente) {
    const storage = this.getStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storage));
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
}
