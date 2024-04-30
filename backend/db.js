const mongoose= require("mongoose");

var mongoURL='mongodb+srv://rajat11072000:rajat1234@cluster0.rc7jvjs.mongodb.net/onewayhotel'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection=mongoose.connection

connection.on('error',()=>{
    console.log('MongoDB connection is failed')
})

connection.on('connected',()=>{
    console.log('MongoDB connection is successful')
})

module.exports = mongoose;