const fs = require('fs');

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/students.json`)
);

exports.checkAdm = (req, res, next) => {
  if (+req.params.adm > students.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Student not found',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.gender) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or gender',
    });
  }
  next();
};

exports.getAllStudents = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      students,
    },
  });
};

exports.createStudent = (req, res) => {
  const newAdm = students[students.length - 1].admission + 1;
  const newStudent = Object.assign({ admission: newAdm }, req.body);

  students.push(newStudent);

  fs.writeFile(
    `${__dirname}/../data/students.json`,
    JSON.stringify(students),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          students,
        },
      });
    }
  );
};

exports.getStudent = (req, res) => {
  const student = students.find((el) => el.admission === +req.params.adm);
  res.status(200).json({
    status: 'Success',
    data: {
      student,
    },
  });
};

exports.updateStudent = (req, res) => {
  const student = students.find((el) => el.admission === +req.params.adm);
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name',
    });
  } else if (!req.body.gender) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or gender',
    });
  }

  const updatedStudent = Object.assign(student, req.body);

  fs.writeFile(
    `${__dirname}/../data/students.json`,
    JSON.stringify(students),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          updatedStudent,
        },
      });
    }
  );
};

exports.deleteStudent = (req, res) => {
  const student = students.find((el) => el.admission === +req.params.adm);
  const indexStudent = students.indexOf(student);
  students.splice(indexStudent, 1);
  fs.writeFile(
    `${__dirname}/../data/students.json`,
    JSON.stringify(students),
    () => {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  );
};
