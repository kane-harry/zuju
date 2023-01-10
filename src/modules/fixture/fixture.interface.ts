import IFilterModel from '@interfaces/filter.model.interface'

export interface IFixtureQueryFilter extends IFilterModel {
    search_key: string
    day: string
}
