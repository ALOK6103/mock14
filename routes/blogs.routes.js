const {BlogsModel}=require("../models/blogs.model")
const express=require("express")

const BlogRouter=express.Router()

BlogRouter.post("/",async(req,res)=>{
    try {
        await BlogsModel.create(req.body)
        res.status(200).send({"msg":"blog created"})
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})

BlogRouter.get("/",async(req,res)=>{
    try {
        const blog=await BlogsModel.find({userID:req.body.userID})
        res.status(200).send({blog})
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})


BlogRouter.get("/title",async(req,res)=>{
    const {title}=req.query 

    const blog1=await BlogsModel.find({userID:req.body.userID})

    let filterd=blog1.filter((el)=>{
        return el.title==title
    })

    res.status(200).send({filterd})
})


BlogRouter.get("/category",async(req,res)=>{
    const {category}=req.query 

    const blog1=await BlogsModel.find({userID:req.body.userID})

    let filterd=blog1.filter((el)=>{
        return el.category==category
    })

    res.status(200).send({filterd})
})

BlogRouter.get("/?sort=date&order=asc",async(req,res)=>{
   


    const emp=await BlogsModel.find({userID:req.body.userID})

    function compare(a,b){
        return Number(a.date)-Number(b.date)
    }

    emp.sort(compare)

    res.status(200).send({emp})

    
})


BlogRouter.put("/:id",async(req,res)=>{
    const {id}=req.params 
 
    try {
     await BlogsModel.findByIdAndUpdate({_id:id},req.body)
     res.status(200).send({"msg":"blog updated"})
    } catch (error) {
     res.status(400).send({"msg":error})
    }
 })

 BlogRouter.put("/:id/like",async(req,res)=>{
    const {id}=req.params 

    try {
        await BlogsModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"like updated"})
       } catch (error) {
        res.status(400).send({"msg":error})
       }

   
 })
 
 BlogRouter.delete("/:id",async(req,res)=>{
     const {id}=req.params 
 
     try {
         await BlogsModel.findByIdAndDelete({_id:id})
         res.status(200).send({"msg":"blog deleted"})
     } catch (error) {
         res.status(400).send({"msg":error})
         
     }
 })

module.exports={
    BlogRouter
}
