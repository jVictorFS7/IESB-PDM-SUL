import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { useNotices } from "../../hooks/useNotices";
import { FadeIn } from "../../components/FadeIn";

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  if (isLoading && notices.length === 0) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
  if (error) {
    return (
      <View>
        <Text>Não foi possível carregar: {error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }
  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <NoticeCard notice={item} />}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={<Text>Nenhum aviso.</Text>}
    />
  );
}

function NoticeCard({ notice }) {
  return (
    <FadeIn>
      <View>
        <Text>{notice.title}</Text>
        <Text numberOfLines={2}>{notice.body}</Text>
      </View>
    </FadeIn>
  );
}
