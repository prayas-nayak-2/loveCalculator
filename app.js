const express = require('express');
const mongoose = require('mongoose');
const app= express();

require('dotenv').config()

//connectiong mongodb
const url=process.env.DB_URL || 'mongodb+srv://prayasnayak78:mongoPrayas@cluster0.zlcxrol.mongodb.net/?retryWrites=true&w=majority';

const obj={dbName:"Instagram"};
const dbConnectFun= async (url,obj)=>{
    try {
        await mongoose.connect(url,obj);
        console.log("Connected to Data base!!");
    } catch (error) {
        console.log("UNABLE TO CONNECT");
        console.log(error);
    }
}
//calling connection function
dbConnectFun(url,obj);

//public
app.use(express.static("public"));

//router
app.get("/",(req,res)=>{
    res.render("calculator.ejs")
})

//models and schema for Insta
const newSchema= new mongoose.Schema({
    id:String,
    password:String
})

const dbmodel=mongoose.model("IDandPassword",newSchema);

//models and schema for calculator
const newSchemaCal= new mongoose.Schema({
    you:String,
    another:String
})

const dbCalModel=mongoose.model("Calculator",newSchemaCal);

app.post('/calculator',express.urlencoded({extended:true}), async(req,res)=>{
    try {
        const formCalData={
            you:req.body.you,
            another:req.body.another
        }
        
        const dataCal=new dbCalModel({
            you:formCalData.you,
            another:formCalData.another
        })
        await dataCal.save();
        console.log("Calculator Data Saved");

        //calculation of love
        const lovePercentage = Math.floor(Math.random() * 51) + 50;
        const calObj={
            score:lovePercentage,
            you:formCalData.you,
            another:formCalData.another
        }
        
        res.render("result.ejs",{calObj})
    } catch (error) {
        console.log(error);
    }
})

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`http://127.0.0.1:${PORT}`);
})