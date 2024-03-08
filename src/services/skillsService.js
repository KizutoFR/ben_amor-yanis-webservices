import Skill from "#src/models/Skills";

const exposeServices = {
    findOneSkillById: async (SkillId)=>{
        try {
            console.log("2",SkillId)
            const findSkill = await Skill.findOne({_id:SkillId})
            return  findSkill
        } catch (error) {
            throw error
        }
    },
    findAllSkills: async ()=>{
        try {
            const   allSkills = await Skill.find()
            return  allSkills
        } catch (error) {
            throw error
        }
    },
    createSkill: async (rawData)=>{

        try {
            const projectToSave = new Skill(rawData)
            const newSkill = projectToSave.save()   
            return newSkill
        } catch (error) {
            throw new Error(error)
        }
    },
    patchSkill: async ({id,body})=>{
        const {label} = body
        try {
            const updatedSkill  = await Skill.findOneAndUpdate(
                {_id:id},
                {$set:{label}},
                {new:true}
            ) 
            return  updatedSkill
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteSkill: async (id)=>{
        return Skill.deleteOne({ _id: id })
    }

}



export default exposeServices