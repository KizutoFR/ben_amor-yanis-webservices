import {verifyJwt}    from '#src/utils/jwtoken'


const exposeMiddleware = {

    protect:async (req,res,next)=>{
        const accessToken  = req.headers['authorization'];

        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        if(accessToken.startsWith('Bearer ')) {
            // Remove Bearer from string
            const cleanAccess = accessToken.slice(7, accessToken.length);
            try {
                const verify = verifyJwt(cleanAccess)
                req.user= verify
                return next()
            } catch (error) {
                console.log(error.message)
                return res.status(401).send('Unauthorized')
            }
        }
        return res.sendStatus(400)
        
    },
    isAdmin:async (req,res,next)=>{
        const user  = req.user;

        if(user.roles==="admin") {
                return next()
        } else {
            return res.status(401).send('You dont have the right permissions')
        }
    }
}

export default exposeMiddleware