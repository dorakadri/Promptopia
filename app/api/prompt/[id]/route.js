import Prompt from "@models/prompt";
import { connect } from "@utils/database";


//Get 
export const GET= async(req,{params})=>{

    try {
        await connect();
       const data =await Prompt.findById(params.id).populate('creator');
       if(!data) return new Response("prompt not found",{status:404})
        return new Response(JSON.stringify(data),{status:201});
    } catch (error) {
        return new Response("error")
    }
    
    }


//patch
export const PATCH= async(req,{params})=>{
const {prompt,tag}=await req.json();
    try {
        await connect();
       const data =await Prompt.findById(params.id);
       if(!data) return new Response("prompt not found",{status:404})
       data.prompt=prompt ; 
      data.tag=tag ; 
      await data.save();
        return new Response(JSON.stringify(data),{status:201});
    } catch (error) {
        return new Response("error",{status:500})
    }
    
    }


//delete

export const DELETE= async(req,{params})=>{

        try {
            await connect();
           const data =await Prompt.findByIdAndRemove(params.id);
           if(!data) return new Response("prompt not found",{status:404})
 
            return new Response("deleted succesfully",{status:201});
        } catch (error) {
            return new Response("error",{status:500})
        }
        
        }