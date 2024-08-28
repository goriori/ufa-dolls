import {defineStore} from "pinia";
import {ref, ShallowRef, shallowRef} from "vue";
import SuccessVideo from '@/components/modals/success/video/SuccessVideo.vue'
import SuccessSend from '@/components/modals/success/send/SuccessSend.vue'
import DeleteVideo from '@/components/modals/delete/video/DeleteVideo.vue'
import ConfirmExit from "@/components/modals/confirm/exit/ConfirmExit.vue";
import TailQuiz from "@/components/manuals/tail/TailQuiz.vue";
import Alert from "@/components/ui/alert/Alert.vue";

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
    const alerts = ref([
        {
            name: 'message',
            component: shallowRef(Alert),
            settings: {
                message: 'information',
                type: 'info',
                show: false
            }
        }
    ])
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

    const getAlerts = () => alerts.value
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
    const toggleAlert = (name: string) => toggleEntity('alerts', name)
    const toggleModal = (name: string) => toggleEntity('modals', name)
    const toggleManual = (name: string) => toggleEntity('manuals', name)
    const setSettingsModal = (name: string, settings: Object) => setSettingEntity('modals', name, settings)
    const setSettingAlert = (name: string, settings: Object) => setSettingEntity('alerts', name, settings)

    const toggleEntity = (entity: 'alerts' | 'modals' | 'manuals', name: string) => {
        let element = null
        switch (entity) {
            case "alerts":
                element = alerts.value.find(alert => alert.name === name)
                break;
            case "manuals":
                element = manuals.value.find(manual => manual.name === name)
                break;
            case "modals":
                element = modals.value.find(modal => modal.name === name)
                break;
            default:
                break;
        }
        if (!element) return false
        element.settings.show = !element.settings.show
    }
    const setSettingEntity = (entity: 'alerts' | 'modals' | 'manuals', name: string, setting: Object) => {
        let element = null
        switch (entity) {
            case "alerts":
                element = alerts.value.find(alert => alert.name === name)
                break;
            case "manuals":
                element = manuals.value.find(manual => manual.name === name)
                break;
            case "modals":
                element = modals.value.find(modal => modal.name === name)
                break;
            default:
                break;
        }
        if (element) Object.assign(element.settings, setting)
    }

    return {
        modals,
        getAlerts,
        getModals,
        getManuals,
        getSettings,
        getStateRecord,
        getStateLoading,
        toggleRecord,
        toggleAlert,
        toggleModal,
        toggleManual,
        toggleLoading,
        setSettingsModal,
        setSettingAlert,
    }
})




