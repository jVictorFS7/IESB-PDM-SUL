import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({icon, size, color, onPress}){
    return(
        <Pressable 
        onPress={onPress}
        style={({pressed}) => ({
            opacity: pressed ? 0.5 : 1,
        })}>
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

export default IconButton;