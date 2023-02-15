
const router = require('express').Router();
const { User, Project } = require('../../models');

router.post('/newpost', async (req, res) => {
// db query here
});

router.get('/:name', (req, res) => {
	const name = req.params.name;
	User.findOne({ where: { github_id: name } })
		.then(user => {
			res.render('publicprofile', { user });
		})
		.catch(error => {
			console.error(error);
			res.sendStatus(500);
		});
});

module.exports = router;


