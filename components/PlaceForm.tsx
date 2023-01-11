import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { Colors } from "../constants/colors";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";
import { Button } from "./ui/Button";
import { Place, Location } from "../models/Place";

type PlaceFormProps = {
    onCreatePlace: (place: Place) => void
}

export const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [selectedImage, setSelectedImage] = useState<string | undefined>()
    const [pickedLocation, setPickedLocation] = useState<Location | undefined>()
    const [pickedAddress, setPickedAddress] = useState<any>()
    
    const changeTitleHandler = (enteredText: string) => {
        setEnteredTitle(enteredText)
    }
    
    const savePlaceHandler = () => {
        if (selectedImage && pickedLocation) {
            const placeData = new Place(enteredTitle, selectedImage, pickedAddress, pickedLocation)
            onCreatePlace(placeData)
        }
    }
    
    const takeImageHandler = (imageUri: string) => {
        setSelectedImage(imageUri)
    }
    
    const pickLocationHandler = useCallback((location: Location, address: any) => {
        setPickedLocation(location)
        setPickedAddress(address)
    }, [])
    
    return (
        <ScrollView style={style.form}>
            <View>
                <Text style={style.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={style.input}/>
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add place</Button>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    form: {
        flexGrow: 1,
        padding: 24,
        
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
})
