import {createConnection, getConnection} from "typeorm";
import {FixtureModel} from "@modules/fixture/fixture.model";

const initDbTest = () => {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [FixtureModel],
        synchronize: true,
        logging: false
    });
}
const closeDbTest = () => {
    let conn = getConnection();
    return conn.close();
}

export {initDbTest, closeDbTest}
