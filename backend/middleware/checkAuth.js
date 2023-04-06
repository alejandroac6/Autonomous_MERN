import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

const checkAuth = async (req,res,next)=>{
    // La autorizacon se hara mediante el JsonWebTokenError, que lo colocaremos en la url

    // Bearer es una convencion que se utiliza para enviar el token

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        try {
            //req.lheaders.authorization nos da lo siguiente Bearer nqsijnbwqsinbd
            // Nos interesa quedarnos con lo que viene despues del Bearer, despues, lo desodificaremos con jwt
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            // Creo la variable de usuario, en la que pongo todos sus datos que se encuantran en la db menos el password
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
        
            // Una vez lo tenemos  checkeado pasamos al siguiente middleware
            next()
            
        } catch (error) {
            return res.status(404).json({msg:'Hubo un error'})
        }
    }

    if (!token) {
        const error=new Error('Token no valido')
        res.status(401).json({msg:error.message})
        
    }
}

export default checkAuth