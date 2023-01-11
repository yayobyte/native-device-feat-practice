import {PlacesList} from "../components/PlacesList";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { Place } from "../models/Place";
import { useEffect, useState } from "react";

type AllPlacesProps = {
    route: RouteProp<{ params: { place: Place }}>
}

export const AllPlaces = ({ route }: AllPlacesProps) => {
    const isFocused = useIsFocused()
    const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([])
    
    useEffect(() => {
        if (isFocused && route.params) {
            setLoadedPlaces(current => [...current, route.params.place])
        }
    }, [isFocused, route])
    return (
        <>
            <PlacesList places={loadedPlaces} />
        </>
    )
}
