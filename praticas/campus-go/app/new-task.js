import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NewTaskScreen() {
  return (
    <View>
      <Text style={styles.title}>Nova tarefa</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}
