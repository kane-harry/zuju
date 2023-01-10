import {config} from '@config'
import createFixture from '@docs/fixtures/createFixture.json'
import queryFixture from '@docs/fixtures/queryFixture.json'
import updateFixture from '@docs/fixtures/updateFixture.json'
import getFixtureDetail from '@docs/fixtures/getFixtureDetail.json'
import deleteFixture from '@docs/fixtures/deleteFixture.json'
export const openApiV1Documents = {
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
    ],
    tags: [
        {
            "name": "Fixtures"
        }
    ],
    paths: {
        "/fixtures/": {
            "post": createFixture,
            "get": queryFixture
        },
        "/fixtures/{key}": {
            "put": updateFixture,
            "get": getFixtureDetail,
            "delete": deleteFixture
        }
    }
}
