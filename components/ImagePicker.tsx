import { Alert, Image, View, Text, StyleSheet } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import { OutlinedButton } from "./ui/OutlinedButton";

type ImagePickerProps = {
	onTakeImage: (uri: string) => void
}

export const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
	
	const [cameraPermissionInfo, requestPermission] = useCameraPermissions()
	const [pickedImage, setPickedImage] = useState('')
	
	const verifyPermissions = async () => {
		if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
			const permission = await requestPermission()
			return permission.granted
		}
		if(cameraPermissionInfo?.status === PermissionStatus.DENIED) {
			Alert.alert('Insufficient permissions!', 'You should grant camera permissions to use this app')
			return false
		}
		return true
	}
	
	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return
		}
		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16,9],
			quality: 0.5,
		})
		setPickedImage(image.uri || '')
		onTakeImage(image.uri || '')
	}
	
	return (
		<View>
			<View style={styles.imagePreview}>
				{pickedImage ? <Image source={{ uri: pickedImage}} style={styles.image}/> : <Text>No image taken yet</Text>}
			</View>
			<OutlinedButton onPress={takeImageHandler} icon={'camera'} size={18} >
				Take Image
			</OutlinedButton>
		</View>
	)
}

const styles = StyleSheet.create({
	imagePreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: '100%',
		height: '100%',
	}
})
