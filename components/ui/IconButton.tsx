import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from "react-native";

type IconButtonProps = {
    icon: any,
    size?: number,
    onPress?: () => void
    color?: string
}

export const IconButton = ({ icon, size, onPress, color }: IconButtonProps) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed ]}>
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.7
    },
})
