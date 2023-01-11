import React from "react";
import {PlaceForm} from "../components/PlaceForm";
import { Place } from "../models/Place";
import { insertPlace } from "../util/database";

export const AddPlace = ({ navigation }) => {
    const createPlaceHandler = async (place: Place) => {
        await insertPlace(place)
        navigation.navigate('AllPlaces')
    }
    return (
        <PlaceForm onCreatePlace={createPlaceHandler} />
    )
}
