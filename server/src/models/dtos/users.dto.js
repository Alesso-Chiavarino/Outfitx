export class createUserDTO {
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