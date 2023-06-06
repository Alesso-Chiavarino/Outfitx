export class GetUserDTO{
    constructor(payload){
        this.id = payload._id
        this.firstName = payload.first_name;
        this.lastName = payload.last_name;
        this.email = payload.email;
        this.age = payload.age
        this.githubLogin = payload.github_login
        this.role = payload.role
        this.cart = payload.cart
        this.profilePic = payload.profile_pic
    }
}

export class CreateUserDTO {
    constructor(payload, files) {
        this.user_name = payload.user_name
        this.last_name = payload.last_name
        this.email = payload.email
        this.password = payload.password
        this.age = payload.age
        this.github_login = payload.github_login
        this.role = payload.role
        this.cart = payload.cart
        if (files) {
            const paths = files.map(file => {
                return {
                    path: file.path,
                    originalName: file.originalname
                }
            })
            this.profile_pic = paths
        } else {
            this.profile_pic = []
        }
    }

}
