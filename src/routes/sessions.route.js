const { Router } = require("express")

const SessionsController = require("../controllers/SessionsController")
const sessionsController = new SessionsController()

const sessionsRoute = Router()

sessionsRoute.post("/", sessionsController.create)

module.exports = sessionsRoute;