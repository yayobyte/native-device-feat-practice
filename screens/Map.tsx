import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { MapPressEvent } from "react-native-maps/lib/MapView.types";
import { useState } from "react";

const region = { latitude: 25.09, longitude: 55.17, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

export const Map = () => {
	const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number} | undefined>()
	
	const selectLocationHandler = (event: MapPressEvent) => {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude
		
		setSelectedLocation({ lat, lng })
	}
	
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
