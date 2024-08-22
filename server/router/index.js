const {Router} = require('express')
const {recorder} = require("../entity/recorder");
const nodemon = require('nodemon')
const {server} = require("../entity/server");
const {deleteFile} = require("../utils/delteFile");

const router = new Router()

router.get('/recorder/test', (req, res) => {
    recorder.startRecording()
    setTimeout(async () => {
        const fileName = await recorder.stopRecording()
        res.redirect(`/api/video/${fileName}`)
    }, 5000)
})

router.get('/video/:name', async (req, res) => {
    const {name} = await req.params
    res.set('Content-Type', ' video/mp4')
    res.sendFile(recorder.getRecordVideoPath(`${name}.mp4`), {extensions: '.mp4'})
})

router.delete('/video/delete/:name', async (req, res) => {
    const {name} = await req.params
    const videoPath = recorder.getRecordVideoPath(`${name}.mp4`)
    const result = await deleteFile(videoPath)
    res.json({delete: result})
})

router.post('/recorder/start', (req, res) => {
    const settingRecord = req.query
    recorder.startRecording(settingRecord)
    res.json(true)
})

router.post('/recorder/finish', async (req, res) => {
    const fileName = await recorder.stopRecording()
    res.json({name: fileName})
})


module.exports = {router}
