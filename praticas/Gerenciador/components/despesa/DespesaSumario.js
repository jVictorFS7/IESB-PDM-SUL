import { View, Text, StyleSheet } from "react-native";

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={styles.valor}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "grey",
  },
  periodo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DespesaSumario;
