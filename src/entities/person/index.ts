export class Person {
    id: number
    person_name: string
    person_image: string

    constructor(id: number, name: string, image: string) {
        this.id = id
        this.person_name = name
        this.person_image = image
    }
}