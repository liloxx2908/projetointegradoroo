import { Veiculo } from "./veiculos";

export class RegistroDeEstacionamento {
    private veiculo: Veiculo;
    private horarioEntrada: string;
    private horarioSaida: string;
    private valorPago: number;
    private code_registro: number

    criarRegistroEntrada(veiculo: Veiculo, horarioEntrada: string, code_registro: number) {
        this.veiculo = veiculo;
        this.horarioEntrada = horarioEntrada;
        this.code_registro = code_registro;

    }


    criarRegistroEstacionamento(veiculo: Veiculo, horarioEntrada: string, code_registro: number, horarioSaida:string, valorPago: number) {
        this.veiculo = veiculo
        this.horarioEntrada = horarioEntrada
        this.horarioSaida = horarioSaida
        this.valorPago = valorPago
        this.code_registro = code_registro

    }
}