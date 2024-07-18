const dotenv = require('dotenv');
const result = dotenv.config();

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

if(result.error) {
    throw result.error;
}

console.log(hostname);
console.log(database);
console.log(port);

console.log(result.parsed)

console.log(process.cwd())