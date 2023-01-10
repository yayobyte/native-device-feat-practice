import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../constants/colors";

export const PlaceForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('')
    
    const changeTitleHandler = (enteredText: string) => {
        setEnteredTitle(enteredText)
    }
    return (
        <ScrollView style={style.form}>
            <View>
                <Text style={style.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={style.input}/>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
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
