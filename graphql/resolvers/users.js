const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require("apollo-server");

const {validateRegisterInput, validateLoginInput} = require("../../util/validators");
const { SECRET_KEY} = require("../..//config");
const User = require("../../models/User");

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY,{expiresIn:"1h"});
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid} = validateLoginInput(username, password);
            
            if(!valid){
                throw new UserInputError("Error loging in", {errors});
            }
            
            const user = await User.findOne({username});

            if(!user){
                errors.general = "User Not Found";
                throw new UserInputError("Error loging in, User not found", {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = "Incorrect Login";
                throw new UserInputError("Incorrect Login, please check your username and password", {errors});
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        async register(_, {registerInput: {username, email, password, confirmPassword}},){

            // TODO validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid){
                throw new UserInputError("Errors", {errors});
            }
            
            // TODO Make sure user does not already exist
            const user = await User.findOne({username});
            if (user){
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken"
                    }
                })
                
            }

            // hash password before storage, create authentification token.
            password = await bcrypt.hash(password, 12);

            const newUser = User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
}