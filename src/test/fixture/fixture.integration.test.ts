import request from 'supertest'
import server from "@app/server"
import {closeDbTest, initDbTest} from "@app/test/config.test.db";

let shareData:any = {}
const createFixtureData = {
    tournament: 'Premier League',
    homeTeam: "Manchester United",
    awayTeam: "Lester City",
    score: "3/1",
    time: new Date("Sun Nov 22 2020 08:00:00 GMT+0700 (Indochina Time)")
}
const updateFixtureData = {
    tournament: 'La Liga',
    homeTeam: "Manchester City",
    awayTeam: "Chelsea",
    score: "4/1",
    time: new Date("Sun Nov 22 2020 08:00:00 GMT+0700 (Indochina Time)")
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
        expect(res.body.homeTeam).toEqual(createFixtureData.homeTeam)
        expect(res.body.awayTeam).toEqual(createFixtureData.awayTeam)
        expect(res.body.score).toEqual(createFixtureData.score)
        expect(res.body.time).toEqual(createFixtureData.time.toISOString())
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
        const search_key = 'Man'
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&search_key=${search_key}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toBeGreaterThan(0)
    })

    it('Query Fixtures With Date', async () => {
        const page_index = 1
        const page_size = 25
        const date = (new Date('2021-11-22')).toString()
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&date=${date}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toBeGreaterThan(0)
    })

    it('Query Fixtures With Wrong Date', async () => {
        const page_index = 1
        const page_size = 25
        const date = (new Date('2021-11-21')).toString()
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&date=${date}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toEqual(0)
    })

    it('Query Fixtures With Wrong Date', async () => {
        const page_index = 1
        const page_size = 25
        const date = (new Date('2021-11-23')).toString()
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&date=${date}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toEqual(0)
    })

    it('Query Fixtures With Date and Search', async () => {
        const page_index = 1
        const page_size = 25
        const search_key = 'Man'
        const date = (new Date('Sun Nov 22 2020 06:00:00 GMT+0700 (Indochina Time)')).toString()
        const res = await request(server.app)
            .get(`/api/v1/fixtures?page_index=${page_index}&page_size=${page_size}&date=${date}&search_key=${search_key}`)
            .send()
        expect(res.status).toEqual(200)
        expect(res.body.items.length).toBeGreaterThan(0)
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
        expect(res.body.homeTeam).toEqual(updateFixtureData.homeTeam)
        expect(res.body.awayTeam).toEqual(updateFixtureData.awayTeam)
        expect(res.body.score).toEqual(updateFixtureData.score)
        expect(res.body.time.toString()).toEqual(updateFixtureData.time.toISOString())
    })

    it('Delete Fixture', async () => {
        const fixture:any = shareData.fixtures[0]
        const res = await request(server.app)
            .delete(`/api/v1/fixtures/${fixture.id}`)
            .send()
        expect(res.status).toEqual(200)
    })
})
