import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Button,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useLayoutEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useExpenses } from "../store/expenses-context";

function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const selected = expenses.find((e) => e.id === expenseId);

  const [showPicker, setShowPicker] = useState(false);

  const handlerChangeValor = (text) => {
    const cleanText = text.replace(",", ".");

    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      handleChange("amount", cleanText);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar despesa" : "Nova despesa",
    });
  }, [navigation, isEditing]);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      handleChange("date", selectedDate);
    }
  };

  const [form, setForm] = useState({
    description: selected?.description ?? "",
    amount: selected ? String(selected.amount) : "",
    date: selected?.date ?? new Date(),
    category: selected?.category ?? "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  const CATEGORIES = ["Alimentação", "Transporte", "Material", "Outros"];
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  function confirmDelete() {
    Alert.alert("Excluir despesa", "Esta ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function validate(values) {
    const errors = {};
    const amount = Number(values.amount.replace(",", "."));
    const date = new Date(values.date);
    if (values.description.trim().length < 3)
      errors.description = "Mínimo de 3 caracteres";
    if (isNaN(amount) || amount <= 0)
      errors.amount = "Informe um valor maior que zero";
    if (isNaN(date.getTime()) || date > new Date())
      errors.date = "A data não pode ser futura";
    if (!values.category) errors.category = "Escolha uma categoria";
    return errors;
  }

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const amount = parseFloat(form.amount.replace(",", "."));
    const data = { ...form, amount };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  function selectCategory(category) {
    handleChange("category", category);
    setIsPickerOpen(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição</Text>

            <TextInput
              style={[styles.input, errors.description && styles.inputError]}
              maxLength={20}
              value={form.description}
              onChangeText={(text) => handleChange("description", text)}
            />
            {errors.description && (
              <Text style={styles.textoErro}>{errors.description}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor da Despesa</Text>

            <TextInput
              style={[styles.input, errors.amount && styles.inputError]}
              keyboardType="decimal-pad"
              value={form.amount}
              onChangeText={handlerChangeValor}
            />
            {errors.amount && (
              <Text style={styles.textoErro}>{errors.amount}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data da Despesa</Text>

            <Pressable
              onPress={() => setShowPicker(true)}
              style={[styles.input, errors.date && styles.inputError]}
            >
              <Text>{new Date(form.date).toLocaleDateString("pt-BR")}</Text>
            </Pressable>
            {errors.date && <Text style={styles.textoErro}>{errors.date}</Text>}

            {showPicker && (
              <DateTimePicker
                value={new Date(form.date)}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Categoria da Despesa</Text>

            <Pressable
              style={[styles.input, errors.category && styles.inputError]}
              onPress={() => setIsPickerOpen(true)}
            >
              <Text>{form.category || "Selecione uma categoria"}</Text>
            </Pressable>

            {errors.category && (
              <Text style={styles.textoErro}>{errors.category}</Text>
            )}
          </View>

          <Modal
            visible={isPickerOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsPickerOpen(false)}
          >
            <View style={styles.backdrop}>
              <View style={styles.modalContent}>
                <Text style={styles.label}>Categoria da Despesa</Text>

                <View
                  style={[
                    styles.categoriasContainer,
                    errors.category && styles.categoriasError,
                  ]}
                >
                  {CATEGORIES.map((category) => (
                    <Pressable
                      key={category}
                      style={[
                        styles.categoriaBotao,
                        form.category === category &&
                          styles.categoriaSelecionada,
                      ]}
                      onPress={() => selectCategory(category)}
                    >
                      <Text
                        style={[
                          styles.categoriaTexto,
                          form.category === category &&
                            styles.categoriaTextoSelecionado,
                        ]}
                      >
                        {category}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {errors.category && (
                  <Text style={styles.textoErro}>{errors.category}</Text>
                )}

                {form.category !== "" && (
                  <Text style={styles.textoCategoria}>
                    Categoria selecionada: {form.category}
                  </Text>
                )}

                <Pressable
                  style={styles.botaoSalvar}
                  onPress={() => setIsPickerOpen(false)}
                >
                  <Text style={styles.textoBotao}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Pressable style={styles.botaoSalvar} onPress={handleSubmit}>
            <Text style={styles.textoBotao}>
              {isEditing ? "Salvar alterações" : "Cadastrar despesa"}
            </Text>
          </Pressable>
          {isEditing && (
            <Button title="Excluir" color="#E31E24" onPress={confirmDelete} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputError: {
    borderColor: "#E31E24",
  },
  textoErro: {
    color: "#E31E24",
    fontSize: 12,
    marginTop: 4,
  },
  categoriasError: {
    borderWidth: 1,
    borderColor: "#E31E24",
    borderRadius: 6,
    padding: 6,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default GerenciarDespesa;
