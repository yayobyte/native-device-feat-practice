import { Image, ScrollView, View, Text, StyleSheet } from "react-native";
import { OutlinedButton } from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";
import { Place } from "../models/Place";

export const PlaceDetails = ({ route, navigation }) => {
	const selectedPlaceId = route.params?.placeId
	const [place, setPlace] = useState<Place>()
	
	const showOnMapHandler = () => {
		console.log(place)
		navigation.navigate('Map', { initialLat: place?.lat, initialLng: place?.lng })
	}
	
	useEffect(() => {
		const loadPlaceData = async () => {
			const selectedPlace = await fetchPlaceDetails(selectedPlaceId)
			await setPlace(selectedPlace as Place)
			navigation.setOptions({
				title: selectedPlace?.title || ''
			})
		}
		loadPlaceData()
	}, [selectedPlaceId])
	
	if(!place) {
		return (
			<View style={styles.fallback}>
				<Text>Loading</Text>
			</View>
		)
	}
	
	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: place?.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{place?.address}</Text>
				</View>
				<OutlinedButton onPress={showOnMapHandler} icon={'map'}>View On Map</OutlinedButton>
			</View>
		</ScrollView>
	)
}

export const styles = StyleSheet.create({
	image: {
		height: '35%',
		minHeight: 300,
		width: '100%'
	},
	locationContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	addressContainer: {
		padding: 20
	},
	address: {
		color: Colors.primary500,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	fallback: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
