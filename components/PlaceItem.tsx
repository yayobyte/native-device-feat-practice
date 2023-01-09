import {Image, Pressable, View, Text} from "react-native"
import { Place } from "../models/Place"

type PlaceItemProps = {
    place: Place
    onSelect: () => void
}

export const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{ uri: place.imageUrl}} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}
