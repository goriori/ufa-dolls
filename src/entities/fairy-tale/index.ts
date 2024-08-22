import {computedPositionXPerson, computedPositionYPerson} from "@/utils/helpers/computedPosition.ts";

type DefaultBackground = {
    id: number
    image: string
}

export type TBackground = DefaultBackground & {
    focused: boolean
    switchFocus(): void
}

export type DefaultPersonPosition = 'leftUpAngle' | 'leftDownAngle' | 'rightUpAngle' | 'rightDownAngle' | 'centre'
type DefaultPerson = {
    id: number
    title: string
    image: string
    width: number,
    height: number
    location: DefaultPersonPosition
}

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


export class Person {
    id: number
    person_name: string
    person_image: string
    target: boolean
    width: number
    height: number
    location: DefaultPersonPosition
    position: {
        x: number,
        y: number,
        transform: string
    }

    constructor(id: number, name: string, image: string, width: number, height: number, location: DefaultPersonPosition) {
        this.id = id
        this.person_name = name
        this.person_image = image
        this.target = false
        this.width = width
        this.height = height
        this.location = location
        this.position = {
            x: 0,
            y: 0,
            transform: 'translate(0px,0px)'
        }
    }

    switchTarget() {
        this.target = !this.target
    }

    unsetTarget() {
        this.target = false
    }

    changePosition(position: { transform: string; x: number; y: number }) {
        Object.assign(this.position, position)
    }

    initPosition(backgroundWidth: number, backgroundHeight: number) {
        this.position = {
            x: computedPositionXPerson(this.location, this.width, backgroundWidth || 0),
            y: computedPositionYPerson(this.location, this.height, backgroundHeight || 0),
            transform: `translate(${computedPositionXPerson(this.location, this.width, backgroundWidth || 0)}px, ${computedPositionYPerson(this.location, this.height, backgroundHeight || 0)}px)`
        }
    }
}

export class Tail {
    id: number
    tail_name: string
    tail_preview: string
    tail_backgrounds: TBackground[]
    tail_persons: Person[]
    target_background: TBackground | null
    target_person: Person | null
    focused: boolean

    constructor(
        id: number,
        name: string,
        preview: string,
        backgrounds: DefaultBackground[],
        persons: DefaultPerson[]
    ) {
        this.id = id
        this.tail_name = name
        this.tail_preview = preview
        this.tail_backgrounds = this.initBackgrounds(backgrounds)
        this.tail_persons = this.initPersons(persons)

        this.target_background = null
        this.target_person = null
        this.focused = false
    }

    switchFocus() {
        this.focused = !this.focused
    }

    setTargetBackground(background: TBackground | null) {
        this.target_background = background
    }

    setTargetPerson(person: Person | null) {
        this.target_person = person
    }

    private initBackgrounds(backgrounds: DefaultBackground[]) {
        return backgrounds.map(background => new Background(background.id, background.image))
    }

    private initPersons(persons: DefaultPerson[]) {
        return persons.map((person => new Person(
                person.id,
                person.title,
                person.image,
                person.width,
                person.height,
                person.location
            )
        ))
    }
}