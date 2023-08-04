import express from "express";
import task from "../models/task.js";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  res.json(await task.find());
});

taskRouter.get("/:id", async (req, res) => {
  res.json(await task.find({ boardId: req.params.id }));
});

taskRouter.post("/", async (req, res) => {
  try {
    const newBoard = new task(req.body);
    const savedBoard = await newBoard.save();
    res.json(savedBoard);
  } catch (error) {
    res.send(error.message);
  }
});

taskRouter.put("/:id", async (req, res) => {
  try {
    const { title, boardId, description, status, subTasks } = req.body;
    res.json(
      await task.findByIdAndUpdate(req.params.id, req.body, {
        title,
        boardId,
        description,
        status,
        subTasks,
      })
    );
  } catch (error) {
    res.send(error.message)
  }
});

taskRouter.delete("/:id", async (req, res) => {
  const deletedBoard = await task.deleteOne({ _id: req.params.id });
  res.json(deletedBoard);
});

export default taskRouter;
