
export class Cliente{
    private id: number;
    private nome: string;
    private email: string;
    private telefone: string;

    constructor (nome:string,email:string,telefone:string,id:number){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
    getId():number{
        return this.id
    }

    getNome():string{
        return this.nome
    }

    getEmail():string{
        return this.email
    }

    getTelefone():string{
        return this.telefone
    }
}
