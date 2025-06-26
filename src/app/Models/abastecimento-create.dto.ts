export interface AbastecimentoCreateDTO {
  veiculoId: number | null;
  motoristaId: number | null;
  dataAbastecimento: string;
  tipoCombustivel: string;
  valorTotal: number | null;
  quilometragemNoAbastecimento: number | null;
}
