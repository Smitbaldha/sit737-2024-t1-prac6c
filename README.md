# ASMD Microservice
### ASMD (Add, Subtract, Multiply, Divide) is a microservice built with Express.js that provides basic arithmetic operations.

### Features
- Supports addition, subtraction, multiplication, and division operations.
- Provides comprehensive error handling for invalid input and division by zero.
- Logs requests and errors for debugging purposes, enhancing troubleshooting capabilities.

### Prerequisites
- Ensure that you have Node.js installed on your machine.

### Installation
- To get started with ASMD Microservice, follow these steps:

1. Clone this repository. ``` git clone https://github.com/your-username/ASMD-microservice.git ```
2. Navigate to the project directory. ``` cd ASMD-microservice ```
3. Install dependencies. ``` npm install ```
4. Start the server. ``` npm start ```

## Usage
### Sending Requests
Send POST requests to the following endpoints:

- `/add` for addition operation
- `/subtract` for subtraction operation
- `/multiply` for multiplication operation
- `/divide` for division operation

Each request should include a JSON body with two properties: `num1` and `num2`, representing the numbers to perform the operation on.

#### Example request body:
```json
{
  "num1": 5,
  "num2": 3
}
```

### Response
The server will respond with a JSON object containing the result of the operation:

```json
{
  "result": 8
}
```
If an error occurs (e.g., invalid input or division by zero), the server will respond with an error message in the JSON format:

```json
{
  "error": "Invalid input. Please provide valid numbers."
}
```

### Logging
ASMD Microservice logs each request and error with accurate time to the console and log files located in the logs directory. This logging mechanism aids in debugging and monitoring the microservice's behavior.


