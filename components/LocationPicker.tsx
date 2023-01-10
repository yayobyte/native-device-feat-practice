import { Alert, StyleSheet, View } from "react-native";
import { OutlinedButton } from "./ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";

export const LocationPicker = () => {
	
	const [locationPermission, requestPermission] = useForegroundPermissions()
	
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
		console.log(location)
	}
	
	const pickOnMapHandler = () => {
	
	}
	
	return (
		<View>
			<View style={styles.mapPreview}></View>
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
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
})
