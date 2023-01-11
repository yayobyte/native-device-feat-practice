import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { MapPressEvent } from "react-native-maps/lib/MapView.types";
import { useCallback, useLayoutEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { IconButton } from "../components/ui/IconButton";

type MapProps = {
	navigation: NavigationProp<{}>
}

const region = { latitude: 25.09, longitude: 55.17, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

export const Map = ({ navigation }: MapProps) => {
	const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number} | undefined>()
	
	const selectLocationHandler = (event: MapPressEvent) => {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude
		
		setSelectedLocation({ lat, lng })
	}
	
	const savePickedLocation = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert('No location picked', 'You have to pick a location by tapping the map first')
			return
		}
		navigation.navigate('AddPlace', { pickedLocation: selectedLocation })
	}, [selectedLocation])
	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: ({ tintColor }) => <IconButton icon={'save'} color={tintColor} size={18} onPress={savePickedLocation}/>
		})
	}, [navigation, savePickedLocation])
	
	return (
		<MapView
			style={styles.map}
			initialRegion={region}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title={'Picked Location'}
					coordinate={{
						latitude: selectedLocation?.lat || 0,
						longitude: selectedLocation?.lng || 0
					}}
				/>
			)}
		</MapView>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	}
})
