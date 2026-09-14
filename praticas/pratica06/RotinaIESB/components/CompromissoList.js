import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";
import { titulo_lista } from "../labels";

function CompromissoList({ itens, onDelete, listaVazia }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo_lista}>{titulo_lista}</Text>
      {itens.length === 0 ? (
        <Text style={styles.mensagem}>{listaVazia}</Text>
      ) : (
        itens.map((compromisso) => {
          return (
            <View key={compromisso.id} style={styles.lista}>
              <Pressable
                android_ripple={{ color: "yellow" }}
                onPress={() => onDelete(compromisso.id)}
              >
                <Text style={styles.item}>{compromisso.texto}</Text>
              </Pressable>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  titulo_lista: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 3,
  },
  lista: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#D92F35',
    borderRadius: 5,
    margin: 10,
  },
  item:{
    fontSize: 15,
    color: 'white',
  },
  mensagem: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default CompromissoList;
