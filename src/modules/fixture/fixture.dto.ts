import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateFixtureDto {
    @IsNotEmpty()
    public tournament: string

    @IsOptional()
    public round: string

    @IsOptional()
    public season: string

    @IsNotEmpty()
    public homeTeam: string

    @IsNotEmpty()
    public awayTeam: string

    @IsOptional()
    public time: string

    @IsOptional()
    public status: string

    @IsOptional()
    public score: string
}

export class UpdateFixtureDto {
    @IsNotEmpty()
    public tournament: string

    @IsOptional()
    public round: string

    @IsOptional()
    public season: string

    @IsOptional()
    public homeTeam: string

    @IsOptional()
    public awayTeam: string

    @IsOptional()
    public time: string

    @IsOptional()
    public status: string

    @IsOptional()
    public score: string
}
