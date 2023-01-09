/** Fixture model like a game, so it need some fields:
 * - Tournament: FA Cup - might refer to a row in tournaments table
 * - Round: 3rd Round
 * - Season: 2020-2021
 * - HomeTeam: Man United - might refer to a row in teams table
 * - AwayTeam: Leicester - might refer to a row in team table
 * - Starting Time in GMT: 2022-09-02T15:00:00.000Z
 * - Status: [NotStart, FirstHalf, RestBetweenHalves, SecondHalf, Finish...]
 * - Score: 1-0
 *
 * And other info can be add later:
 * - Referee: A Marriner
 * - Corner kick
 * - Yellow card
 * - Red card
 * - Total number of shots
 * - Shot on goal
 * - Shot out
 * - Ball control rate
 * - Pass the ball
 * - Foul
 * - Offside
 * - Save
 * - Attack Phases
 * - Dangerous attack
 * - Substitution
 * */

import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FixtureModel {
    @PrimaryGeneratedColumn()
    public id: number;
    public tournament: string;
    public round: string;
    public season: string;
    public homeTeam: string;
    public awayTeam: string;
    public time: Date;
    public status: string;
    public score: string;
}
