const User = require('./User');
const Project = require ('./Project');

User.hasMany(Project, {
	foreignKey: 'user_id',
})

//Export your models so that it can be required in the server.js
// and/or routes files
module.exports = { User, Project };

