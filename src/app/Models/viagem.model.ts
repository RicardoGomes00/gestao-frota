export interface Viagem {
  id: number;
  destino: string;
  justificativa: string;
  dataHoraSaida: string;
  dataHoraRetorno?: string; 
  status: 'AGENDADO' | 'EM_USO' | 'FINALIZADO';
  quilometragemInicial?: number;
  quilometragemFinal?: number;
  veiculo: { 
    id: number;
    placa: string;
    modelo: string;
  };
  motorista: {
    id: number;
    nomeCompleto: string;
  };
}