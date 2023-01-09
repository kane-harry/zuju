import IFilterModel from '@interfaces/filter.model.interface'

export interface IFixtureQueryFilter extends IFilterModel {
    searchKey: string
    day: string
}
