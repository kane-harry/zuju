import { NextFunction, Response } from 'express'
import { CustomRequest } from './request.middleware'

function errorMiddleware(error: any, req: CustomRequest, res: Response, next: NextFunction) {
    const status = error.status || 500

    const inDevMode = req.app.get('env') === 'local' || req.app.get('env') === 'development'
    if (!inDevMode && status === 500) {
        //TODO: Save db, or send to slack webhook, or send to google chat webhook
    }

    return res.status(status).json({
        error: error
    })
}

export default errorMiddleware
