import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Titulo_App,
  Placeholder_Campo,
  Titulo_Botao,
  Titulo_Lista,
} from "./labels";


export default function App() {
  const disciplinas = ["Matemática", "Português", "História", "Geografia"];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>{Titulo_App}</Text>
      <View style={styles.linha}>
          <TextInput style={styles.input}>{Placeholder_Campo}</TextInput>
        <View style={styles.botao}>
          <Button title={Titulo_Botao}></Button>
        </View>
      </View>
      <Text style={styles.titulo_lista}>{Titulo_Lista}</Text>
      <View style={styles.lista}>
        {disciplinas.map((disciplina, index) => (
          <Text key={index} style={styles.item}>
            {disciplina}
          </Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //O flex faz com que o app ocupe todo o espaço disponível na tela, o padding define o espaço interno do componente, backgroundcolor define uma cor de fundo, alignitems alinha os elementos filhos no centro do eixo secundário, gap cria espaço entre os elementos filhos.
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 15,
  },
  // O fontsize define do temanho do titulo, fontweight deixa o titulo em negrito e o textalign centraliza o texto.
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Configuração para que o input e o botão fiquem em linha através do flexdirection.
  linha:{
    flexDirection: 'row', 
  },
  // Configração do campo de preenchimento com borderwidth para fácil visualização, borderradius para leve arredondamento nas bordas e a cor para deixar com um destaque mais suave usando bordercolor. Definida a largura de 70% do tamanho da tela atravé do width.
  input:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D3D3D3",
    width: '70%'
  },
  // Definida a largura de 30% do tamanho da tela utilizando width.
  botao: {
    width: '30%',
  },
  //Subtitulo da disciplinas com tamanho inferior ao titulo principal usando fontsize e em negrito para melhor destaque utilizando fontweigth.
  titulo_lista: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // largura definida para ocupar todo o espaço da tela.
  lista: {
    width: '100%',
  },
  // Cria espaço externo entre os itens da lista, cria espaço interno entre o texto e as bordas do item e destaca visualmente cada disciplina da lista.
  item: {
    textAlign: "center",
    fontSize: 18,
    margin: 5,
    padding: 12,
    backgroundColor: '#f0f0f0',
  }
});
