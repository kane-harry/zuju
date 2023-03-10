import {IFixtureCheckingDateFilter, IFixtureQueryFilter} from "@modules/fixture/fixture.interface";
import {FixtureModel} from "@modules/fixture/fixture.model";
import {Between, ILike} from "typeorm";
import {QueryRO} from "@interfaces/query.model";
import moment from 'moment'
import {AppDataSource} from "@config/data-source";

export default class FixtureService {
    static async createFixture(createFixtureDto: FixtureModel) {
        const time = new Date(createFixtureDto.time)
        createFixtureDto.time = time.toISOString ? time.toISOString() : createFixtureDto.time
        const repo = AppDataSource.getRepository(FixtureModel)
        return await repo.save(createFixtureDto)
    }

    static async getFixture(key:number) {
        const repo = AppDataSource.getRepository(FixtureModel)
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
        const repo = AppDataSource.getRepository(FixtureModel)
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
        existingFixture.time = updateFixtureDto.time ? (new Date(updateFixtureDto.time)).toISOString() : existingFixture.time

        return await repo.save(existingFixture)
    }

    static async deleteFixture(key:number) {
        const repo = AppDataSource.getRepository(FixtureModel)
        let existingFixture = await repo.findOne({
            where: {
                id: key
            }
        });

        if (!existingFixture) {
            throw new Error('Fixture not found');
        }
        const res:any = await repo.softDelete(existingFixture.id);
        return {success: res.affected > 0}
    }

    static async listingFixtures(filter: IFixtureQueryFilter) {
        let where:any = []
        let andWhere:any = {}
        if (filter.from_date && filter.to_date) {
            // Handle user timezone
            // If user choose 2021-07-15 on calendar an user in GMT+1
            // That mean user want to search from 2021-07-14T23:00:00.000Z to 2021-07-15T23:00:00.000Z
            // Remember we store time on database on ISOString format
            // let timezoneOffset = filter.timezone_offset || moment(filter.date).utcOffset()
            // let dateOnly = moment(filter.date).format(moment.HTML5_FMT.DATE)
            // let start = moment.utc(dateOnly).add(timezoneOffset * -1, 'minutes')
            // let end = moment.utc(dateOnly).add(timezoneOffset * -1, 'minutes').add(1, 'day')
            andWhere.time = Between(filter.from_date, filter.to_date)
        }
        if (filter.search_key) {
            //Handle case insensitive
            where.push({...andWhere, tournament : ILike(`%${filter.search_key}%`)})
            where.push({...andWhere, homeTeam : ILike(`%${filter.search_key}%`)})
            where.push({...andWhere, awayTeam : ILike(`%${filter.search_key}%`)})
        }
        const repo = AppDataSource.getRepository(FixtureModel)
        const sortBy = filter.sort_by || 'id'
        const [result, totalCount] = await repo.findAndCount({
            where: where.length ? where : andWhere,
            order: { [sortBy]: filter.order_by },
            take: filter.page_size,
            skip: (filter.page_index - 1) * filter.page_size || 0
        });
        return new QueryRO(totalCount, filter.page_index, filter.page_size, result)
    }

    static async checkingDateHasFixtures(filter: IFixtureCheckingDateFilter) {
        let andWhere:any = {}
        if (filter.from_date && filter.to_date) {
            andWhere.time = Between(filter.from_date, filter.to_date)
        }
        const repo = AppDataSource.getRepository(FixtureModel)
        const sortBy = filter.sort_by || 'id'
        const originalTimes = await repo.find({
            select: {
              time: true
            },
            where: andWhere,
            order: { [sortBy]: filter.order_by },
            take: filter.page_size,
            skip: (filter.page_index - 1) * filter.page_size || 0
        });
        const convertDates = originalTimes.map(item => moment(item.time).add(filter.timezone_offset * -1, 'minutes').toDate().toISOString().substring(0, 10))
        return [...new Set(convertDates)]
    }
}
