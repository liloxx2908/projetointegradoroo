import promptSync from "prompt-sync";
import { ClienteService } from "../service/ClienteService";

export class UsuarioView {
    private usuarioService: ClienteService;
    private prompt: promptSync.Prompt;

    constructor() {
        this.usuarioService = new ClienteService();
        this.prompt = promptSync();
    }

    async exibirMenu(): Promise<void> {
        console.log("\nMENU");
        console.log("[1] Listar usuários");
        console.log("[2] Buscar usuário");
        console.log("[3] Inserir usuário");
        console.log("[4] Excluir usuário");
        console.log("[0] Sair");

        let escolha = this.prompt("Escolha uma opção: ");

        switch (escolha) {
            case "1":
                try {
                    console.table(await this.usuarioService.listarClientes());
                } catch (error) {
                    console.error("Erro ao listar usuários:", error);
                }
                this.exibirMenu();
                break;

            case "2":
                try {
                    const idBuscar = parseInt(this.prompt("Digite o ID do usuário que deseja buscar: "));
                    if (isNaN(idBuscar)) {
                        console.log("ID inválido! Tente novamente.");
                    } else {
                        console.table(await this.usuarioService.buscarPorId(idBuscar));
                    }
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                }
                this.exibirMenu();
                break;

            case "3":
                try {
                    const nome = this.prompt("Nome: ");
                    const emailInserir = this.prompt("Email: ");
                    const telefoneInserir = this.prompt("Telefone: ");

                    await this.usuarioService.inserirCliente(nome, emailInserir, telefoneInserir);
                    console.log("Usuário inserido com sucesso!");
                } catch (error) {
                    console.error("Erro ao inserir usuário:", error);
                }
                this.exibirMenu();
                break;

            case "4":
                try {
                    let removerUsuario = parseInt(this.prompt("Digite o ID do usuário que deseja remover: "));
                    if (isNaN(removerUsuario)) {
                        console.log("ID inválido! Tente novamente.");
                    } else {
                        await this.usuarioService.removerUsuario(removerUsuario);
                        console.log("Usuário removido com sucesso!");
                    }
                } catch (error) {
                    console.error("Erro ao remover usuário:", error);
                }
                this.exibirMenu();
                break;

            case "0":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                this.exibirMenu();
                break;
        }
    }
}