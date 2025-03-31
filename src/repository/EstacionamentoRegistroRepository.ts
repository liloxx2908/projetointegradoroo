import { Pool } from "pg";
import { Cliente } from "../entity/Cliente";
import { Database } from "./Database";
import { Veiculo } from "../entity/veiculos";
import { RegistroDeEstacionamento } from "../entity/RegistroDeEstacionamento";

export class EstacionamentoRegistroRepository {
    private pool: Pool;
    private tarifaPorHora: number = 5.0; 

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    public async registrarEntrada(placa: string, horaEntrada: string): Promise<void> {
        const query = `
           INSERT INTO pj.registro_estacionamento( placa, horario_entrada) VALUES ($1, $2);
        `;

        try {
            await this.pool.query(query, [placa, horaEntrada]);
            console.log(' registrado com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar:', error);
            throw error;
        }
    }

    public async listarRegistroEstacionamento(): Promise<RegistroDeEstacionamento[]> {
        const query = `SELECT placa, horario_entrada, horario_saida, code_registro, valorpago FROM pj.registro_estacionamento;`;
        const result = await this.pool.query(query);

        const listaRegistroEstacionamento: RegistroDeEstacionamento[] = [];

        for (const row of result.rows) {
            const registro = new RegistroDeEstacionamento();
            registro.criarRegistroEstacionamento(row.placa, row.horario_entrada, row.code_registro, row.horario_saida, row.valorpago);
            listaRegistroEstacionamento.push(registro);
        }

        return listaRegistroEstacionamento;
    }

    private calcularValor(horaEntrada: string, horaSaida: string): number {
        const entrada = new Date(`1970-01-01T${horaEntrada}Z`).getTime();
        const saida = new Date(`1970-01-01T${horaSaida}Z`).getTime();
        const diferencaEmHoras = (saida - entrada) / (1000 * 60 * 60);
        return Math.ceil(diferencaEmHoras) * this.tarifaPorHora; 
    }

    public async registrarSaida(horaSaida: string, code_registro: number): Promise<void> {
        const queryBuscar = 'SELECT horario_entrada FROM pj.registro_estacionamento WHERE code_registro = $1';
        const result = await this.pool.query(queryBuscar, [code_registro]);

        if (result.rows.length === 0) {
            throw new Error('Registro não encontrado');
        }

        const horaEntrada = result.rows[0].horario_entrada;
        const valorPago = this.calcularValor(horaEntrada, horaSaida);

        const queryAtualizar = 'UPDATE pj.registro_estacionamento SET horario_saida = $1, valorpago = $2 WHERE code_registro = $3';
        try {
            await this.pool.query(queryAtualizar, [horaSaida, valorPago, code_registro]);
            console.log('Saída registrada com sucesso! Valor a pagar:', valorPago);
        } catch (error) {
            console.error('Erro ao registrar saída:', error);
            throw error;
        }
    }

    public async buscarPorCode(code_registro: string): Promise<number | null> {
        const query = `
           SELECT  code_registro FROM pj.registro_estacionamento WHERE code_registro = $1
        `;
        const result = await this.pool.query(query, [code_registro]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return row.code_registro;
    }
}
