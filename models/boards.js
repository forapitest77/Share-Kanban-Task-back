import mongoose from "mongoose";

const boardsSchema = mongoose.Schema({
  name: { type: String, required: true },
  columns: { type: Array },
});

  boardsSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

export default mongoose.model("boards", boardsSchema);