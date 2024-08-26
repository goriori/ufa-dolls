const {spawn, exec} = require('child_process');
const fs = require('fs');
const path = require('path');
const kill = require('tree-kill');
const dotenv = require('dotenv')
dotenv.config()
const {logger} = require('../logger/index')

class Recorder {
    constructor(outputDirName) {
        this.recordingProcess = null
        this.lastVideoRecord = null
        this.outputDir = path.join(__dirname, outputDirName);
        this.checkFolderExist()
        this.initEnvFfmpeg()
        this.getDevices()
    }

    checkFolderExist() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir);
        }
    }

    startRecording(settingRecord) {
        console.log(settingRecord)
        console.log('environment application:', {
            AUDIO_CAPTURE_NAME: process.env.AUDIO_CAPTURE_NAME,
            VIDEO_CAPTURE_NAME: process.env.VIDEO_CAPTURE_NAME
        })
        logger.log(`Start Record event with settings: ${JSON.stringify(settingRecord)}`)
        logger.log(`environment application: ${JSON.stringify({
            AUDIO_CAPTURE_NAME: process.env.AUDIO_CAPTURE_NAME,
            VIDEO_CAPTURE_NAME: process.env.VIDEO_CAPTURE_NAME
        })}`)
        const {x, y, width, height} = settingRecord
        const videoName = `output_${Math.floor(Math.random() * 100000)}.mp4`
        const outputPath = path.join(this.outputDir, videoName);
        this.lastVideoRecord = videoName.split('.')[0];

        // Используем spawn вместо exec для более гибкого управления процессом
        this.recordingProcess = spawn('ffmpeg', [
            '-f', 'gdigrab',
            // '-framerate', '30',
            '-offset_x', x.toString() || '0',
            '-offset_y', y.toString() || '0',
            '-video_size', `${width || 3810}x${height || 2160}`,
            '-i', 'desktop',
            '-f', `${process.env.VIDEO_CAPTURE_NAME}`,
            '-i', `audio=${process.env.AUDIO_CAPTURE_NAME}`,
            '-vcodec', 'libx264',
            '-rtbufsize', '2000M',
            '-acodec', 'aac',
            '-pix_fmt', 'yuv420p',
            '-crf', '23',
            outputPath
        ]);

        this.recordingProcess.stderr.on('data', (data) => {
            console.error(`FFmpeg stderr: ${data}`);
            if (data.includes('Error opening input file')) {
                console.log('Listing available devices...');
            }
        });

        this.recordingProcess.stdout.on('data', (data) => {
            console.log(`FFmpeg stdout: ${data}`);
        });

        console.log('Recording started');
    }

    getDevices() {
        exec('ffmpeg -list_devices true -f dshow -i dummy', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error listing devices: ${err.message}`);
                return;
            }
            console.log(`Available devices:\n${stderr}`);
        });
    }

    stopRecording() {
        return new Promise((resolve, reject) => {
            if (this.recordingProcess) {
                this.recordingProcess.stdin.write('q');
                this.recordingProcess.stdin.end();
                this.recordingProcess.on('close', (code) => {
                    console.log(`Recording process closed with code ${code}`);
                    setTimeout(() => resolve(this.lastVideoRecord), 2000)
                    logger.log('Stop Record event')
                });

                this.recordingProcess.on('error', (err) => {
                    console.error(`Recording process error: ${err.message}`);
                    logger.log(`Error Stop Record event with error message: ${JSON.stringify(err.message)}`)
                    reject(err);
                });

            } else {
                console.log('No recording process to stop');
                resolve(this.lastVideoRecord);
            }
        });
    }

    getRecordVideoPath(fileName) {
        logger.log(`Get Path to Video event: ${path.join(this.outputDir, fileName)}`)
        return path.join(this.outputDir, fileName);
    }

    initEnvFfmpeg() {
        const ffmpegPath = path.join(__dirname, 'ffmpeg', 'bin');
        process.env.PATH += path.delimiter + ffmpegPath;
    }
}

const recorder = new Recorder('output')
module.exports = {recorder}



