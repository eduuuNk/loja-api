const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.slip("")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("SUA CHAVE NÃO É VÁLIDA AAAAAAAAAAAAA");
            req.user = user;
            next();
        })

    }else{
        return res.status(401).json("Você não está autenticado!!!");
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();

        }else{
            res.status(403).json("VOCÊ NÃO ESTÁ AUTORIZADO A TAL COISA AAA!!!")
        }
        
    });
};

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("VOCÊ NÃO ESTÁ AUTORIZADO A TAL COISA AAA!!!")
        }
        
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };