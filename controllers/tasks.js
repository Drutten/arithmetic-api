import Task from '../models/task.js';

export const getTasks = async (req, res) => {
    const arithmeticMethod = req.query.arithmeticMethod ? req.query.arithmeticMethod : 'addition';
    const level = parsedLevel(req.query.level);
    const limit = req.query.limit ? req.query.limit : 100;
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

const parsedLevel = (levelInput) => {
    let level = (levelInput && !isNaN(levelInput)) ? Number.parseInt(levelInput, 10) : 1;
    level = (level > 0 && level < 4) ? level : 1;
    return level;
}