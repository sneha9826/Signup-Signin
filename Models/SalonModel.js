
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const res = require('express/lib/response');

//Create Schema.....

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    dob: {
        tpye: Number

    },
    date:{
        type: String,
        default:Date.now
    },
    
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true

    },
    TOKENS:[{
        TOKEN: {
            type: String,
            required: true
        }

    }]
   
   
       

})

//Create Token For SingUp...........

UserSchema.methods.generateAuthToken = function () {
    try {
        //console.log(this._id)
        const Token = jwt.sign({ _id: this._id }, "Secret-Key");
        this.TOKENS = this.TOKENS.concat({ TOKEN: Token })
console.log(Token)

        return Token;

    }
    catch(err){
        res.send("This part give error.....");
        console.log("This part give error.....")
    }
}
module.exports = mongoose.model('Database', UserSchema);