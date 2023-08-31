const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   console.log(req.body);
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      needed_funding,
      description,
      meal_name,
      day_of_week,
      recipe,
    } = req.body;

    const newProject = await Project.create({
      name,
      needed_funding,
      description,
      meal_name,
      day_of_week,
      recipe,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});




router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
