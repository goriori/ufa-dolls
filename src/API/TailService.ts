import {axiosInstance} from "@/utils/axios/axios.ts";
import {AxiosResponse} from "axios";

type TailBackground = {
    id: number
    image: string
}
type PlayerLocation = 'leftUpAngle' | 'leftDownAngle' | 'rightUpAngle' | 'rightDownAngle' | 'centre'

type TailPlayer = {
    id: number,
    title: string
    image: string
    width: number,
    height: number
    location: PlayerLocation
}

type SendData = {
    videoFile: string | Blob,
    email: string,
    puppet_id: number
}

type SuccessSendEmail = 'success'
type ErrorSendEmail = 'error'

type ResponseSendEmail = AxiosResponse<{ message: SuccessSendEmail | ErrorSendEmail }>

interface TailItem {
    id: number
    image: string
    background: TailBackground[]
    players: TailPlayer[]
    title: string

}

export class TailService {
    static async getTails(): Promise<TailItem[]> {
        const res = await axiosInstance({
            method: 'get',
            url: '/api/puppet_creates'
        })
        return res.data
    }

    static async getTail(id: number) {
        const res = await axiosInstance({
            method: 'get',
            url: `/api/puppet_creates/${id}`
        })
        return res.data
    }

    static async getPersonsTail(tail_id: number) {
        const res = await axiosInstance({
            method: 'get',
            url: `/api/people/${tail_id}`
        })
        return res.data
    }

    static async sendEmailTail(sendData: SendData) {
        try {
            const res: ResponseSendEmail = await axiosInstance({
                method: 'post',
                url: '/api/puppet/email',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                data: sendData
            })
            return res.data
        } catch (e) {
            console.log(e)
            return false
        }

    }
}