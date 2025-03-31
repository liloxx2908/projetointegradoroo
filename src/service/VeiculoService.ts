
import { Veiculo } from "../entity/veiculos";
import { VeiculoRepository } from "../repository/VeiculoRepository";


export class VeiculoService {

    private repo: VeiculoRepository;

    constructor() {
        this.repo = new VeiculoRepository();
    }

    public listarVeiculos(): Promise<Veiculo[]> {
        return this.repo.listarVeiculos();
    }
    

    public async buscarPorPlaca(placa: string): Promise<Veiculo> {
        const veiculo = await this.repo.buscarPorPlaca(placa);

        if (!veiculo) {
            throw new Error("Veículo não encontrado.");
        }

        return veiculo;
    }

    public async inserirVeiculo(placa: string, modelo: string, cor: string, proprietarioId: number): Promise<void> {
        if (!/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(placa)) {
            throw new Error("Placa inválida.");
        }
    
        await this.repo.inserirVeiculo(placa, modelo, cor, proprietarioId);
    }

    public async removerVeiculo(placa: string): Promise<void> {
        await this.repo.removerVeiculo(placa);
    }
}
