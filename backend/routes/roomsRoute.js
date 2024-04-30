const express=require("express");
const router=express.Router();

const Room=require('../models/rooms')

router.get("/getallrooms",async(req,res)=>{
    try{
        const room=await Room.find({})
        res.send(room);
    }

    catch(error)
    {
      return res.status(400).json({message:error})
    }
});



router.post('/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;
    try {
      const room = await Room.findOne({ _id: roomid.toString() });
      res.send(room);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });


  router.post('/addroom',async(req,res)=>{
    try {
      const newroom= new Room(req.body)
      await newroom.save()

      res.send('New Room added Successfully')
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  })

module.exports=router;