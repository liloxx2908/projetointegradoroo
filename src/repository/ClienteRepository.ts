0
import { Pool } from "pg";
import { Cliente } from "../entity/Cliente";
import { Database } from "./Database";


export class ClienteRepository{

    private pool : Pool ;

    constructor(){
        this.pool = Database.iniciarConexao();
    }

    public async  listarCliente ():Promise<Cliente[]>{

        const query = "SELECT * FROM .CLIENTES";
        const result =  await this.pool.query(query);

        const listaClientes: Cliente[] = [];
        
        for(const row of result.rows){
            const cliente = new Cliente(row.nome, row.email,row.telefone,row.id);
            listaClientes.push(cliente);            
        }             
        return listaClientes;
    }

    public async buscarPorId(id: number): Promise<Cliente[]>{
        let query = "SELECT * FROM PUBLIC.CLIENTES WHERE ID = $1"
        let result = await this.pool.query(query,[id])

        const listaClientes: Cliente[] = [];

        for(const row of result.rows){
            const cliente = new Cliente(row.nome, row.email,row.telefone,row.id);
            listaClientes.push(cliente);            
        }            

        return listaClientes;
    }   

    public async inserirCliente(cliente:Cliente): Promise<void> {
        let query = "INSERT INTO PUBLIC.CLIENTES (nome, email, telefone) VALUES ($1, $2, $3)";
        
        await this.pool.query(query, [cliente.getNome, cliente.getEmail, cliente.getTelefone]);
    }
    
    public async removerUsuario(id: number){
        let query = "DELETE FROM PUBLIC.CLIENTES WHERE ID = $1"
        let result = await this.pool.query(query,[id])
        
    }

}
