import Task from '../models/task.js';

export const getTasks = async (req, res) => {
    const arithmeticMethod = req.query.arithmeticMethod;
    const level = req.query.level;
    const limit = req.query.limit ? req.query.limit : 100;
    if (!arithmeticMethod || !level) {
        return res.status(404).json([]);    
    }
    try {
        const tasks = await Task.find({arithmeticMethod: arithmeticMethod, level: level})
        .limit(limit)
        .exec();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({'error': 'Could not get tasks'});
    }
}

export const createTask = async (req, res) => {
    const { firstNum, lastNum, arithmeticMethod, level } = req.body;
    const task = new Task({
        firstNum,
        lastNum,
        arithmeticMethod,
        level
    });
    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({'error': 'Could not create task'}); 
    }
}
