import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import DespesaSumario from "./DespesaSumario";
import DespesaLista from "./DespesaLista";
import { themes } from "../../constants/theme";

function DespesaSaida({ despesas, periodo }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const scheme = useColorScheme();
  const colors = themes[scheme === "dark" ? "dark" : "light"];

  const category = ["Todas", "Alimentação", "Transporte", "Material", "Outros"];

  const despesasFiltradas = categoriaSelecionada
    ? despesas.filter((despesa) => despesa.category === categoriaSelecionada)
    : despesas;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DespesaSumario despesas={despesasFiltradas} periodo={periodo} />

      <View style={styles.container}>
        {category.map((categoria) => {
          const selecionada =
            categoria === "Todas"
              ? categoriaSelecionada === ""
              : categoriaSelecionada === categoria;

          return (
            <Pressable
              key={categoria}
              onPress={() =>
                setCategoriaSelecionada(categoria === "Todas" ? "" : categoria)
              }
              style={[
                styles.label,
                {
                  backgroundColor: selecionada ? colors.primary : colors.card,
                },
              ]}
            >
              <Text
                style={{
                  color: selecionada ? colors.background : colors.text,
                  fontWeight: "500",
                }}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <DespesaLista despesas={despesasFiltradas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 13,
  },
  label: {
    padding: 8,
    margin: 4,
    borderRadius: 5,
  },
});

export default DespesaSaida;
