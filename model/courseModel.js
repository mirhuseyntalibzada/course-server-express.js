import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    duration: { type: String, required: true }
});

const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    lessons: [LessonSchema]
});

const Lesson = model('Lesson', LessonSchema);
const Course = model('Course', CourseSchema);

export { Lesson, Course }
