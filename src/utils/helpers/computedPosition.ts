import {DefaultPersonPosition} from "@/entities/fairy-tale";


const computedPositionYPerson = (personPosition: DefaultPersonPosition, personHeight: number, backgroundHeight: number) => {
    switch (personPosition) {
        case "leftDownAngle":
            return backgroundHeight - personHeight
        case "leftUpAngle":
            return 0
        case "rightDownAngle":
            return backgroundHeight - personHeight
        case "rightUpAngle":
            return 0
        case "centre":
            return (backgroundHeight - personHeight) / 2
        default:
            return 0
    }
}

const computedPositionXPerson = (personPosition: DefaultPersonPosition, personWidth: number, backgroundWidth: number) => {
    switch (personPosition) {
        case "leftDownAngle":
            return 0
        case "leftUpAngle":
            return 0
        case "rightDownAngle":
            return backgroundWidth - personWidth
        case "rightUpAngle":
            return backgroundWidth - personWidth
        case "centre":
            return (backgroundWidth - personWidth) / 2
        default:
            return 0
    }
}

export {computedPositionXPerson, computedPositionYPerson}