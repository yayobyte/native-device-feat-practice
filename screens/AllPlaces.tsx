import {PlacesList} from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/Place";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

export const AllPlaces = () => {
    const isFocused = useIsFocused()
    const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([])
    
    useEffect(() => {
        const loadPlaces = async () => {
            if (isFocused) {
                const places = await fetchPlaces()
                setLoadedPlaces(places as Array<Place>)
            }
        }
        loadPlaces()
    }, [isFocused])
    return (
        <>
            <PlacesList places={loadedPlaces} />
        </>
    )
}
