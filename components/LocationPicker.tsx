import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "./ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { getMapPreview } from "../util/location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export const LocationPicker = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const [locationPermission, requestPermission] = useForegroundPermissions()
	const [pickedLocation, setPicketLocation] = useState<{ lat: number, lng: number} | undefined>()
	
	const mapPickedLocation = route.params?.pickedLocation
	
	const verifyPermissions = async () => {
		if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission()
			return permissionResponse.granted
		}
		if (locationPermission?.status === PermissionStatus.DENIED) {
			Alert.alert('Insufficient Permissions!', 'You need to grant permissions to location to use this app')
			return false
		}
		return true
	}
	
	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions()
		if (!hasPermission) {
			return
		}
		const location = await getCurrentPositionAsync()
		setPicketLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		})
	}
	
	const pickOnMapHandler = () => {
		navigation.navigate('Map')
	}
	
	useEffect(() => {
		if(mapPickedLocation) {
			setPicketLocation({ ...mapPickedLocation })
		}
	}, [mapPickedLocation])
	
	return (
		<View>
			<View style={styles.mapPreview}>
				{pickedLocation ? (
					<Image
						style={styles.image}
						source={{
							uri: getMapPreview(pickedLocation?.lat.toString(),pickedLocation?.lng.toString())
						}
					}/>
					
				): (
					<Text>No Location picked yet</Text>
				)}
			</View>
			<View style={styles.actions}>
				<OutlinedButton
					onPress={getLocationHandler}
					icon={'location'}
					size={18}
				>
					Locate User
				</OutlinedButton>
				<OutlinedButton
					onPress={pickOnMapHandler}
					icon={'map'}
					size={18}
				>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 16,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: 'hidden',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 4,
	}
})
