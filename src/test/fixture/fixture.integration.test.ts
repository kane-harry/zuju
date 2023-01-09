import request from 'supertest'
import server from "@app/server";
import {FixtureModel} from "@modules/fixture/fixture.model";
let shareData = { fixtures: [] }
const createFixtureData = {
    name: 'aaa',
}
const updateFixtureData = {
    name: 'aaab',
}
describe('Fixture', () => {
    it('Create Fixture', async () => {
        const res = await request(server.app)
            .post(`/api/v1/fixtures`)
            .send(createFixtureData)
        expect(res.status).toEqual(200)
        expect(res.body.name).toEqual(createFixtureData.name)
    })

    it('Query Fixtures', async () => {
        const page_index = 1
        const page_size = 25
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}`)
            .send()
        expect(res.status).toEqual(200)
        shareData.fixtures = res.body
    })

    it('Get Fixture Detail', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .get(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
    })

    it('Update Fixture', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .put(`/api/v1/fixtures/${fixture.id}`)
            .send(updateFixtureData)
        expect(res.status).toEqual(200)
        expect(res.body.name).toEqual(updateFixtureData.name)
    })

    it('Delete Fixture', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .delete(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
    })
})
