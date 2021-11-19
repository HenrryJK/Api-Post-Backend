
const  Pool = require ('pg').Pool;

const pool = new Pool(
{
host:'ec2-107-20-127-127.compute-1.amazonaws.com',
user:'oolhxlzehfnfpl',
password:'a4ca5a5c79453dd93a73ffab2ea895d2f430a65aad9ee8f0925336668fc3c3fa',
database:'d911o8tj5sefhp',
port:5432,
ssl: { rejectUnauthorized: false}

}
);

module.exports = pool;