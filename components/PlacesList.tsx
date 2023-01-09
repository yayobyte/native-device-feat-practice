import {FlatList} from "react-native";
import { Place } from "../models/Place";
import { PlaceItem } from "./PlaceItem";

type PlacesListProps = {
    places: Array<Place>
}

export const PlacesList = ({ places }: PlacesListProps) => {
    return (
        <FlatList
            data={places}
            keyExtractor={({ id }) => id}
            renderItem={({item}) => <PlaceItem place={item} onSelect={() => null} />}
        />
    )
}
