import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  firstNum: {
    type: Number,
    min: -1000,
    max: 1000
  },
  lastNum: {
    type: Number,
    min: -1000,
    max: 1000
  },
  arithmeticMethod: {
    type: String,
    default: 'addition'
  },
  level: {
    type: Number,
    min: 1,
    max: 2,
    default: 1
  }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;