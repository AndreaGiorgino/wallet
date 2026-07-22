export default interface SessionUser {
    readonly id: string,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly accessToken: string,
}