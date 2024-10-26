const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        msg:"user created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({username:username},{
        '$push':{purchasedCourses : courseId}
    })
    res.json({
        msg:"successfully added a course to your library"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
    const purchasedId = await User.findOne({username:req.headers.username})
    console.log(purchasedId)
    res.json({
        msg:"above courses have been purchased"
    })}
    catch(err){
        console.log(err)
        res.json({
            msg:"error occured"
        })
    }
});

module.exports = router;