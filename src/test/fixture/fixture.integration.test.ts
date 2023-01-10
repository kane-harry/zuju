import request from 'supertest'
import server from "@app/server"
import {closeDbTest, initDbTest} from "@app/test/config.test.db";

let shareData:any = {}
const createFixtureData = {
    tournament: 'aaa',
}
const updateFixtureData = {
    tournament: 'aaab',
}
jest.setTimeout(30000)
describe('Fixture', () => {
    beforeAll(() => {
        return initDbTest()
    });

    afterAll(() => {
        return closeDbTest()
    });
    it('Create Fixture', async () => {
        const res = await request(server.app)
            .post(`/api/v1/fixtures`)
            .send(createFixtureData)
        expect(res.status).toEqual(200)
        expect(res.body.tournament).toEqual(createFixtureData.tournament)
    })

    it('Query Fixtures', async () => {
        const page_index = 1
        const page_size = 25
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}`)
            .send()
        expect(res.status).toEqual(200)
        shareData.fixtures = res.body.items
        expect(res.body.items.length).toBeGreaterThan(0)
    })

    it('Query Fixtures With Search', async () => {
        const page_index = 1
        const page_size = 25
        const search_key = 'c'
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&search_key=${search_key}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toEqual(0)
    })

    it('Get Fixture Detail', async () => {
        const fixture:any = shareData.fixtures[0]
        const res = await request(server.app)
            .get(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.id).toEqual(fixture.id)
    })

    it('Update Fixture', async () => {
        const fixture:any = shareData.fixtures[0]
        const res = await request(server.app)
            .put(`/api/v1/fixtures/${fixture.id}`)
            .send(updateFixtureData)
        expect(res.status).toEqual(200)
        expect(res.body.tournament).toEqual(updateFixtureData.tournament)
    })

    it('Delete Fixture', async () => {
        const fixture:any = shareData.fixtures[0]
        const res = await request(server.app)
            .delete(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
    })
})
