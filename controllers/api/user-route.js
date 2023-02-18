
const router = require('express').Router();
const { User, Project } = require('../../models');

router.post('/newpost', async (req, res) => {
	console.log(req.body);
	try {
		const newProject = await Project.create({
			title: req.body.title,
			description: req.body.description,
			github_repo: req.body.github_repo,
			skills: req.body.skills,
			email: req.body.email,
			data_created: req.body.data_created
		});
		res.status(200).json(newProject);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/edit/:id', async (req, res) => {
try {
	const projectUpdate = await Project.update(
		{
			title: req.body.title,
			description: req.body.description,
			github_repo: req.body.github_repo,
			skills: req.body.skills,
			email: req.body.email,
			data_created: req.body.data_created
		},
		{
			where: {
				id_project: req.params.id
			}
		}
	);
	if (!projectUpdate) {
		res.status(404).json({ message: 'No post found with this id' });
		return;
	}
	res.status(200).json(projectUpdate);
}catch (err) {
	res.status(500).json(err);
}
})

router.delete('/delete/:id', async (req, res) => {
try {
	const projectDelete = await Project.destroy({
		where: {
			id_project: req.params.id
		}
	});
	if (!projectDelete) {
		res.status(404).json({ message: 'No post found with this id' });
		return;
	}
	res.status(200).json(projectDelete);
} catch (err) {
	res.status(500).json(err);
}
});



router.get('/:name', async (req, res) => {
	const name = req.params.name;
	await User.findOne({
		 where: { github_id: name },
		 attributes: ['id_user', 'username', 'github_id'],
		 include: [{
			  model: Project,
			  attributes: ['id_project', 'title', 'description'],
			  through: { attributes: [] } // This line removes the join table attributes from the result
		 }]
	})
	.then(user => {
		 if (!user) {
			// Handle case where user is not found
			  res.sendStatus(404);
			  return;
		 }
		 const userData = user.get({ plain: true });
		 console.log(userData);
		 res.render('myprofile', { userdbdata: userData });
	})
	.catch(error => {
		 console.error(error);
		 res.sendStatus(500);
	});
});

module.exports = router;
