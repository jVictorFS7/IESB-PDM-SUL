import { useState } from "react";
import { Image, Pressable, Text, StyleSheet, View } from "react-native";
import { pickImage } from "../../services/media";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PHOTO_KEY = "@profile-photo";

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY).then((saved) => {
      if (saved) setPhotoUri(saved);
    });
  }, []);

  const avatar = photoUri
    ? { uri: photoUri }
    : require("../../assets/icon.png");

  async function handleChangePhoto() {
    const uri = await pickImage();
    if (!uri) return;
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleChangePhoto}>
        <Image source={avatar} style={styles.avatar} />
        <Text>Maria Souza</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
