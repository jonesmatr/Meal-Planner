const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add route to handle form submission with the selected day
router.post('/submit-form', withAuth, async (req, res) => {
  try {
    // Get the selected day from the form submission
    const selectedDay = req.body['day-of-week'];
    const newProject = await Project.create({
      day_of_week: selectedDay,
      needed_funding: projectFunding,
      // ... (other fields)
      user_id: req.session.user_id,
    });
    // ... (process the form data and save to your database)
    // Here, you can use the selectedDay and any other form data to create a new project or perform other actions.

    res.status(200).json(/* response data */);
  } catch (err) {
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
