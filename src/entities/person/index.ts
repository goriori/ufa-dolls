export class Person {
    id: number
    person_name: string
    person_image: string
    target: boolean
    width: number
    height: number

    constructor(id: number, name: string, image: string, width: number, height: number) {
        this.id = id
        this.person_name = name
        this.person_image = image
        this.target = false
        this.width = width
        this.height = height
    }

    switchTarget() {
        this.target = !this.target
    }
}