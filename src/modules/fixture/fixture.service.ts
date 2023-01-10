import {IFixtureQueryFilter} from "@modules/fixture/fixture.interface";
import {FixtureModel} from "@modules/fixture/fixture.model";
import {getRepository, Like} from "typeorm";
import {QueryRO} from "@interfaces/query.model";

export default class FixtureService {
    static async createFixture(createFixtureDto: FixtureModel) {
        const repo = getRepository(FixtureModel)
        const newFixture: FixtureModel = await repo.save(createFixtureDto);
        return newFixture
    }

    static async getFixture(key:number) {
        const repo = getRepository(FixtureModel)
        let existingFixture = await repo.findOne({
            where: {
                id: key
            }
        });

        if (!existingFixture) {
            throw new Error('Fixture not found');
        }

        return existingFixture
    }

    static async updateFixture(key:number, updateFixtureDto: FixtureModel) {
        const repo = getRepository(FixtureModel)
        let existingFixture = await repo.findOne({
            where: {
                id: key
            }
        });

        if (!existingFixture) {
            throw new Error('Fixture not found');
        }
        existingFixture.tournament = updateFixtureDto.tournament ?? existingFixture.tournament
        existingFixture.round = updateFixtureDto.round ?? existingFixture.round
        existingFixture.season = updateFixtureDto.season ?? existingFixture.season
        existingFixture.homeTeam = updateFixtureDto.homeTeam ?? existingFixture.homeTeam
        existingFixture.awayTeam = updateFixtureDto.awayTeam ?? existingFixture.awayTeam
        existingFixture.score = updateFixtureDto.score ?? existingFixture.score
        existingFixture.status = updateFixtureDto.status ?? existingFixture.status
        existingFixture.time = updateFixtureDto.time ?? existingFixture.time

        const updatedFixture: FixtureModel = await repo.save(existingFixture);
        return updatedFixture
    }

    static async deleteFixture(key:number) {
        const repo = getRepository(FixtureModel)
        let existingFixture = await repo.findOne({
            where: {
                id: key
            }
        });

        if (!existingFixture) {
            throw new Error('Fixture not found');
        }
        await repo.delete(existingFixture);
        return {success: true}
    }

    static async listingFixtures(filter: IFixtureQueryFilter) {
        const take = filter.page_size || 10
        const page = filter.page_index || 1
        const skip = (page - 1) * take || 0
        let where:any = {}
        if (filter.search_key) {
            where.name = Like(`%${filter.search_key}%`)
        }
        const repo = getRepository(FixtureModel)
        const [result, totalCount] = await repo.findAndCount({
            where: where,
            take: take,
            skip: skip
        });
        return new QueryRO(totalCount, filter.page_index, filter.page_size, result)
    }
}
