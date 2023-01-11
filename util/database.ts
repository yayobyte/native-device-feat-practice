import * as SQLite from 'expo-sqlite';
import { Place } from "../models/Place";

const database = SQLite.openDatabase('places.db');

const PLACES_TABLE = 'places'
const TITLE_FIELD = 'title'
const IMAGE_URI_FIELD = 'imageUri'
const ADDRESS_FIELD = 'address'
const LAT_FIELD = 'lat'
const LNG_FIELD = 'lng'

export function init() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS ${PLACES_TABLE} (
                id INTEGER PRIMARY KEY NOT NULL,
                ${TITLE_FIELD} TEXT NOT NULL,
                ${IMAGE_URI_FIELD} TEXT NOT NULL,
                ${ADDRESS_FIELD} TEXT NOT NULL,
                ${LAT_FIELD} REAL NOT NULL,
                ${LNG_FIELD} REAL NOT NULL
                )`,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
	
	return promise;
}

const insertPlace = (place: Place) => {
	const promise = new Promise((resolve, reject) => {
		database.transaction((transaction) => {
			transaction.executeSql(
				`INSERT INTO ${PLACES_TABLE} (${TITLE_FIELD}, ${IMAGE_URI_FIELD}, ${ADDRESS_FIELD}, ${LAT_FIELD}, ${LNG_FIELD}) VALUES (?, ?, ?, ?, ?)
				`,
				[place.title, place.imageUrl, place.address, place.location.lat, place.location.lng],
				(_, resultSet) => {
					console.log(resultSet)
					resolve(resultSet)
				},
				(_, error) => reject(error),
			)
		})
	})
	return promise
}
