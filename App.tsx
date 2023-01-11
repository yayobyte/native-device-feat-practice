import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllPlaces } from "./screens/AllPlaces";
import { AddPlace } from "./screens/AddPlace";
import { Map } from "./screens/Map";
import { IconButton } from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import { PlaceDetails } from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator()

export default function App() {
	const [isDbInitialized, setDbIsInitialized] = useState(false)
	
	useEffect(() => {
		init().then(() => {
			setDbIsInitialized(true)
		}).catch(() => {
			console.error('Could not initialize DB')
		})
	}, [])
	
	if(!isDbInitialized) {
		return <AppLoading />
	}
	
    return (
        <>
            <StatusBar style="dark"/>
            <NavigationContainer>
                <Stack.Navigator
	                screenOptions={{
						headerStyle: {
							backgroundColor: Colors.primary500,
						},
		                headerTintColor: Colors.gray700,
		                contentStyle: { backgroundColor: Colors.gray700 },
					}
				}>
                    <Stack.Screen
                        name={'AllPlaces'}
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton icon={'add'} size={24} color={tintColor} onPress={() => {
                                    navigation.navigate('AddPlace')
                                }}/>
                            )
                        })}
                    />
                    <Stack.Screen
                        name={'AddPlace'}
                        component={AddPlace}
                        options={{
							title: 'Add a new place'
                        }
					}/>
	                <Stack.Screen name={'Map'} component={Map} />
	                <Stack.Screen name={'PlaceDetails'} component={PlaceDetails} options={{ title: 'Loading place...'}} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
