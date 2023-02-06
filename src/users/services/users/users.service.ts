import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import {CreateUserParams, UpdateUserParams, CreateUserProfileParams, CreateUserPostParams} from '../../../utils/types'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Profile) private profileRepository : Repository<Profile>,
        @InjectRepository(Post) private postRepository : Repository<Post>
    ){}

    private readonly logger = new Logger(UsersService.name)

    findUsers(){
        return this.userRepository.find({relations:['profile','posts']});
    }

    createUser(UserDetail : CreateUserParams){
        const newUser = this.userRepository.create({
            ...UserDetail,
            createAt: new Date(),
        })

        return this.userRepository.save(newUser);
    }

    updateUser(id : number,updateUserDetail: UpdateUserParams){
        return this.userRepository.update({id},{...updateUserDetail});
    }

    deleteUser(id){
        return this.userRepository.delete({id});
    }

    async createUserProfile(id:number,createUserProfileDetails : CreateUserProfileParams){
        const user = await this.userRepository.findOneBy({id})
        // this.logger.debug('coba'+ user);
        // console.log("coba"+ user);
        
        if (!user) throw new HttpException('User Not Found. cant create profile', HttpStatus.BAD_REQUEST)

        const newProfile = this.profileRepository.create(createUserProfileDetails);
        this.logger.debug('newProfile');
        // console.log("Hasil Profile"+newProfile);
        
        const savedProfile = await this.profileRepository.save(newProfile);

        user.profile =savedProfile;
        // this.logger.debug("Hasil Save"+savedProfile);
        // console.log("Hasil Save"+savedProfile);
        
        
        return this.userRepository.save(user);
    }

    async createUserPost(id : number, createUserPostDetails : CreateUserPostParams){
        const user = await this.userRepository.findOneBy({id})
        this.logger.debug(JSON.stringify(user) );
        // console.log("coba"+ user);
        
        if (!user) throw new HttpException('User Not Found. cant create profile', HttpStatus.BAD_REQUEST)

        const newPost = this.postRepository.create({...createUserPostDetails,user,});
        this.logger.debug("Hasil NewPost"+ JSON.stringify(newPost) );
        return this.postRepository.save(newPost);

    }
}
