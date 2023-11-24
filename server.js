const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')
const app = express();
const dotenv = require('dotenv')
const colors = require('colors');


const { connectDB } = require('./config/db');
const testRouter = require('./routes/testRouter.js');
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const jobsRouter = require('./routes/jobsRouter.js');

const morgan = require('morgan');
const cors = require('cors')



const errorMiddleware = require('./middlewares/errorMiddleware.js');
const { default: helmet } = require('helmet');
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

dotenv.config()


connectDB();

const options  = {
    definition:{

        openapi : "3.0.0",
        info:{
            title : "Job Portal API",
            descreption : "API documentation for job portal API using MongoDB and Express.js"
        },
        servers:[
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis:['./routes/*.js']
}
const spec = swaggerDoc(options)
app.use(helmet())
app.use(xss())
app.use(mongoSanitize());

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));


app.use('/api/test/',testRouter)
app.use('/api/auth/',authRouter)
app.use('/api/users/',userRouter)
app.use('/api/jobs/',jobsRouter)
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))

app.use(errorMiddleware)
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`listening on port <<${PORT}>> server running on Mode : ${process.env.DEV_MODE}` .bgBlack.white);
},)