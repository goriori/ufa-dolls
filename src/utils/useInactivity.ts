import {useRoute, useRouter} from 'vue-router'

export const useInactivity = () => {
    let timerId: number | undefined
    const route = useRoute()
    const router = useRouter()
    const inactivityTime = () => {
        const resetTimer = () => {
            time = 0
        }
        let time = 0

        timerId = setInterval(() => {
            const timeout = window.TIMEOUT
            time++
            if (time >= timeout) {
                resetTimer()
                if (route.name !== 'home') {
                    router.push({name: 'home'})
                    clearInterval(timerId)
                }
            }
            console.log(timeout, time)
        }, 1000)
        // сюда можно добавить любой ивент.
        document.addEventListener('mousemove', resetTimer)
        document.addEventListener('keypress', resetTimer)
        document.addEventListener('touch', resetTimer)
    }

    return {inactivityTime, timerId}
}
