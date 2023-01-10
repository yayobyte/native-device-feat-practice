import { StyleSheet, View } from "react-native";
import { OutlinedButton } from "./ui/OutlinedButton";
import { Colors } from "../constants/colors";

export const LocationPicker = () => {
	const getLocationHandler = () => {
	
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
