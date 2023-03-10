import {closeDbTest, initDbTest} from "@app/test/config.test.db";
import FixtureService from "@modules/fixture/fixture.service";
import {AppDataSource} from "@config/data-source";
import {FixtureModel} from "@modules/fixture/fixture.model";

let shareData:any = {}
const createFixtureData: any = {
    tournament: 'Premier League',
    homeTeam: "Manchester United",
    awayTeam: "Lester City",
    score: "3/1",
    time: '2020-11-20T19:30:00.000Z'
}
const updateFixtureData: any = {
    tournament: 'La Liga',
    homeTeam: "Manchester City",
    awayTeam: "Chelsea",
    score: "4/1",
    time: '2020-11-20T19:30:00.000Z'
}
jest.setTimeout(30000)
describe('Fixture Unit', () => {
    beforeAll(() => {
        return initDbTest()
    });

    afterAll(done => {
        closeDbTest()
        done()
    });

    it('Create Fixture', async () => {
        const repo = AppDataSource.getRepository(FixtureModel)
        const res:any = await FixtureService.createFixture(createFixtureData)
        shareData.id = res.id
        const row:any = await repo.findOneBy({id: res.id})
        expect(row.tournament).toEqual(createFixtureData.tournament)
        expect(row.homeTeam).toEqual(createFixtureData.homeTeam)
        expect(row.awayTeam).toEqual(createFixtureData.awayTeam)
        expect(row.score).toEqual(createFixtureData.score)
        expect(row.time).toEqual(createFixtureData.time)
    })

    it('Update Fixture', async () => {
        const repo = AppDataSource.getRepository(FixtureModel)
        const res:any = await FixtureService.updateFixture(shareData.id, updateFixtureData)
        const row:any = await repo.findOneBy({id: res.id})
        expect(row.tournament).toEqual(updateFixtureData.tournament)
        expect(row.homeTeam).toEqual(updateFixtureData.homeTeam)
        expect(row.awayTeam).toEqual(updateFixtureData.awayTeam)
        expect(row.score).toEqual(updateFixtureData.score)
        expect(row.time).toEqual(updateFixtureData.time)
    })

    it('Delete Fixture', async () => {
        const repo = AppDataSource.getRepository(FixtureModel)
        const res:any = await FixtureService.deleteFixture(shareData.id)
        expect(res.success).toEqual(true)
        const row:any = await repo.findOneBy({id: res.id})
        expect(row).toBeNull()
    })
})
