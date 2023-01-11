import React from "react";
import {PlaceForm} from "../components/PlaceForm";
import { Place } from "../models/Place";

export const AddPlace = ({ navigation }) => {
    const createPlaceHandler = (place: Place) => {
        console.log('here you go')
        navigation.navigate('AllPlaces', { place })
    }
    return (
        <PlaceForm onCreatePlace={createPlaceHandler} />
    )
}
