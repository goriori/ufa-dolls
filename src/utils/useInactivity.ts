import {useRouter} from 'vue-router'

export const useInactivity = () => {
    const router = useRouter()
    const inactivityTime = () => {
        const resetTimer = () => {
            time = 0
        }
        let time = 0

        const timerId = setInterval(() => {
            const timeout = window.TIMEOUT
            time++
            if (time >= timeout) {
                resetTimer()
                router.push({name: 'home'})
                clearInterval(timerId)
            }
            console.log(timeout, time)
        }, 1000)
        // сюда можно добавить любой ивент.
        document.addEventListener('mousemove', resetTimer)
        document.addEventListener('keypress', resetTimer)
        document.addEventListener('touch', resetTimer)
        return timerId
    }

    return {inactivityTime}
}
