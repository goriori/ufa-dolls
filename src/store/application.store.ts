import {defineStore} from "pinia";
import {ref, ShallowRef, shallowRef} from "vue";
import SuccessVideo from '@/components/modals/success/video/SuccessVideo.vue'
import SuccessSend from '@/components/modals/success/send/SuccessSend.vue'
import DeleteVideo from '@/components/modals/delete/video/DeleteVideo.vue'
import ConfirmExit from "@/components/modals/confirm/exit/ConfirmExit.vue";
import TailQuiz from "@/components/manuals/tail/TailQuiz.vue";

type MItem = {
    name: string,
    component: ShallowRef
    settings: MSettings
}
type MSettings = {
    videoName?: string
    targetVideo?: string,
    show: boolean
}

export const useApplicationStore = defineStore('application', () => {
    const loading = ref<boolean>(false)
    const record = ref<boolean>(false)
    const modals = ref<MItem[]>([
        {
            name: 'success-video',
            component: shallowRef(SuccessVideo),
            settings: {
                videoName: '',
                targetVideo: '',
                show: false
            }
        },
        {
            name: 'delete-video',
            component: shallowRef(DeleteVideo),
            settings: {
                videoName: '',
                show: false
            }
        },
        {
            name: 'success-send',
            component: shallowRef(SuccessSend),
            settings: {
                show: false
            }
        },
        {
            name: 'confirm-exit',
            component: shallowRef(ConfirmExit),
            settings: {
                show: false
            }
        }

    ])
    const manuals = ref([
        {
            name: 'tail',
            component: shallowRef(TailQuiz),
            settings: {
                show: true
            }
        },
    ])
    const getModals = () => modals.value
    const getManuals = () => manuals.value
    const getSettings = (name: string) => {
        const modal = modals.value.find(modal => modal.name === name)
        if (modal) return modal.settings
    }
    const getStateLoading = () => loading.value
    const getStateRecord = () => record.value
    const toggleLoading = () => loading.value = !loading.value
    const toggleRecord = () => record.value = !record.value
    const toggleModal = (name: string) => {
        const modal = modals.value.find(modal => modal.name === name)
        if (!modal) return false
        modal.settings.show = !modal.settings.show
    }
    const toggleManual = (name: string) => {
        const manual = manuals.value.find(manual => manual.name === name)
        if (!manual) return false
        manual.settings.show = !manual.settings.show
    }
    const setSettings = (name: string, settings: Object) => {
        const modal = modals.value.find(modal => modal.name === name)
        if (modal) Object.assign(modal.settings, settings)
    }

    return {
        modals,
        getModals,
        getManuals,
        getSettings,
        getStateRecord,
        getStateLoading,
        toggleRecord,
        toggleModal,
        toggleManual,
        toggleLoading,
        setSettings,
    }
})


