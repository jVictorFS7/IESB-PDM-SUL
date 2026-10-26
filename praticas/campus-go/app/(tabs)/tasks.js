import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { getCurrentPlace } from "../../services/location";
import * as Haptics from "expo-haptics";

export default function TasksScreen() {
  const [label, setLabel] = useState("Sem check-in");

  async function handleCheckIn() {
    const place = await getCurrentPlace();
    if (!place) {
      Alert.alert("Sem localização", "Permissão negada.");
      return;
    }
    setLabel(place.label);
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    Alert.alert("Tarefa concluída");
  }
  return (
    <View>
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      <Text>{label}</Text>
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}
