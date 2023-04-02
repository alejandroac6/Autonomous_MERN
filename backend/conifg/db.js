import mongoose from "mongoose";

const conectarDB = async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://Alejandro:root@cluster0.7nephvf.mongodb.net/Autonomous?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })

        const url=`${connection.connection.host}:${connection.connection.port}`        

        console.log(`MongoDB Conectado en: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        // para que cuando de error termine los procesos
        process.exit(1)
    }
}

export default conectarDB
