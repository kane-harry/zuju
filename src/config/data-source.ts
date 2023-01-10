import "reflect-metadata"
import { DataSource } from "typeorm"
import {FixtureModel} from "@modules/fixture/fixture.model";

let databaseConfig:any = {
    type: "mysql",
    host:  process.env.DB_HOST || "localhost",
    port:  3306,
    username:  process.env.DB_USERNAME || "test",
    password:  process.env.DB_PASSWORD || "test",
    database:  process.env.DB_NAME || "test",
    synchronize: true,
    logging: false,
    entities: [FixtureModel],
    migrations: [],
    subscribers: [],
}

if (process.env.NODE_ENV === 'test') {
    databaseConfig.type = 'sqlite'
    databaseConfig.database = ":memory:"
}
// @ts-ignore
export const AppDataSource = new DataSource(databaseConfig)
AppDataSource.initialize().then(async () => {}).catch((error: any) => console.log(error))
