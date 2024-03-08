import usersService from '#src/services/usersService'


const exposeController = {

    oneUser:async (req,res)=>{
        try{
            const { identifier } = req.params;
            const user = await usersService.findOneUser(identifier)
            if(!user) return res.sendStatus(404)
            return res.json(user)
        } catch(e){
            console.log(e)
        }
    },
    allUsers:async (req,res)=>{
        const allUsers = await usersService.findAllUsers()
        return res.json(allUsers)
    },
    createUser:async (req,res)=>{
        const {body}  = req
        try {
                const registeredUser = await usersService.createUser(body)     
                return res.json(registeredUser)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
     updateUser:async (req, res) => {
        const { identifier } = req.params;
        const body = req.body
        console.log(req.params, identifier)
        try {
            const user = await usersService.findOneUser(identifier);
            console.log(user)
            if (!user) {
            res.status(400).send('User does not exist');
            return
            }
            console.log(identifier,body)
            const updatedUser = await usersService.updateUserById({
            userId:identifier,
            body
            });
            console.log("updatedUser",updatedUser)
            res.json(updatedUser)
        } catch(err) {
            res.send(err);
        }
    },
    deleteUser:async (req, res) => {
        const { identifier } = req.params;

        try {
            const user = await usersService.findOneUser(identifier);

            if (!user) {
            res.status(400).send('User does not exist');
            return
            }

            await usersService.deleteUserById(identifier);
            res.sendStatus(204)
        } catch(err) {
            res.send(err);
        }
    }


}

export default exposeController