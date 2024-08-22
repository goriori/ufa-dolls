const express = require('express');
const cors = require('cors')
const {router} = require("./router");
const {server} = require("./entity/server");

const app = express();
app.use(cors())
app.use('/api', router)
server.createServer(app)


