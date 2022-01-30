export const validateInput = async (req, res, next) => {
    req.body.arithmeticMethod = 
    (req.body.arithmeticMethod && arithmeticMethodIsValid(req.body.arithmeticMethod)) 
    ? req.body.arithmeticMethod 
    : 'addition';
    req.body.level = parseLevel(req.body.level);
    req.body.firstNum = parseNumInput(req.body.firstNum);
    req.body.lastNum = parseNumInput(req.body.lastNum);
    if (req.body.firstNum === null || req.body.lastNum === null) {
        return res.status(400).json({'error': 'Could not create task'});    
    }
    let errorMessage = verifyTaskRequirements(
        req.body.firstNum, 
        req.body.lastNum, 
        req.body.level, 
        req.body.arithmeticMethod
    );
    if (errorMessage) {
        return res.status(400).json({'error': errorMessage});
    }
    next();
}

export const validateQuery = (req, res, next) => {
    req.query.arithmeticMethod = 
    (req.query.arithmeticMethod && arithmeticMethodIsValid(req.query.arithmeticMethod)) 
    ? req.query.arithmeticMethod
    : 'addition';
    req.query.level = parseLevel(req.query.level);
    next();
}

const arithmeticMethodIsValid = (arithmeticMethod) => {
    let isValid = false;
    if (
        arithmeticMethod === 'addition'
        || arithmeticMethod === 'subtraction'
        || arithmeticMethod === 'multiplication'
        || arithmeticMethod === 'division'
    ) {
        isValid = true;
    }
    return isValid;
}

const parseLevel = (levelInput = 1) => {
    let level = 
    ((typeof(levelInput) === 'number' || typeof(levelInput) === 'string') 
    && !isNaN(Number.parseInt(levelInput, 10)))
    ? Number.parseInt(levelInput, 10) 
    : 1;
    level = (level > 0 && level < 4) ? level : 1;
    return level;
}

const parseNumInput = (numInput) => {
    let num = 
    ((typeof(numInput) === 'number' || typeof(numInput) === 'string') 
    && !isNaN(Number.parseInt(numInput, 10))) 
    ? Number.parseInt(numInput, 10) 
    : null;
    return num;
}

const verifyTaskRequirements = (firstNum, lastNum, level, arithmeticMethod) => {
    let errorMessage = '';
    let min = -1000, max = 1000;
    if (level < 3) {
        min = (level === 2) ? -10 : 0;
        max = (level === 2) ? 20 : 10;
        if (arithmeticMethod === 'subtraction') {
            max = (level === 2) ? 30 : 20;   
        }
        if (arithmeticMethod === 'division') {
            max = (level === 2) ? 200 : 100;
        }
    }
    if (!isInRange(firstNum, min, max) || !isInRange(lastNum, min, max)) {
        errorMessage = `For level ${level} numbers should be in range between ${min} and ${max}. `;
    }
    if (arithmeticMethod === 'subtraction' && level === 1 && lastNum > firstNum) {
        errorMessage += 'For level 1 result should not be a negative number.';
    }
    if (arithmeticMethod === 'division') {
        if (lastNum === 0) {
            errorMessage = 'Division with 0 not allowed.'
        }
        else if (firstNum % lastNum !== 0) {
            errorMessage += `${firstNum} is not evenly divisible by ${lastNum}.`
        }
    }
    return errorMessage;
}

const isInRange = (num, min, max) => {
    let inRange = false;
    if (num <= max && num >= min) {
        inRange = true;
    }
    return inRange;
}