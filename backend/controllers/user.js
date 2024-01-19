const bcrypt =  require|("bcrypt")

const { json } = require("express");
const User = require("../models/User")

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=> {
        const user = new User({
            email : req.body.email,
            password: hash
        });
        user.save()
        .then( ()=> res.status(201),json({message : "utilisateur créé !!!"}))
        .catch(error=> res.status(400).json({error}));
    })
    .catch(error=> res.status(500).json({error}))

};



exports.login = (req,res,next)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(user === null){
            res.status(401).json({message: "paire identifiant / mot de pass incorrecte "})
        } else{
            bcrypt.compare (req.body.password, user.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json({messag: "paire identifiant / mot de pass incorrecte"})
                }
            })
            .catch(error=>{
                res.status(500).json({error})
            })
        }
    })
    .catch(error =>{
        res.status(500).json({error})
    })

};