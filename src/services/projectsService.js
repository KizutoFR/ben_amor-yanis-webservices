import Project from "#src/models/Projects";
import queryBuilder from "#src/utils/mongoQueryBuilder";

const exposeServices = {

    findOneProject: async (id)=>{
        try {
            console.log(id)
            const   oneProject = await Project.findOne({_id:id})
            return  oneProject
        } catch (error) {
            throw new Error(error)
        }
    },
    findAllProjects: async (query)=>{
        // là ici je vais manipuler ma query
        // pour en faire un objet mongod 
        // query {skills:'Typescript'}
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})
        
        try {
            const   allProject = await Project.find(filter,projection,options)
            return  allProject
        } catch (error) {
            throw new Error(error)
        }
    },
    createProjects: async (rawData)=>{

        try {
            const projectToSave = new Project(rawData)
            const newProject = projectToSave.save()   
            return newProject
        } catch (error) {
            throw new Error(error)
        }
    },
    updateProject: async (id,body)=>{
        console.log("aa", id, body)
        try {
            const updatedProject  = await Project.findOneAndUpdate(
                {_id:id},
                body,
                {new:true}
            ) 
            return  updatedProject
        } catch (error) {
            throw new Error(error)
        }
    },
    patchProject: async (id,body)=>{
        try {
            const {name, description, skills, members} = body
            const   patchProject  = await Project.findOneAndUpdate(
                {_id:id},
                {$set:{name, description, skills, members}},
                {new:true}
            ) 
            return  patchProject
        } catch (error) {
            throw new Error(error)
        }
    },

    deleteProject: async (id)=>{
        return Project.deleteOne({ _id: id })
    }

}



export default exposeServices