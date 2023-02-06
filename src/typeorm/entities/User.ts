import { Profile } from './Profile';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from './Post';

@Entity('user')
export class User{
    
    @PrimaryGeneratedColumn({
        type : 'bigint',
        comment : 'the quiz unique identifier'
    })
    id :number;
    

    @Column({
        type : "varchar",
        // unique : true,
        length: 255,
        comment: 'Soal Of Role',
    })
    username : string;


    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Jawaban Of Role',
    })
    password : string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Status Of Role',
        default : 'active'
    })
    status : string;

    @Column()
    createAt : Date;

    @Column({nullable: true})
    authStrategy: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile : Profile;

    @OneToMany(()=> Post, (post)=> post.user)
    posts : [];
}