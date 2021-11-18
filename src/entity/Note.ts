

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;


}
