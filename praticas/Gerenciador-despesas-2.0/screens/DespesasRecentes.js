import DespesaSaida from "../components/despesa/DespesaSaida";
import { useExpenses } from "../store/expenses-context";
import { useColorScheme, View } from "react-native";
import { themes } from "../constants/theme";

function DespesasRecentes() {
  const scheme = useColorScheme();
  const colors = themes[scheme === "dark" ? "dark" : "light"];
  const { expenses } = useExpenses();
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const recent = expenses.filter(
    (e) => e.date >= sevenDaysAgo && e.date <= today,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <DespesaSaida despesas={recent} periodo="Últimos 7 dias" />
    </View>
  );
}

export default DespesasRecentes;
