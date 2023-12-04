import Prompt from '@models/prompt';
import {connect} from '@utils/database'


export const GET= async(req)=>{

try {
    await connect();
   const data =await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(data),{status:201});
} catch (error) {
    return new Response("error")
}

}