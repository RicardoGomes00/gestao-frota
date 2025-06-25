export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  tipo: string;
  ano: number;
  quilometragem: number;
  status: 'Disponível' | 'Inativo' | 'Em Manutenção';
}