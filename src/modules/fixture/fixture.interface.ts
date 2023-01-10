import IFilterModel from '@interfaces/filter.model.interface'

export interface IFixtureQueryFilter extends IFilterModel {
    search_key: string
    from_date: string   //ISOString
    to_date: string     //ISOString
}
