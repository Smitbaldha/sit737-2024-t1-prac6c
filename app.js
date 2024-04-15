/**
   Express Application Configuration
  
   Configures an Express application for the ASMD (Add, Subtract, Multiply, Divide) microservice.
 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger'); // importing logger from logger.js file
const app = express();
const port = 1515; 

app.use(bodyParser.json());

// Middleware used for logging which saves the URL, request method, request body, and timestamp
app.use((req, res, next) => {
    logger.log({
        level: 'info',
        message: `${new Date().toLocaleString()} - ${req.method} ${req.url} requested`,
        requestBody: req.body,
    });
    next();
});

//Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
}

// Routes

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home.html');
});

// Route to handle addition operation
app.post('/add', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for Addition: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 + num2;
    res.json({ result: result });
});

//Route to handle subtraction operation
app.post('/subtract', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for subtraction: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 - num2;
    res.json({ result: result });
});

//Route to handle multiplication operation
app.post('/multiply', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for multiplication: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    const result = num1 * num2;
    res.json({ result: result });
});

//Route to handle division operation
app.post('/divide', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        logger.error(new Date().toLocaleString() +' - Invalid input for Division: num1=' + req.body.num1 + ', num2=' + req.body.num2);
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    if (num2 == 0) {
        logger.error(new Date().toLocaleString() +' - Division by zero is not possible');
        return res.status(400).json({ error: "Division by zero" });
    }

    const result = num1 / num2;
    res.json({ result: result });
});


// Health check route
app.get('/health', (req, res) => {
    // Just for testing
    logger.info("Healthy");
    res.status(200).send('Calculator service is healthy');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

