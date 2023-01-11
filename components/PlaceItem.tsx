import {Image, Pressable, View, Text, StyleSheet} from "react-native"
import { Place } from "../models/Place"
import { Colors } from "../constants/colors";

type PlaceItemProps = {
    place: Place
    onSelect: () => void
}

export const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
    return (
        <Pressable onPress={onSelect} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <Image source={{ uri: place.imageUrl}} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1},
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.85
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
})
