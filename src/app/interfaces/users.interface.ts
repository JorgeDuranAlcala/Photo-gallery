export interface Users {
    created_at: string;
    _id?: string;
    username: string;
    email: string;
    password: string;
    token: string;
}

export interface IProfile {
    created_at: string;
    _id?: string;
    username: string;
    email: string;
}
