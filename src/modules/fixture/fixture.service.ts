import {CustomRequest} from "@middlewares/request.middleware";
import {Response} from "express";
import {CreateFixtureDto, UpdateFixtureDto} from "@modules/fixture/fixture.dto";
import {IFixtureQueryFilter} from "@modules/fixture/fixture.interface";

export default class FixtureService {
    static async createFixture(createFixtureDto: CreateFixtureDto) {

    }

    static async getFixture(key:string) {

    }

    static async updateFixture(key:string, updateFixtureDto: UpdateFixtureDto) {

    }

    static async deleteFixture(key:string) {

    }

    static async listingFixtures(filter: IFixtureQueryFilter) {

    }
}
