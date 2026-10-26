import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { themes } from "../../constants/theme";

function DespesaSumario({ despesas, periodo }) {
  const scheme = useColorScheme();
  const colors = themes[scheme === "dark" ? "dark" : "light"];

  const somaDespesas = despesas.reduce(
    (total, despesa) => total + despesa.amount,
    0,
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.text }]}>{periodo}</Text>

        <Text style={[styles.quantidade, { color: colors.text }]}>
          {despesas.length} despesa(s)
        </Text>
      </View>

      <Text style={[styles.amount, { color: colors.primary }]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  periodo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantidade: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default DespesaSumario;
