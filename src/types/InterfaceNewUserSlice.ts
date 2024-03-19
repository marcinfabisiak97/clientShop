export interface InterNewUser {
    _id?: string;
}
export interface InterRegister {
    newUser: InterNewUser;
    isFetching: boolean;
    error: boolean;
}
