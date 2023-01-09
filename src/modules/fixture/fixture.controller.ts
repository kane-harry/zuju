import {Response} from 'express'
import {CustomRequest} from "@middlewares/request.middleware";
import FixtureService from "@modules/fixture/fixture.service";
import {IFixtureQueryFilter} from "@modules/fixture/fixture.interface";
import {FixtureModel} from "@modules/fixture/fixture.model";

export default class FixtureController {
    static async createFixture(req: CustomRequest, res: Response) {
        const params: FixtureModel = req.body
        const data = await FixtureService.createFixture(params)
        return res.json(data)
    }

    static async getFixture(req: CustomRequest, res: Response) {
        const key: number = req.params.key
        const data = await FixtureService.getFixture(key)
        return res.json(data)
    }

    static async updateFixture(req: CustomRequest, res: Response) {
        const key: number = req.params.key
        const params: FixtureModel = req.body
        const data = await FixtureService.updateFixture(key, params)
        return res.json(data)
    }

    static async deleteFixture(req: CustomRequest, res: Response) {
        const key: number = req.params.key
        const data = await FixtureService.deleteFixture(key)
        return res.json(data)
    }

    static async listingFixtures(req: CustomRequest, res: Response) {
        const filter = req.query as IFixtureQueryFilter
        const data = await FixtureService.listingFixtures(filter)
        return res.json(data)
    }
}
