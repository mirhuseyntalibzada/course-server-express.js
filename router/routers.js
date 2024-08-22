import { Router } from "express";
import { Course } from "../model/courseModel.js";
import mongoose from "mongoose";

const appRouter = new Router()

appRouter.get('/courses', (req, res) => {
    Course.find()
        .then((courses) => {
            if (!courses) {
                return res.status(404).send('Courses not found');
            }
            res.json(courses)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error');
        });
})

appRouter.get('/course/:courseID', (req, res) => {
    const { courseID } = req.params

    Course.findById(courseID)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Course not found');
            }
            res.json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error');
        });
})

appRouter.get('/course/:courseID/lessons', (req, res) => {
    const { courseID } = req.params

    Course.findById(courseID)
        .then((course) => {
            if (!course) {
                return res.status(404).send('Lessons or Course not found')
            }
            res.json(course.lessons)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error')
        })
})

appRouter.get('/course/:courseID/lesson/:lessonID', (req, res) => {
    const { courseID, lessonID } = req.params

    Course.findById(courseID)
        .then((course) => {
            if (!course) {
                return res.status(404).send('Course cannot be found')
            }

            const lesson = course.lessons.id(lessonID)

            if (!lesson) {
                return res.status(404).send('Lesson cannot be found')
            }
            res.send(lesson)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error')
        })
})

appRouter.post('/create-course', (req, res) => {
    const data = req.body

    Course.create(data)
        .then((course) => {
            res.status(201).json({
                message: 'Course created successfully',
                course: course
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Failed to create course',
                error: err.message
            });
        });
})

appRouter.post('/course/:courseID/add-lesson', (req, res) => {
    const id = req.params.courseID
    const newLesson = req.body

    Course.findByIdAndUpdate(
        id,
        { $push: { lessons: newLesson } },
        { new: true, useFindAndModify: false }
    )
        .then((updatedCourse) => {
            if (!updatedCourse) {
                return res.status(404).send('Course not found');
            }
            res.json('success');
        })
        .catch((err) => res.status(500).send(err));
})

appRouter.delete('/course/:courseID', (req, res) => {
    const courseID = req.params.courseID

    Course.findByIdAndDelete(courseID)
        .then((deletedCourse) => {
            if (!deletedCourse) {
                return res.status(404).send('Course not found')
            }
            res.send(`Course with ID ${courseID} has been deleted`);
        })
        .catch((err) => res.status(500).send(err));
})

appRouter.delete('/course/:courseID/lesson/:lessonID', (req, res) => {
    const { courseID, lessonID } = req.params

    Course.findByIdAndUpdate(
        courseID,
        { $pull: { lessons: { _id: new mongoose.Types.ObjectId(lessonID) } } },
        { new: true, useFindAndModify: false }
    )
        .then((updatedCourse) => {
            if (!updatedCourse) {
                return res.status(404).send('Course not found');
            }
            res.send(`Lesson with ID ${lessonID} has been deleted`);
        })
        .catch((err) => res.status(500).send(err));
})

appRouter.put('/course/:courseID', (req, res) => {
    const { courseID } = req.params
    const updatedCourse = req.body

    Course.findByIdAndUpdate(courseID, updatedCourse, { new: true, runValidators: true })
        .then((course) => {
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error');
        });
})

appRouter.patch('/course/:courseID', (req, res) => {
    const { courseID } = req.params
    const updatedFields = req.body

    Course.findOneAndUpdate(
        { _id: courseID },
        { $set: updatedFields },
        { new: true, runValidators: true }
    )
        .then((course) => {
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        })
        .catch((err) => {
            console.error('Error updating course:', err);
            res.status(500).send('Server error');
        });
})

appRouter.put('/course/:courseID/lesson/:lessonID', (req, res) => {
    const { courseID, lessonID } = req.params;
    const updatedLesson = req.body;

    Course.findOneAndUpdate(
        { _id: courseID, 'lessons._id': lessonID },
        { $set: { 'lessons.$': updatedLesson } },
        { new: true, runValidators: true }
    )
        .then((course) => {
            if (!course) {
                return res.status(404).send('Lesson or Course not found');
            }
            res.send("success");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Server error');
        });
});

appRouter.patch('/course/:courseID/lesson/:lessonID', (req, res) => {
    const { courseID, lessonID } = req.params;
    const updateFields = req.body;

    Course.findById(courseID)
        .then(course => {
            if (!course) {
                return res.status(404).send('Course not found');
            }

            const lesson = course.lessons.id(lessonID);
            if (!lesson) {
                return res.status(404).send('Lesson not found');
            }

            Object.keys(updateFields).forEach(key => {
                if (updateFields[key] !== undefined && key in lesson) {
                    lesson[key] = updateFields[key];
                }
            });

            return course.save();
        })
        .then(updatedCourse => {
            const updatedLesson = updatedCourse.lessons.id(lessonID);
            res.json(updatedLesson);
        })
        .catch(err => {
            console.error('Error updating lesson:', err);
            res.status(500).send('Server error');
        });
});

export default appRouter