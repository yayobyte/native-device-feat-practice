export type Location = { lat: string, lng: string }

export class Place {
    title: string
    imageUrl: string
    address: string
    location: { lat: string, lng: string }
    id: string
    constructor(title: string, imageUrl: string, address: string, location: Location, id: string) {
        this.title = title
        this.imageUrl = imageUrl
        this.address = address
        this.location = location
        this.id = id
    }
}
