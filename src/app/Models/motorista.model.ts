export interface Motorista {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
  validadeCnh: string;
  telefone: string;
  email: string;
  ativo: boolean;
  perfil: 'MOTORISTA' | 'ADMIN';
  senha?: string;

  // Campos de endereço
  cep: string;
  logradouro: string;
  numero: string; 
  bairro: string;
  cidade: string;
  uf: string;
}