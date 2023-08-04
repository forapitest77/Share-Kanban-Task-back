import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  subTasks:{type:Array},
  status:{type:String},
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    required: true,
  },
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("task", taskSchema);
