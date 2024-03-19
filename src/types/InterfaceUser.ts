export interface InterUser {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    img: string;
}
export interface InterInitialState {
    users: InterUser[];
    isFetching: boolean;
    error: boolean;
}
