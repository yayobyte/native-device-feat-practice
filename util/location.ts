import { GOOGLE_API_KEY } from "../googleApiKey";

const ZOOM = 14
const WEIGHT = 400
const HEIGHT = 200
const MARKER_COLOR = 'red'

export const getMapPreview = (lat: string = '0', lng: string = '0') => {
	return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${ZOOM}&size=${WEIGHT}x${HEIGHT}&maptype=roadmap
&markers=color:${MARKER_COLOR}%7Clabel:U%7C${lat},${lng}
&key=${GOOGLE_API_KEY}`
}