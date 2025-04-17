const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const limiter = require('./middleware/rateLimiter');
app.use(limiter);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const apiEndpoints = require('./endpoints/apiEndpoints');
const { clearAll } = require("./middleware/cacheMiddleware");
app.use("/api/coins",apiEndpoints);

app.get("/ping",(req,res)=>{
    res.send("Hello World");
});

app.get("/clear",(req,res)=>{
    try{clearAll()
        console.log("done")
        res.send("done");
    }
    catch(error){
        res.send(error)
    }
})

const port = process.env.PORT;
app.listen(port,()=>console.log("server is running on port:",port));