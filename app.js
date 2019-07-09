import express from 'express'
import { router } from './services/router'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json({type: 'application/json', limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/', router)

export default app