export interface IUser {
    id: string,
    email: string,
    isActive?: boolean,
    userType?: string,
    verifiedOn?: string,
    fullName?: string,
    profile: {
        firstName: string,
        lastName: string,
        phoneNumber?: string,
        city?: string,
        country?: string,
    }
}