export interface User {
    _id: number;
    name: string;
    login: string;
    photoURl: string;
    Phone: string;
    isActive: boolean;
    CreatedAt: string;
    UpdateAt: string;
    CreatedBy: User["_id"];
    UpdateBy: User["_id"];
    Role: string;
    Token: string;
}
