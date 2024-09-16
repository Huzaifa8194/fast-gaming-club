const TaskModel = require("../models/taskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();

  
  res.send(task);
};

module.exports.saveTasks = async (req, res) => {
  const { task } = req.body;
  TaskModel.create({ task })
    .then((data) => {
      console.log("Saved sucessfully");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(error);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};


module.exports.updateTasks = async (req, res) => {

    const {id} = req.params;

    const { task } = req.body;
    TaskModel.findByIdAndUpdate(id,{task}).
    then(() => res.send("Updated task successfully"))
      .catch((err) => {
        console.log(error);
        res.send({ error: err, msg: "Something went wrong!" });
      });
  };
  

  module.exports.deleteTasks = async (req, res) => {

    const {id} = req.params;

   
    TaskModel.findByIdAndDelete(id).
    then(() => res.send("Deleted successfully"))
      .catch((err) => {
        console.log(error);
        res.send({ error: err, msg: "Something went wrong!" });
      });
  };
  
