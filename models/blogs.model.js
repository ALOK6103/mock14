const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema(
  {
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    likes:Number,
    comments:Array,
    userID:String
  },
  {
    versionKey: false,
  }
);

const BlogsModel=mongoose.model("blogs",BlogsSchema)

module.exports={
  BlogsModel
}
