const express = require('express');
const studentControllers = require('../controllers/studentControllers');
const router = express.Router();

router.param('adm', studentControllers.checkAdm);

router
  .route('/')
  .get(studentControllers.getAllStudents)
  .post(studentControllers.checkBody, studentControllers.createStudent);
router
  .route('/:adm')
  .get(studentControllers.getStudent)
  .patch(studentControllers.updateStudent)
  .delete(studentControllers.deleteStudent);

module.exports = router;
