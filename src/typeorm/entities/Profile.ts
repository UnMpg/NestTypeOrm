import { first } from "rxjs";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('User_profile')
export class Profile{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    age :string;

    @Column()
    dob : string;

}