export interface User{
    id: string,
    name: string | null;
    password: string;
    email: string;
    created_at?: Date;
}
