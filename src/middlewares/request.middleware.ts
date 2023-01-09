import {NextFunction, Request, Response} from 'express'
import {config} from '@config'

export interface CustomRequest extends Request {
    body: any
    params: any
    query: any
}

const requestMiddleware = async (req: CustomRequest, _: Response, next: NextFunction) => {
    req.query.page_index = Number(req.query.page_index || 1)
    req.query.page_size = Number(req.query.page_size || config.system.defaultQueryPageSize)
    req.query.sort_by = String(req.query.sort_by || '_id')
    req.query.order_by = String(req.query.order_by || 'desc')
    const agent = req.headers['user-agent']
    const ip =
        String(req.headers['x-forwarded-for'] || '')
            .split(',')
            .pop()
            ?.trim() ||
        req.socket.remoteAddress ||
        req.ip
    next()
}

export default requestMiddleware
