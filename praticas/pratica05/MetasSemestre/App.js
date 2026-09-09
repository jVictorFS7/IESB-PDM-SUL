import { StyleSheet, View, Alert, Image, Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MetaList from "./components/MetaList";
import MetaInput from "./components/MetaInput";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [metas, setMetas] = useState([]);
  const [textoMeta, setTextoMeta] = useState("");

  useEffect(() => {
    async function carregarMetas() {
      try {
        const metasSalvas = await AsyncStorage.getItem("@metas_semestre");

        if (metasSalvas !== null) {
          setMetas(JSON.parse(metasSalvas));
        }
      } catch (erro) {
        Alert.alert("Erro", "Não foi possível carregar as metas.");
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem("@metas_semestre", JSON.stringify(metas));
      } catch (erro) {
        Alert.alert("Erro", "Não foi possível salvar as metas.");
      }
    }

    salvarMetas();
  }, [metas]);

  function adicionarMetaHandler(inputMeta) {
    if (inputMeta.trim() === "") {
      Alert.alert("Meta inválida! Informe uma meta antes de adicionar");
      return;
    }
    const novaMeta = {
      id: Date.now().toString(),
      texto: inputMeta,
      criadaEm: new Date().toISOString(),
    };
    setMetas([...metas, novaMeta]);
    setTextoMeta("");
  }

  function deletarMetaHandler(id) {
    console.log(id);
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/image.png")} style={styles.image} />
          <Text style={styles.title}>Minhas Metas Acadêmicas</Text>
        </View>
          <MetaInput
            value={textoMeta}
            onChangeText={setTextoMeta}
            onAdd={() => adicionarMetaHandler(textoMeta)}
          />
          <View style={styles.metaContainer}>
            <MetaList metas={metas} onDelete={deletarMetaHandler} />
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
  },

  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  metaContainer: {
    flex: 15,
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
