import axios from "axios";

type RecordData = {
    x: number,
    y: number,
    width: number,
    height: number
}

const axiosInstance = axios.create({
    baseURL: window.LOCAL_API,
})

export class RecorderService {
    static async playRecordScreen(recordData: RecordData) {
        try {
            const res = await axiosInstance({method: 'post', url: '/api/recorder/start', params: {...recordData}})
            return res.data
        } catch (e) {
            return false
        }

    }

    static async stopRecordScreen() {
        try {
            const res = await axiosInstance({method: 'post', url: '/api/recorder/finish'})
            return res.data
        } catch (e) {
            return false
        }

    }

    static async getRecord(videoName: string) {
        try {
            const res = await axiosInstance({method: 'get', url: `/api/video/${videoName}`, responseType: 'blob'})
            return new File([res.data], videoName + '.mp4', {type: res.data.type});
        } catch (e) {
            return false
        }
    }

    static async deleteRecord(videoName: string) {
        try {
            const res = await axiosInstance({method: 'delete', url: `/api/video/delete/${videoName}`})
            return res.data.delete as boolean
        } catch (e) {
            return false
        }

    }
}