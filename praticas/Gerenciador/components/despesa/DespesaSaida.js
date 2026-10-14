import { Pressable, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import DespesaSumario from "./DespesaSumario";
import DespesaLista from "./DespesaLista";

function DespesaSaida({ despesas, periodo }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const categorias = ["Todas", "Alimentação", "Transporte", "Lazer", "Contas"];

  const despesasFiltradas = categoriaSelecionada
    ? despesas.filter((despesa) => despesa.categoria === categoriaSelecionada)
    : despesas;

  return (
    <View>
      <DespesaSumario despesas={despesasFiltradas} periodo={periodo} />
      <View style={styles.container}>
        {categorias.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() =>
              setCategoriaSelecionada(categoria === "Todas" ? "" : categoria)
            }
            style={styles.label}
          >
            <Text>{categoria}</Text>
          </Pressable>
        ))}
      </View>
      <DespesaLista despesas={despesasFiltradas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  label: {
    padding: 6,
    margin: 4,
    backgroundColor: "#D6D3D1",
    borderRadius: 5,
  },
});

export default DespesaSaida;
