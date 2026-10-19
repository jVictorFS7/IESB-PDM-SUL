import { Pressable, Text, View, StyleSheet } from "react-native";

function getDataFormatada(data) {
  return (
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
  );
}

function DespesaItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{getDataFormatada(item.data)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>R$ {item.valor}</Text>
        </View>
        <View style={styles.categoriaContainer}>
          <Text style={styles.categoriaTexto}>{item.categoria}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
    flexDirection: "row",
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
    alignContent: "left",
  },
  categoriaContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  categoriaTexto: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DespesaItem;
