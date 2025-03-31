import { Cliente } from "./Cliente";

export class Veiculo {
    private placa: string;
    private modelo: string;
    private cor: string;
    private proprietario: String;

    constructor(placa: string, modelo: string, cor: string, proprietario: String) {
        this.placa = placa;
        this.modelo = modelo;""
        this.cor = cor;
        this.proprietario = proprietario;
    }
}