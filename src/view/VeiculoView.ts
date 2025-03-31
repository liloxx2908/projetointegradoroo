import promptSync from "prompt-sync";
import { VeiculoService } from "../service/VeiculoService";


export class VeiculoView {
    private VeiculoService: VeiculoService
    private prompt: promptSync.Prompt;

    constructor() {
        this.VeiculoService = new VeiculoService();
        this.prompt = promptSync();
    }

    async exibirMenuVeiculos(): Promise<void> {
        console.log("\nMENU DE VEÍCULOS");
        console.log("[1] Listar veículos");
        console.log("[2] Buscar veículo por placa");
        console.log("[3] Inserir veículo");
        console.log("[4] Excluir veículo");
        console.log("[0] Sair");

        let escolha = this.prompt("Escolha uma opção: ");

        switch (escolha) {
            case "1":
                try {
                    console.table(await this.VeiculoService.listarVeiculos());
                } catch (error) {
                    console.error("Erro ao listar veículos:", error);
                }
                this.exibirMenuVeiculos();
                break;

            case "2":
                try {
                    const placaBuscar = this.prompt("Digite a placa do veículo que deseja buscar: ").toUpperCase();
                    if (!placaBuscar) {
                        console.log("Placa inválida! Tente novamente.");
                    } else {
                        console.table(await this.VeiculoService.buscarPorPlaca(placaBuscar));
                    }
                } catch (error) {
                    console.error("Erro ao buscar veículo:", error);
                }
                this.exibirMenuVeiculos();
                break;

            case "3":
                try {
                    const placa = this.prompt("Placa (exemplo: ABC-1234): ").toUpperCase();
                    const modelo = this.prompt("Modelo: ");
                    const cor = this.prompt("Cor: ");
                    const proprietarioId = (this.prompt("proprietário: "));

                    if (!proprietarioId) {
                        console.log("proprietário inválido!");
                    } else {

                        await this.VeiculoService.inserirVeiculo(placa, modelo, cor, proprietarioId);
                        console.log("Veículo inserido com sucesso!");
                    }
                } catch (error) {
                    console.error("Erro ao inserir veículo:", error);
                }
                this.exibirMenuVeiculos();
                break;

            case "4":
                try {
                    const placaRemover = this.prompt("Digite a placa do veículo que deseja remover: ");
                    if (!placaRemover) {
                        console.log("Placa inválida! Tente novamente.");
                    } else {
                        await this.VeiculoService.removerVeiculo(placaRemover);
                        console.log("Veículo removido com sucesso!");
                    }
                } catch (error) {
                    console.error("Erro ao remover veículo:", error);
                }
                this.exibirMenuVeiculos();
                break;

            case "0":
                console.log("Saindo do sistema...");


            default:
                console.log("Opção inválida! Tente novamente.");
                this.exibirMenuVeiculos();
                break;
        }
    }
}