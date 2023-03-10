import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import {openApiV1Documents} from '@docs/openApiGenerator'
import errorMiddleware from '@middlewares/error.middleware'
import requestMiddleware from '@middlewares/request.middleware'
import {config} from '@config'
import ICustomRouter from '@interfaces/custom.router.interface'
import SportRadarScheduler from "@modules/jobs/sportradar.schedule";
import TheSportScheduler from "@modules/jobs/thesport.schedule";

class App {
    public app: express.Application
    constructor(routers: ICustomRouter[]) {
        this.app = express()

        this.initMiddlewares()
        this.initRouters(routers)
        this.initErrorHandling()
        this.initSwaggerDocs()
        this.initSchedulers()
    }

    public listen() {
        this.app.listen(config.port, () => {
            console.log(`Server is listening on the port ${config.port}`)
        })
    }

    private initMiddlewares(): void {
        this.app.use(bodyParser.json({ limit: '100mb' }))
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }))
        this.app.use(cors())
        this.app.use(requestMiddleware)
    }

    private initErrorHandling() {
        this.app.use(errorMiddleware)
    }

    private initRouters(customRouters: ICustomRouter[]) {
        customRouters.forEach(router => {
            this.app.use('/api/v1', router.router)
        })
    }

    private initSwaggerDocs() {
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openApiV1Documents))
    }

    private initSchedulers() {
        return [
            new SportRadarScheduler(),
            new TheSportScheduler(),
        ]
    }
}

export default App
