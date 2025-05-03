import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
       title: { type: String, required: true },
       price: {type:String, required:true},
       definition:{type:String, required:true},
       img:{type:String, required:true},
});

export const CardModel = mongoose.model('Cards', CardSchema);