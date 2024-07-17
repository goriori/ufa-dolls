import axios from "axios";

type RecordData = {
    x: number,
    y: number,
    width: number,
    height: number
}
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

export class RecorderService {
    static async playRecordScreen(recordData: RecordData) {
        const res = await axiosInstance({method: 'post', url: '/api/recorder/start', params: {...recordData}})
        return res.data
    }

    static async stopRecordScreen() {
        const res = await axiosInstance({method: 'post', url: '/api/recorder/finish'})
        return res.data
    }

    static async getRecord(videoName: string) {
        const res = await axiosInstance({method: 'get', url: `/api/video/${videoName}`})
        return res.data
    }
}