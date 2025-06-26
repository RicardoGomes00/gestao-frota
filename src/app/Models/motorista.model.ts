export interface Motorista {
  id: number;
  ativo: boolean;
  
  email: string;
  perfil: 'MOTORISTA' | 'ADMIN';
  nomeCompleto: string; 
  cpf: string;
  cnhNumero: string; 
  cnhValidade: string; 
  telefone: string;
  
  cep: string;
  logradouro: string;
  numero: string; 
  bairro: string;
  cidade: string;
  uf: string;
  
  senha?: string;
}
