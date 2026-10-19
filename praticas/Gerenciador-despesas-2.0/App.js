import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContextProvider } from "./store/expenses-context";


import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import TodasDespesas from "./screens/TodasDespesas";
import IconButton from "./components/IconButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="add-circle-outline"
            size={28}
            color="black"
            onPress={() => navigation.navigate("GerenciarDespesa")}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: "Despesas Recentes",
          tabBarLabel: "Recentes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: "Todas as Despesas",
          tabBarLabel: "Todas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={BottomTabScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GerenciarDespesa"
          component={GerenciarDespesa}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
  );
}

export default App;
