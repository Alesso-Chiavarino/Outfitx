import { userModel } from "../../schemas/user.model.js";

export class UsersMongoDAO {

    getUsers = async () => {
        const users = await userModel.find().lean()
        return users
    }

    getUserById = async (id) => {
        const user = await userModel.findById(id).lean()
        return user
    }

    getUserByEmail = async (email) => {
        const user = await userModel.findOne({ email }).lean()
        return user
    }

    createUser = async (payload) => {
        const newUser = await userModel.create(payload)
        return newUser
    }

    updateUserById = async (id, payload) => {
        const updatedUser = await userModel.findByIdAndUpdate(id, { $set: payload }, { new: true })
        return updatedUser
    }

    deleteUser = async (id) => {
        const deletedUser = await userModel.findByIdAndDelete(id)
        return deletedUser
    }

}