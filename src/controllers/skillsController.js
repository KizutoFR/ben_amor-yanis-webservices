import skillsService from '#src/services/skillsService'


const exposeController = {

    allSkills:async (req,res)=>{
        const allSkills = await skillsService.findAllSkills()
        return res.json(allSkills)
    },
    oneSkill:async (req,res)=>{
        const {id} = req.params
        const oneSkill = await skillsService.findOneSkillById(id)
        if(!oneSkill) return res.sendStatus(404)
        return res.json(oneSkill)
    },
    createSkill:async (req,res)=>{
        const {body}  = req
        try {
                const newSkill = await skillsService.createSkill(body)     
                return res.status(201).json(newSkill)
            } catch (error) {
                return res.sendStatus(400)
            // return res.json({error})
        }
    },
    patchSkill:async (req,res)=>{
        const {body}  = req
        const {id}    = req.params
        try {
               const project = await skillsService.findOneSkillById(id);

                if (!project) {
                    res.status(400).send('Skill does not exist');
                    return
                }
                const toPatch = await skillsService.patchSkill({id,body})     
                return res.json(toPatch)
            } catch (error) {
                console.log(error)
               return res.sendStatus(400)
            // return res.json({error})
        }
        
    },
    deleteSkill:async (req, res) => {
        const { id } = req.params;

        try {
            const project = await skillsService.findOneSkillById(id);

            if (!project) {
            res.status(400).send('Skill does not exist');
            return
            }

            await skillsService.deleteSkill(id);

            res.sendStatus(204)
        } catch(err) {
            res.send(err);
        }
    }


}

export default exposeController