import {Router} from 'express'
import ICustomRouter from '@interfaces/custom.router.interface'
import FixtureController from './fixture.controller'
import asyncHandler from "@utils/asyncHandler";

class FixtureRouter implements ICustomRouter {
    public path = '/fixtures'
    public router = Router()

    constructor() {
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(`${this.path}`, asyncHandler(FixtureController.listingFixtures))
        this.router.post(`${this.path}`, asyncHandler(FixtureController.createFixture))
        this.router.get(`${this.path}/:key`, asyncHandler(FixtureController.getFixture))
        this.router.put(`${this.path}/:key`, asyncHandler(FixtureController.updateFixture))
        this.router.delete(`${this.path}/:key`, asyncHandler(FixtureController.deleteFixture))
    }
}

export default FixtureRouter
