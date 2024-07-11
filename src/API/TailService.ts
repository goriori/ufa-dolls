import {axiosInstance} from "@/utils/axios/axios.ts";

type TailBackground = {
    id: number
    image: string
}

type TailPlayer = {
    id: number,
    image: string
}

interface TailItem {
    id: number
    image:string
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
}