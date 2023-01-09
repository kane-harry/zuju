import cron from 'node-cron'
import IScheduler from "@interfaces/scheduler.interface";

export default class SportRadarScheduler implements IScheduler {
    constructor() {
        this.fetchDataFromSportRada()
    }

    private async fetchDataFromSportRada() {
        const task = cron.schedule('* * * * *', async () => {
            console.log(`${new Date()} execute task - fetch data from sport rada`)
            //TODO: sync data {event.start_time, competitors.name, goals, players...)
        })
        task.start()
    }
}
