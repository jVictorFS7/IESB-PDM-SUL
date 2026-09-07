import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from "../mensagens";

function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
    >
      <View style={{ width: "65%" }}>
        <TextInput
          style={styles.inputText}
          placeholder={rotulo_input_meta}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <View style={{ width: "30%" }}>
        <Pressable style={styles.button} onPress={onAdd}>
          <Text style={styles.buttonText}>{rotulo_btn_cadastro_meta}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#6495ED",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MetaInput;
