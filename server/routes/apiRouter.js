const routers = require('express').Router()

routers.use('/user', require('./user'))
routers.use('/visit', require('./vist'))
// routers.use();
// routers.use();

module.exports = routers
