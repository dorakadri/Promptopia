import Prompt from '@models/prompt';
import {connect} from '@utils/database'


export const GET= async(req,{params})=>{

try {
    await connect();
   const data =await Prompt.find({creator:params.id}).populate('creator');

    return new Response(JSON.stringify(data),{status:201});
} catch (error) {
    return new Response(JSON.stringify(error))
}

}