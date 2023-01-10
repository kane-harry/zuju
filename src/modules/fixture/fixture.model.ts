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

import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class FixtureModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: true})
    public tournament: string;

    @Column({nullable: true})
    public round: string;

    @Column({nullable: true})
    public season: string;

    @Column({nullable: true})
    public homeTeam: string;

    @Column({nullable: true})
    public awayTeam: string;

    @Column({nullable: true})
    public time: string;

    @Column({nullable: true})
    public status: string;

    @Column({nullable: true})
    public score: string;

    @CreateDateColumn()
    public created!: Date;

    @UpdateDateColumn()
    public updated!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date;
}
