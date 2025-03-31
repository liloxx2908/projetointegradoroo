import { UsuarioView } from "./view/ClienteView";
import { EstacionamentoView } from "./view/EstacionamentoView";
import { VeiculoView } from "./view/VeiculoView";

async function main() {
    const usuariosView = new UsuarioView();
    const estacionament = new EstacionamentoView();
    const veiculosView = new VeiculoView();

    let continuar = true;

    while (continuar) {
        console.log("\n------ MENU PRINCIPAL ------");
        console.log(" 1. Menu de usuários");
        console.log(" 2. Menu de estacionamento");
        console.log(" 3. Menu de veículos");
        console.log(" 5. Sair"); 

        const prompt = require("prompt-sync")();
        const menu = prompt("Escolha uma opção: ");

        switch (menu) {
            
            case "1":
                await usuariosView.exibirMenu();
                break;

            case "2":
                console.log("antes do menu")
                await estacionament.exibirMenu();
                break
                console.log("depois")
                ;

            case "3":
                await veiculosView.exibirMenuVeiculos();
                break;

            case "5": 
                console.log("Saindo...");
                continuar = false;
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                break;
        }
    }
}

main().catch((err) => console.error("Erro ao iniciar o menu: ", err));
