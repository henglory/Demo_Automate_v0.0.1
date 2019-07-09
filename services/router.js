import express from 'express'
import { healthcheckTestsuiteRegister, healthcheckTestsuitHtmlRegister } from './healthcheck_testsuit'
var router = express.Router()

healthcheckTestsuiteRegister(router)
healthcheckTestsuitHtmlRegister(router)

export { router }