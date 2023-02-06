export type CreateUserParams = {
    username : string;
    password : string;
}
export type UpdateUserParams = {
    username : string;
    password : string;
}

export type CreateUserProfileParams ={
    firstName : string;
    lastName : string;
    age : string;
    dob : string;
}

export type CreateUserPostParams = {
    title : string;
    description : string;
}