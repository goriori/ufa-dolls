import {defineStore} from "pinia";
import {ref, ShallowRef, shallowRef} from "vue";
import SuccessVideo from '@/components/modals/success/video/SuccessVideo.vue'
import SuccessSend from '@/components/modals/success/send/SuccessSend.vue'
import DeleteVideo from '@/components/modals/delete/video/DeleteVideo.vue'

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
        }

    ])

    const getModals = () => modals.value
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
    const setSettings = (name: string, settings: Object) => {
        const modal = modals.value.find(modal => modal.name === name)
        if (modal) Object.assign(modal.settings, settings)
    }

    return {
        modals,
        getModals,
        getSettings,
        getStateRecord,
        getStateLoading,
        toggleRecord,
        toggleModal,
        toggleLoading,
        setSettings,
    }
})


