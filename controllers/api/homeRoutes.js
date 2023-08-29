const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
    try {
        // Fetch all projects from the database
        const projectData = await Project.findAll({
            include: [{ model: User }],
        });

        // Serialize data for rendering in Handlebars template
        const projects = projectData.map((project) => project.get({ plain: true }));

        // Render the homepage template with all projects
        res.render('homepage', {
            projects,
            // Pass any other necessary variables, e.g., user session data
            logged_in: req.session.logged_in || false,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// Render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// Render the profile page with the logged-in user's projects
router.get('/profile', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    
    try {
        const userProjects = await Project.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: User }],
        });

        const projects = userProjects.map((project) => project.get({ plain: true }));
        
        res.render('profile', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render a specific project's details based on its ID
router.get('/project/:id', async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        const project = projectData.get({ plain: true });
        
        res.render('project', {
            project,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
