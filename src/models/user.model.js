

import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullname: {
        type: String,
        required: true,

        index: true,
        trim: true,

    },
    avatar: {
        type: String, // cloudinary url
        required: true,


    },
    coverimage: {
        type: String, // cloudinary url

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: " Video"
        }
    ],
    password: {
        type: String,
        required: [true, " passwrod is required"]

    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

// designing won methods in mogooose 

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.gernerateAccessToken = function () {
   return jwt.sign({
        // payload
        _id:this._id,
        email: this.email,
        username: this.userSchema,
        fullname: this.fullname
     },
        process.env.ACCESS_TOKEN_SRCRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.methods.gernerateRefreshToken = function () {
    return jwt.sign({
        // payload
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
 }
export const User = mongoose.model("User", userSchema)