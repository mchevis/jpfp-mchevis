const router = require("express").Router();
const { Student, Campus } = require("../db").models;

// GET /api/students
router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Student.findAll({
        order: [["lastName"], ["firstName"]],
      })
    );
  } catch (err) {
    next(err);
  }
});

// GET /api/students/:id
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Student.findOne({ where: { id: req.params.id } }));
  } catch (error) {
    next(error);
  }
});

// POST /api/students
router.post("/", async (req, res, next) => {
  try {
    //keeping the placeholder image in case the form was submitted with no image
    const newStudent =
      req.body.image === ""
        ? { ...req.body, image: "/placeholder-image-person-jpg.jpeg" }
        : req.body;
    const student = await Student.create(newStudent);
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/students/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    student.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// PUT /api/students/:id
router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    //updating the entire student to be able to use this route to update any property
    student.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
