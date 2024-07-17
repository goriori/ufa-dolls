import {createRouter, createWebHistory} from 'vue-router'

const HomeView = () => import('@/pages/HomeView.vue')
const RecordTailView = () => import('@/pages/RecordTail.vue')
const PlayRecord = () => import('@/pages/PlayRecord.vue')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/record/tail',
            name: 'record_tail',
            component: RecordTailView,
        },
        {
            path: '/play/record/:videoName',
            name: 'play_record',
            component: PlayRecord,
        },
    ],
})
router.beforeEach((_to, _from, next) => {
    next()
})
export default router
