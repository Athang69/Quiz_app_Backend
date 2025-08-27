const mongoose = require("mongoose")
const schema = mongoose.Schema
const objectId = schema.ObjectId

const userSchema = new schema({
  email:{type:String, unique:true},
  password:String,
  username:String
})

const UserModel= mongoose.model('Users',userSchema)

const questionSchema=new schema({
  text:{type:String,required:true},
  options:[{type:String, required:true}],
  correctOption:{type:Number, required:true},
  points:{type:Number, default:1}
})

const QuestionModel=mongoose.model('Questions',questionSchema)

const quizSchema=new schema({
  title:{type:String,required:true},
  description:String,
  isPublic:{type:Boolean,default:true},
  owner:{type:objectId,ref:'Users'},
  questions:[questionSchema],
},{timestamps:true
})

const QuizModel=mongoose.model('Quizzes',quizSchema)

const attemptSchema=new schema({
  user:{type:objectId,ref:'Users'},
  quiz:{type:objectId,ref:'Quizzes'},
  answers:[{
    questionId:{type:objectId,required:true},
    chosenIndex:{type:Number,required:true},
    correct:{type:Boolean,required:true},
    pointsAwarded:{type:Number,required:true}
  }],
  score:{type:Number,required:true},
  maxScore:{type:Number,required:true}
},{timestamps:true
})

const attemptModel= mongoose.model('Attempts',attemptSchema)

module.exports={
  UserModel,
  QuizModel,
  QuestionModel,
  attemptModel
}