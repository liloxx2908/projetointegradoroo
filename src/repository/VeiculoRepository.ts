import { Pool } from "pg";
import { Cliente } from "../entity/Cliente";
import { Database } from "./Database";
import { Veiculo } from "../entity/veiculos";



export class VeiculoRepository{
    
    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    public async listarVeiculos(): Promise<Veiculo[]> {
        const query = `
          SELECT placa, modelo, cor, proprietario FROM pj.veiculos;
        `;
        const result = await this.pool.query(query);

        const listaVeiculos: Veiculo[] = [];

        for (const row of result.rows) {
           
            const veiculo = new Veiculo(row.placa, row.modelo, row.cor, row.proprietario);
            listaVeiculos.push(veiculo);
        }

        return listaVeiculos;
    }

    public async buscarPorPlaca(placa: string): Promise<Veiculo | null> {
        const query = `
            SELECT v.placa, v.modelo, v.cor, v.proprietario
            FROM PJ.VEICULOS v
            WHERE V.placa ilike $1
            
           
        `;
        const result = await this.pool.query(query, [placa]);

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return new Veiculo(row.placa, row.modelo, row.cor, row.proprietario);
    }

    public async inserirVeiculo(placa: string, modelo: string, cor: string, proprietarioId: number): Promise<void> {
        const query = `
           INSERT INTO pj.veiculos (placa, modelo, cor, proprietario) VALUES ($1, $2, $3, $4);
        `;
        await this.pool.query(query, [placa, modelo, cor, proprietarioId]);
    }

    public async removerVeiculo(placa: string): Promise<void> {
        const query = "DELETE FROM pj.veiculos WHERE placa = $1;";
        await this.pool.query(query, [placa]);
    }
}