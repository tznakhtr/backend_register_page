const express= require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const EmployeeModel = require('./models/Employee')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL);

app.post("/login",(req , res)=> {
    const {email , password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user){
        if(user.password===password){
            res.json("Success")
        }
        else
        {
            res.json("the password is incorrect")
        }
    }
        else {
         res.json("No records existed")
        }
    })
    app.get('/getUsers', (req , res)=> {
        EmployeeModel.find({})
        .then(users=> res.json(users))
        .catch(err=> res.json(err))
    });
    
})

app.post('/register' , (req , res)=>{
EmployeeModel.create(req.body)
.then(employees => res.json(employees))
.catch(err=> res.json(err))
})
app.listen(3001,()=> {
    console.log("Server is Running")
})