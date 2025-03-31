import promptSync from "prompt-sync";
import { RegistroDeEstacionamento } from "../entity/RegistroDeEstacionamento";
import { EstacionamentoService } from "../service/EstacionamentoService";



export class EstacionamentoView {
    private estacionamentoService: EstacionamentoService;
    private prompt: promptSync.Prompt;
    private escolha: string;
    constructor() {
        this.estacionamentoService = new EstacionamentoService();
        this.prompt = promptSync();
        this.escolha = " ";
    }

    async exibirMenu(): Promise<void> {
        console.log("\n🚗 MENU DO ESTACIONAMENTO 🚗");
        console.log("[1] Listar ");
        console.log("[2] registrar entrada ");
        console.log("[3] registrar saida");
        console.log("[0] Sair");

        this.escolha = this.prompt("Escolha uma opção: ");
        console.log(this.escolha)
        switch (this.escolha) {
            case "1": 
            
            /*try {
                console.table(await this.estacionamentoService.listarRegistroEstacionamento());
            } catch (error) {
                console.error("Erro ao listar:", error);
            }*/
                console.table(await this.estacionamentoService.listarRegistroEstacionamento());
                this.exibirMenu();
                break;


            case "2":
                try {
                    const placa = this.prompt("Placa (exemplo: ABC-1234): ").toUpperCase();
                    const horaentrada = this.prompt("hora da entrada: ");

                    if (!placa) {
                        console.log("placa inválida!");
                    } else {

                        await this.estacionamentoService.registrarEntrada(placa, horaentrada);
                        console.log("inserido com sucesso!");
                    }
                } catch (error) {
                    console.error("Erro ao inserir:", error);
                }
                this.exibirMenu();
                break;

            case "3":
                try {
                    const codigo = this.prompt("codigo de registro:").toUpperCase();
                    const horaSaida = this.prompt("hora da saida: ");
                    let retorno = await this.estacionamentoService.buscarPorCode(codigo);

                    if (!codigo || !retorno) {
                        console.log("codigo invalido!");
                    } else {
                        console.log("entrei no else")

                        await this.estacionamentoService.registrarSaida(horaSaida, codigo)
                        console.log("atuaizado com sucesso!");
                    }
                } catch (error) {
                    console.error("Erro ao inserir:", error);
                }
                this.exibirMenu();
                break;



            case "0":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("❌ Opção inválida! Tente novamente.");
        }

    }
}
