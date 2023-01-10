import dotenv from 'dotenv'
dotenv.config()
import App from './app'
import FixtureRouter from '@modules/fixture/fixture.router'

const app = new App([
    new FixtureRouter(),
])

app.listen()

export default app
