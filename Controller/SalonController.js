const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const MongoClient = require('mongodb').MongoClient;
const randomstring = require('randomstring')

const model = require('../Models/SalonModel');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { db } = require('../Models/SalonModel');
let url = "mongodb+srv://salon:Salon123@cluster0.kt1sy.mongodb.net/salon-managment-system?retryWrites=true&w=majority";

//Create Api for SignUp........

const SignUp = function (req, res) {

    const Password = req.body.password;
    const Confirm_password = req.body.confirmpassword;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");
        if (Password == Confirm_password) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const obj = new model({
                        _id: mongoose.Schema.Types.ObjectId,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        dob: req.body.dob,
                        gender: req.body.gender,
                        address: req.body.address,
                        mobileno: req.body.mobileno,
                        password: hash
                    })
                    obj.generateAuthToken();
                    database.collection("signUp").insertOne(obj, function (err, db) {
                        if (err) throw err;
                        console.log(" Document Inserted......", obj);

                        res.json(obj);
                        db.close
                    })

                }

            });
        } else {
            res.send("Password not match")
            console.log("Password not match")
        }
    })
}

const LogIn = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        database.collection("signUp").findOne({ email: req.body.email }, function (err, result) {
            const password1 = database.collection("signUp").findOne({ password: req.body.password })


            if (err) throw err;
            console.log(result);
            res.send(result);



            bcrypt.compareSync(req.body.password, JSON.stringify(password1), function (err, match) {

                if (err) throw err
                else
                    (match)
                res.status(200).json({ Token: generateAuthToken(password1) });

                {
                    res.status(403).json({ error: "password do not match" })
                    console.log("not generate");
                }



                db.close();

            });

        });

    })

}
const Appointment = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");
        
        const obj = new model({
            _id: mongoose.Schema.Types.ObjectId,
            firstname: req.body.firstname,
            email: req.body.email,
            date:req.body.date  
        })
        database.collection("appointment").insertOne(obj, function(err,result){
      
       if(err) throw err
       console.log("insert......");
        
    })
})
    db.close();
}





















const ForgotPassword = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        database.collection("signUp").findOne({ email: req.body.email });
        console.log("sneha");

        // const random = randomstring.generate();
        // database.collection("signUp").updateOne({email:email},{$set:{Token:randomstring}});

        // if (!user) 
        // return res.status(401)
        // .json({message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});


    });
};

module.exports = { SignUp, LogIn, ForgotPassword, Appointment }