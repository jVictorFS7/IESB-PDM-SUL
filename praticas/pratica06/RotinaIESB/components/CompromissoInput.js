import { TextInput, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { placeholderCompromisso, botao_adicionar, titulo_app } from "../labels";

function CompromissoInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>{titulo_app}</Text>
      </View>

      <View style={styles.formulario}>
        <TextInput
          placeholder={placeholderCompromisso}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
        />

        <Pressable style={styles.botao} android_ripple={{ color: "#B02025" }} onPress={onAdd}>
          <Text style={styles.placeholder}>{botao_adicionar}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    gap: 20,
  },
  imagem: {
    width: 100,
  },
  titulo:{
    fontSize: 35,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  formulario: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
  },
  textInput: {
    width: '65%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DCDCDC',
  },
  botao: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D92F35',
    borderRadius: 5,
  },
  placeholder: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default CompromissoInput;
