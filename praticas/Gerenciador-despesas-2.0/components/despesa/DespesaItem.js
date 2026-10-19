import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themes } from "../../constants/theme";

function getDataFormatada(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

function DespesaItem({ item }) {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const colors = themes[scheme === "dark" ? "dark" : "light"];

  function handlePress() {
    navigation.navigate("GerenciarDespesa", {
      expenseId: item.id,
    });
  }

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.itemContainer,
          styles.card,
          { backgroundColor: colors.card },
        ]}
      >
        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>
            {getDataFormatada(item.date)}
          </Text>
        </View>

        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>{item.description}</Text>
        </View>

        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>R$ {item.amount}</Text>
        </View>

        <View
          style={[
            styles.categoriaContainer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <Text style={[styles.categoriaTexto, { color: colors.text }]}>
            {item.category}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  categoriaContainer: {
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  categoriaTexto: {
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default DespesaItem;
