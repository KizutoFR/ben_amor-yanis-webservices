import projectsService from '#src/services/projectsService'


const exposeController = {

    allProjects:async (req,res)=>{
        const {query} = req
        const allProjects = await projectsService.findAllProjects(query)
        return res.json(allProjects)
    },
    oneProject:async (req,res)=>{
        const {params:{id}} = req
        const oneCrea = await projectsService.findOneProject({id})
        if(!oneCrea) return res.sendStatus(404)
        return res.json(oneCrea)
    },
    createProject:async (req,res)=>{
        const {body}  = req
        try {
                const newCrea = await projectsService.createProjects(body)     
                return res.status(201).json(newCrea)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
    },
    updateProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
            console.log(req.params,id)
               const project = await projectsService.findOneProject(id);

                if (!project) {
                    res.status(400).send('Project does not exist');
                    return
                }
                const toUpdate = await projectsService.updateProject(id,body)     
                
                return res.json(toUpdate)
            } catch (error) {
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
    patchProject:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
               const project = await projectsService.findOneProject(id);

                if (!project) {
                    res.status(400).send('Project does not exist');
                    return
                }
                const toPatch = await projectsService.patchProject(id,body)     
                return res.json(toPatch)
            } catch (error) {
                console.log(error)
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
    deleteProject:async (req, res) => {
        const { id } = req.params;

        try {
            const project = await projectsService.findOneProject(id);

            if (!project) {
            res.status(400).send('Project does not exist');
            return
            }

            await projectsService.deleteProject(id);

            res.sendStatus(204)
        } catch(err) {
            res.send(err);
        }
    }


}

export default exposeController