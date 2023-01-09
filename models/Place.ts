import uuid from 'react-uuid'

export class Place {
    title: string
    imageUrl: string
    address: string
    location: string
    id: string
    constructor(title: string, imageUrl: string, address: string, location: string) {
        this.title = title
        this.imageUrl = imageUrl
        this.address = address
        this.location = location
        this.id = uuid()
    }
}
