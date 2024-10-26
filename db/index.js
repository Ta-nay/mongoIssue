const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:JbRJ38hZ5JW7SBdI@cluster0.gnazixi.mongodb.net/courses');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:{type:String, minLength:8}
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:{type:String, minLength:8},
    purchasedCourses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    imageLink:String

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}