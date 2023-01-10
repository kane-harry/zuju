import {config} from '@config'
import data from './apiV1.json'

export const openApiV1Documents = {
    ...data,
    openapi: '3.0.3',
    info: {
        title: `Zuju`,
        version: `${process.env.npm_package_version || '1.0'}`,
        description: `API documentation for Zuju`,
        contact: {
            email: 'vuvannhan.hut@gmail.com'
        }
    },
    servers: [
        {
            url: `${config.system.applicationApiRootURL}/api/v1`,
            description: ''
        }
    ]
}
