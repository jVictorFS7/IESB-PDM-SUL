import { useMemo, useState } from "react";
import { TextInput, View, useColorScheme } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import { themes } from "../constants/theme";
import { useExpenses } from "../store/expenses-context";
import { useDebounce } from "../hooks/useDebounce";

function TodasDespesas() {
  const { expenses } = useExpenses();

  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 400);

  const scheme = useColorScheme();

  const colors = themes[scheme === "dark" ? "dark" : "light"];

  const bg = { backgroundColor: colors.background };

  const filtered = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();

    return expenses.filter((e) => e.description.toLowerCase().includes(term));
  }, [expenses, debouncedQuery]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
      <TextInput
        placeholder="Buscar despesa por descrição..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />

      <DespesaSaida despesas={filtered} periodo="Total" />
    </View>
  );
}

export default TodasDespesas;
