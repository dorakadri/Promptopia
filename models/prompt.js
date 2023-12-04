const { Schema, models, model } = require("mongoose");


const promptSchema = new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    prompt:{
        type:String,
        required :[true,'Prompt id required'],
    },
    tag:{
        type:String,
        required :[true,'tag id required'],
    }
});

const Prompt =models.Prompt || model('Prompt',promptSchema); 
export default Prompt;