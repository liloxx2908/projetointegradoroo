
import { Cliente } from "../entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository"


export class ClienteService {

  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }

  private validarEmail(email: string): void {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("E-mail inválido.");
    }
  }

  public async listarClientes(): Promise<Cliente[]> {
    // console.table(this.repo.listarClientes())   
    return await this.repo.listarCliente()
  }

  public async buscarPorId(id: number): Promise<Cliente[]> {
    let lista: Cliente[] = [];
    lista = await this.repo.buscarPorId(id);

    if (lista.length == 0) {
      // console.log("Não Encontrei")
      throw new Error('Não Encontrei');
    }

    return lista;

  }

  public async inserirCliente( nome: string, email: string, telefone: string) {
    // Validação do e-mail
    this.validarEmail(email);

    await this.repo.listarCliente();

  }
  async removerUsuario(id:number){
   this.repo.removerUsuario(id)
}


}