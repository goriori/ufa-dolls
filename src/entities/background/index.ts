export class Background {
    id: number
    image: string
    focused: boolean

    constructor(id: number, image: string) {
        this.id = id
        this.image = image
        this.focused = false
    }

    switchFocus() {
        this.focused = !this.focused
    }
}
