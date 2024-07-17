const http = require('http')


class Server {
    constructor(port) {
        this.port = port
        this.server = null
    }


    createServer(app) {
        this.server = http.createServer(app)
        this.server.listen(this.port, () => {
            console.log(`Server restarted at http://localhost:${this.port}`);
        });

    }

    restartServer() {
        this.server.close(() => {
            console.log('Server closed. Restarting...');
            setTimeout(() => {
                this.server.listen(this.port, () => {
                    console.log(`Server restarted at http://localhost:${this.port}`);
                });
            }, 5000)
        });
    }
}


const server = new Server(3000)
module.exports = {server}