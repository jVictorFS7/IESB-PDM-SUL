import { router, useLocalSearchParams } from "expo-router";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
