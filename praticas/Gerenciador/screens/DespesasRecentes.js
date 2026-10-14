import DespesaSaida from "../components/despesa/DespesaSaida";

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }
  const DESPESAS_RECENTES = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 29.99,
      data: new Date(2026, 9, 10),
      categoria: "Contas",
    },
    {
      id: "2",
      descricao: "Restaurante",
      valor: 300.00,
      data: new Date(2026, 9, 10),
      categoria: "Alimentação",
    },
    {
      id: "3",
      descricao: "Uber",
      valor: 25.00,
      data: new Date(2026, 9, 10),
      categoria: "Transporte",
    },
    {
      id: "4",
      descricao: "Praia",
      valor: 100.00,
      data: new Date(2026, 9, 10),
      categoria: "Lazer",
    }
  ];
  return (
    <DespesaSaida
      despesas={filtrarUltimos7Dias(DESPESAS_RECENTES)}
      periodo={"Últimos 7 dias"}
    />
  );
}

export default DespesasRecentes;
