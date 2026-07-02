import jwt from "jsonwebtoken";

const auth=async(req,res,next)=>{

    try{

        const token=req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            });
        }

        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user=decoded;

        next();

    }catch(err){

        return res.status(401).json({
            message:"Invalid token"
        });

    }
}

export default auth;