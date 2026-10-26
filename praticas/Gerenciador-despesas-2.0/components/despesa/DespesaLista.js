import { Text, FlatList, View, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DespesaItem from "./DespesaItem";
import { themes } from "../../constants/theme";

function DespesaLista({ despesas }) {
  const scheme = useColorScheme();
  const colors = themes[scheme === "dark" ? "dark" : "light"];

  return (
    <FlatList
      style={{ flex: 1 }}
      data={despesas}
      renderItem={({ item }) => <DespesaItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <View style={styles.containerVazio}>
          <Ionicons name="receipt-outline" size={48} color={colors.primary} />

          <Text style={[styles.titulo, { color: colors.text }]}>
            Nenhuma Despesa
          </Text>

          <Text style={[styles.mensagem, { color: colors.text }]}>
            Toque em + para adicionar
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  containerVazio: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 40,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  mensagem: {
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});

export default DespesaLista;
