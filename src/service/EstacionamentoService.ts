import { RegistroDeEstacionamento } from "../entity/RegistroDeEstacionamento";
import { EstacionamentoRegistroRepository } from "../repository/EstacionamentoRegistroRepository";

export class EstacionamentoService {

    private repo: EstacionamentoRegistroRepository;

    constructor() {
        this.repo = new EstacionamentoRegistroRepository();
    }

    public async registrarEntrada(placa: string, horaEntrada: string): Promise<void> {
        await this.repo.registrarEntrada(placa, horaEntrada);
    }


    public async listarRegistroEstacionamento(): Promise<RegistroDeEstacionamento[]> {
        return await this.repo.listarRegistroEstacionamento();
    }

    public async registrarSaida(horaSaida: string, code_registro: number): Promise<void> {
        console.log(horaSaida)
        console.log(code_registro)

        await this.repo.registrarSaida(horaSaida, code_registro);

    }

    public async buscarPorCode(code_registro: string): Promise<number | null> {
        return await this.repo.buscarPorCode(code_registro);
    }

    //public calcularValor(horaEntrada: string, horaSaida: string): number {
        
    //}
}
