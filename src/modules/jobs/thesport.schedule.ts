import cron from 'node-cron'
import IScheduler from "@interfaces/scheduler.interface";

export default class TheSportScheduler implements IScheduler {
    constructor() {
        this.fetchDataFromTheSport()
    }

    private fetchDataFromTheSport() {
        const task = cron.schedule('* * * * *', async () => {
            console.log(`${new Date()} execute task - fetch data from the sport`)
            //TODO: sync data {event.start_time, competitors.name, goals, players...)
        })
        task.start()
    }
}
