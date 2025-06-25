export interface Ocorrencia {
  id: number;
  descricao: string;
  data: string; // ou Date
  status: 'ABERTA' | 'EM_ANALISE' | 'RESOLVIDA';
  viagemId: number;
  veiculoId: number;
  motoristaId: number;
}