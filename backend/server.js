require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/db");
const startServer = async()=>{
    try{
        await connectDb();
       app.listen(3000,()=>{
        console.log("server is running port 3000 number");
       })
        


    }catch(error){
        console.log(error);
    }
}
startServer();