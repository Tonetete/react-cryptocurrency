module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'supersecretpassphraseofdeath1',
    // Database connection information
    'database': 'mongodb://localhost:27017',
    // Setting port for server
    'port': process.env.PORT || 3000
}