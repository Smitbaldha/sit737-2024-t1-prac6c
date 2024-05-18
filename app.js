/**
   Express Application Configuration
  
   Configures an Express application for the ASMD (Add, Subtract, Multiply, Divide) microservice.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger'); // Importing logger from logger.js file
const Calculation = require('./models'); // Importing the Calculation model
const app = express();
const port = 1515;

app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `${new Date().toLocaleString()} - ${req.method} ${req.url} requested`,
        requestBody: req.body,
    });
    next();
});

// Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
}

// Route to serve the home page along with the last 5 calculation logs
app.get('/', async (req, res) => {
    try {
        const lastFiveCalculations = await Calculation.find().sort({ _id: -1 }).limit(5);
        res.sendFile(__dirname + '/Home.html', { calculations: lastFiveCalculations });
    } catch (error) {
        console.error('Error fetching calculations:', error);
        res.status(500).json({ error: 'Failed to fetch calculations' });
    }
});

// Route to handle addition operation
app.post('/add', async (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error(`${new Date().toLocaleString()} - Invalid input for Addition: num1=${req.body.num1}, num2=${req.body.num2}`);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 + num2;

    const calculation = new Calculation({
        num1: num1,
        num2: num2,
        operation: 'add',
        result: result,
    });

    try {
        await calculation.save();
        res.json({ result: result });
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).json({ error: 'Failed to save calculation' });
    }
});

// Route to handle subtraction operation
app.post('/subtract', async (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`${new Date().toLocaleString()} - Invalid input for subtraction: num1=${req.body.num1}, num2=${req.body.num2}`);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 - num2;

    const calculation = new Calculation({
        num1: num1,
        num2: num2,
        operation: 'subtract',
        result: result,
    });

    try {
        await calculation.save();
        res.json({ result: result });
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).json({ error: 'Failed to save calculation' });
    }
});

// Route to handle multiplication operation
app.post('/multiply', async (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`${new Date().toLocaleString()} - Invalid input for multiplication: num1=${req.body.num1}, num2=${req.body.num2}`);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 * num2;

    const calculation = new Calculation({
        num1: num1,
        num2: num2,
        operation: 'multiply',
        result: result,
    });

    try {
        await calculation.save();
        res.json({ result: result });
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).json({ error: 'Failed to save calculation' });
    }
});

// Route to handle division operation
app.post('/divide', async (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(`${new Date().toLocaleString()} - Invalid input for Division: num1=${req.body.num1}, num2=${req.body.num2}`);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    if (num2 === 0) {
        logger.error(`${new Date().toLocaleString()} - Division by zero is not possible`);
        return res.status(400).json({ error: "Division by zero" });
    }

    const result = num1 / num2;

    const calculation = new Calculation({
        num1: num1,
        num2: num2,
        operation: 'divide',
        result: result,
    });

    try {
        await calculation.save();
        res.json({ result: result });
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).json({ error: 'Failed to save calculation' });
    }
});

// Route to handle exponential operation
app.post('/exponential', async (req, res) => {
    const base = parseInt(req.body.num1);
    const exponent = parseInt(req.body.num2);

    if (!isValidNumber(base) || !isValidNumber(exponent)) {
        logger.error(`${new Date().toLocaleString()} - Invalid input for exponential: base=${req.body.num1}, exponent=${req.body.num2}`);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = Math.pow(base, exponent);

    const calculation = new Calculation({
        num1: base,
        num2: exponent,
        operation: 'exponential',
        result: result,
    });

    try {
        await calculation.save();
        res.json({ result: result });
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).json({ error: 'Failed to save calculation' });
    }
});

// Route to delete a specific calculation
app.delete('/calculations/:id', async (req, res) => {
    try {
        const calculation = await Calculation.findByIdAndDelete(req.params.id);
        if (!calculation) {
            return res.status(404).json({ error: 'Calculation not found' });
        }
        res.json({ message: 'Calculation deleted successfully' });
    } catch (error) {
        console.error('Error deleting calculation:', error);
        res.status(500).json({ error: 'Failed to delete calculation' });
    }
});

// Health check route
app.get('/health', (req, res) => {
    logger.info("Healthy");
    res.status(200).send('Calculator service is healthy');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;
   