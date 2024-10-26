const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username,
        password
    })
    res.json({
        msg:"admin created successfully"
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const courseData = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({ message: 'Course created successfully', courseId: courseData._id })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allData = await Course.find({});
    const courseTitle = allData.map(ele=>{
        var arr = []
        arr.push(ele.title);
        arr.push(ele.description);
        return arr;
    })
    res.json({
        myCourses: courseTitle
    })
});

module.exports = router;