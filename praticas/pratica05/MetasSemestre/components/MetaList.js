import { StyleSheet, Text, Pressable, View, FlatList } from 'react-native';

function MetaList({metas, onDelete}) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            android_ripple={{ color: "yellow" }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={{ padding: 8 }}>
              {item.texto}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 8,
    backgroundColor: 'lightblue',
  }
});

export default MetaList;