import { Button, Share, Text, View } from "react-native";
import { useExpenses } from "../../store/expenses-context";

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  async function shareSummary(total) {
    await Share.share({
      message: `Gastei R$ ${total.toFixed(2)} este mês.`,
    });
  }
  return (
    <View>
      <Text>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={() => shareSummary(total)} />
    </View>
  );
}
