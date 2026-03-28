import IEndereco from "./IEndereco";

export default interface IClinica {
    email: string,
    nome: string,
    password: string,
    endereco: IEndereco;
}