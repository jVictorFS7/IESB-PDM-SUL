import DespesaSaida from "../components/despesa/DespesaSaida";

function TodasDespesas() {
  const SIMULA_DESPESAS = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 100.99,
      data: new Date(2025, 2, 11),
      categoria: "Contas",
    },
    {
      id: "2",
      descricao: "Conta de água",
      valor: 40.99,
      data: new Date(2025, 4, 1),
      categoria: "Contas",
    },
  ];
  return <DespesaSaida despesas={SIMULA_DESPESAS} periodo={"Total"} />;
}

export default TodasDespesas;
