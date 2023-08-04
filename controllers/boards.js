import express from "express";
import boards from "../models/boards.js";
import task from "../models/task.js";

const boardRouter = express.Router();

boardRouter.get("/", async (req, res) => {
  res.json(await boards.find());
});

boardRouter.post("/", async (req, res) => {
  const name = req.body.name;
  const dublicate = await boards.findOne({ name: name });
  if (dublicate) {
    return res.status(400).send("enter unique board name");
  } else {
    try {
      const newBoard = new boards(req.body);
      await newBoard.save();
      res.send("added succesfully");
    } catch (error) {
      res.send(error.message);
    }
  }
});

boardRouter.put("/:id", async (req, res) => {
  const { name, columns } = req.body
  try {
    res.json(
      await boards.findByIdAndUpdate(req.params.id, req.body, {
        name,
        columns,
      })
    );
  } catch (error) {
    res.send(error.message);
  }
});

boardRouter.delete("/:id", async (req, res) => {
  const deletedBoard = await boards.deleteOne({ _id: req.params.id });
  await task.deleteMany({ boardId: req.params.id });
  res.json(deletedBoard);
});

export default boardRouter;
