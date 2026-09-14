import { StyleSheet, View, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CompromissoInput from "./components/CompromissoInput";
import CompromissoList from "./components/CompromissoList";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lista_vazia } from "./labels";

export default function App() {
  const [textoCompromisso, setTextoCompromisso] = useState("");
  const [compromisso, setCompromisso] = useState([]);
  const [carregando, setCarregando] = useState(true);

  function adicionarCompromisso() {
    if (textoCompromisso.trim() === "") {
      Alert.alert("Informe um compromisso antes de adicionar");
      return;
    }
    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoCompromisso,
      criadoEm: new Date().toISOString(),
    };
    setCompromisso([...compromisso, novoCompromisso]);
    setTextoCompromisso("");
  }

  function deletarCompromisso(id) {
    console.log(id);
    const novosCompromissos = compromisso.filter(
      (compromisso) => compromisso.id !== id,
    );
    setCompromisso(novosCompromissos);
  }

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const compromissosSalvos = await AsyncStorage.getItem(
          "@rotina_iesb_compromissos",
        );

        if (compromissosSalvos !== null) {
          setCompromisso(JSON.parse(compromissosSalvos));
        }
      } catch (error) {
        Alert.alert("Não foi possível carregar os compromissos salvos");
      }finally{
        setCarregando(false);
      }
    }

    carregarCompromissos();
  }, []);

  useEffect(() => {
    if(carregando){
      return;
    }
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(
          "@rotina_iesb_compromissos",
          JSON.stringify(compromisso),
        );
      } catch (error) {
        Alert.alert("Não foi possível salvar os compromissos");
      }
    }

    salvarCompromissos();
  }, [compromisso]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.conteudo}>
          <CompromissoInput
            value={textoCompromisso}
            onChangeText={setTextoCompromisso}
            onAdd={adicionarCompromisso}
          />
          <View style={styles.lista}>
            <CompromissoList
              itens={compromisso}
              onDelete={deletarCompromisso}
              listaVazia={lista_vazia}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    gap: 50,
  },
  lista: {
    flex: 1,
  },
});
