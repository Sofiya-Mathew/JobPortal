const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const errorHandler=require('./middleware/error')

//Import routes
const authRoute=require('./routes/auth')
const companyRoute=require('./routes/companyRoutes')
const jobRoute=require('./routes/jobRoutes')

app.use('/api/jobs', jobRoute);
//Data base connection
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("db connection successfull");
}).catch((err)=>{
    console.log(err);  
})


// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,               
};
app.use(cors(corsOptions));

//Midddleware
app.use(morgan('dev'))
app.use(errorHandler)
app.use(bodyParser.json({limit:"5mb"}))
app.use(express.json());
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended:true
}))

app.use(cookieParser())
app.use('/api',authRoute)
app.use('/api', companyRoute);
app.use('/api', jobRoute);

//Connecting to port
app.listen(process.env.PORT || 5000,()=>{
    console.log('server is running');
})