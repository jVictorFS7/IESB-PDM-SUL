import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

function GerenciarDespesa() {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const categorias = ["Alimentação", "Transporte", "Lazer", "Contas"];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handlerChangeValor = (text) => {
    const cleanText = text.replace(",", ".");

    //Expressão para cpturar apenas números com até 2 casas decimais
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      setValor(cleanText);
    }
  };

  const validarFormulario = () => {
    if (!descricao.trim()) {
      Alert.alert("Atenção", "Informe a descrição.");
      return false;
    }

    if (
      !valor.trim() ||
      !Number.isFinite(Number(valor)) ||
      Number(valor) <= 0
    ) {
      Alert.alert("Atenção", "Informe um valor válido.");
      return false;
    }

    if (!categoria) {
      Alert.alert("Atenção", "Selecione uma categoria.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validarFormulario()) {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={"decimal-pad"}
          value={valor}
          onChangeText={handlerChangeValor}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString("pt-BR")}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria da Despesa</Text>

        <View style={styles.categoriasContainer}>
          {categorias.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.categoriaBotao,
                categoria === item && styles.categoriaSelecionada,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoria === item && styles.categoriaTextoSelecionado,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {categoria !== "" && (
          <Text style={styles.textoCategoria}>
            Categoria selecionada: {categoria}
          </Text>
        )}
      </View>
      <Pressable style={styles.botaoSalvar} onPress={handleSubmit}>
        <Text style={styles.textoBotao}>Cadastrar Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  categoriaBotao: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  categoriaSelecionada: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoriaTexto: {
    color: "#333",
    fontSize: 13,
  },
  categoriaTextoSelecionado: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoCategoria: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
  },
  botaoSalvar: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default GerenciarDespesa;
