import {FlatList, StyleSheet, View, Text} from "react-native";
import { Place } from "../models/Place";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "../constants/colors";

type PlacesListProps = {
    places: Array<Place>
}

export const PlacesList = ({ places }: PlacesListProps) => {
    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet</Text>
            </View>
        )
    }
    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={({ id }) => id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={() => null} />}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 18,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    }
})
