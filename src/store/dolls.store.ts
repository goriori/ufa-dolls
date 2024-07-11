import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {Tail} from "@/entities/fairy-tale";

const DollsStore = defineStore('dolls', () => {
    const tails: Ref<Tail[]> = ref([])
    const target_tail: Ref<Tail | null> = ref(null)
    const getTails = () => tails.value
    const getTargetTail = () => target_tail.value
    const getTargetTailBackground = () => target_tail.value?.target_background
    const setTargetTail = (tail: Tail) => target_tail.value = tail
    const addTail = (tail: Tail) => tails.value.push(tail)
    return {
        getTails,
        getTargetTail,
        getTargetTailBackground,
        addTail,
        setTargetTail
    }
})


export const useDollStore = () => {
    return DollsStore()
}