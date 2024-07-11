import {Person} from "@/entities/person";
import {Background} from "@/entities/background";

type DefaultBackground = {
    id: number
    image: string
}

type TBackground = DefaultBackground & {
    focused: boolean
    switchFocus(): void
}

type DefaultPerson = {
    id: number
    image: string
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

    setTargetBackground(background: TBackground) {
        this.target_background = background
    }

    setTargetPerson(person: Person) {
        this.target_person = person
    }

    private initBackgrounds(backgrounds: DefaultBackground[]) {
        return backgrounds.map(background => new Background(background.id, background.image))
    }

    private initPersons(persons: DefaultPerson[]) {
        return persons.map((person => new Person(person.id, 'person_name', person.image)))
    }
}