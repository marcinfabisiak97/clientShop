export interface InterOthers {
    _id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    email?: string;
    isAdmin?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface InterCurrentUser {
    others?: InterOthers;
    accessToken?: string;
}
export interface InterUser {
    currentUser: InterCurrentUser;
    isFetching: boolean;
    error: boolean;
    loggedIn: boolean;
}
