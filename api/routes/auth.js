import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Hello This is auth end point")
})

router.get("/registration",(req,res)=>{
    res.send("Hello This is auth  registration end point")
})

router.get("/signin",(req,res)=>{
    res.send("Hello This is auth sign in end point")
})

export default router