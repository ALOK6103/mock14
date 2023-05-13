const {UserModel}=require("../models/users.model")

const express=require("express")

const UserRouter=express.Router()

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

UserRouter.post("/register",(req,res)=>{
    const {username,avatar,email,password}=req.body 

    try {
        bcrypt.hash(password,5,async function(err,hash){
            await UserModel.create({username,avatar,email,password:hash})
            res.status(200).send({"msg":"user created"})
        })
    } catch (error) {
        res.status(400).send({"msg":error}) 
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body 

    try {
        const user=await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    var token=jwt.sign({userID:user._id},"secret")
                    res.status(200).send({token})
                }else{
                    res.status(400).send({"msg":"Unauthorised"})
                }
            })
        }else{
            res.status(400).send({"msg":"user does not exist"})

        }
    } catch (error) {
        res.send({"msg":error})
        
    }
})

module.exports={
    UserRouter
}