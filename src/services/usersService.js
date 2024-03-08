import User  from "#src/models/Users";
import bcrypt from "bcryptjs"
import { isValidObjectId } from "mongoose";

const exposeServices = {
    findOneUser: (identifier)=>{
        if (isValidObjectId(identifier)) {
            return User.findOne({ _id:identifier })
        }
        return User.findOne({email:identifier})
    },
    findUserByRefreshToken:async ({refreshToken})=>{
       return User.findOne({refreshToken})
    },
    findAllUsers: async (query)=>{
        try {
            const   allUsers = await User.find()
            .sort({
                createdAt: query.order === "desc" ? "desc" : "asc",
            })
            .limit(query.limit || 0)
            .lean();
            return  allUsers
        } catch (error) {
            throw error
        }
    },
    createUser: async (rawData)=>{
        const {password} = rawData
        const salt = bcrypt.genSaltSync(4);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUserData = {
            ...rawData,
            password:hash
        }

        try {
            const   toSave  = new User(newUserData)
            const   newUser = toSave.save()   
            return  newUser
        } catch (error) {
            throw error
        }
    },
    updateUserToken: async ({userId,refreshToken})=>{
        try {
            const   toUpdate = await User.findOneAndUpdate({_id: userId},{refreshToken},{new:true})
            return  toUpdate
        } catch (error) {
            throw error
        }
    },
    updateUserById: ({ userId, body })=>{
        const {lastName, firstName, email, password, skills, roles, refreshToken} = body
        console.log(body, lastName, firstName, email, password, skills, roles, refreshToken)
        return User.findOneAndUpdate(
            { _id: userId },
            { $set: { lastName, firstName, email, password, skills, roles, refreshToken } },
            { new: true }
        )
    },
    deleteUserById: (userId)=>{
        return User.deleteOne({ _id: userId })
    }

}



export default exposeServices