import request from 'supertest'
import server from "@app/server"
import {FixtureModel} from "@modules/fixture/fixture.model"
import {createConnection, getConnection} from "typeorm";

let shareData = { fixtures: [] }
const createFixtureData = {
    tournament: 'aaa',
}
const updateFixtureData = {
    tournament: 'aaab',
}
jest.setTimeout(30000)
describe('Fixture', () => {
    beforeAll(() => {
        // initDb()
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [FixtureModel],
            synchronize: true,
            logging: false
        });
    });

    afterAll(() => {
        let conn = getConnection();
        return conn.close();
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
    })

    it('Get Fixture Detail', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .get(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.id).toEqual(fixture.id)
    })

    it('Update Fixture', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .put(`/api/v1/fixtures/${fixture.id}`)
            .send(updateFixtureData)
        expect(res.status).toEqual(200)
        expect(res.body.tournament).toEqual(updateFixtureData.tournament)
    })

    it('Delete Fixture', async () => {
        const fixture:FixtureModel = shareData.fixtures[0]
        const res = await request(server.app)
            .delete(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
    })
})
