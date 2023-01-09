import IBaseModel from '@interfaces/base.model.interface'
import IFilterModel from '@interfaces/filter.model.interface'

export interface IFixture extends IBaseModel {

}

export interface IFixtureQueryFilter extends IFilterModel {
    searchKey: string
    type: string
    status: string
    dateFrom: string
    dateTo: string
}
