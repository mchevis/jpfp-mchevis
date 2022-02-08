const router = require("express").Router();
const { Student, Campus } = require("../db").models;

// GET /api/campuses
router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Campus.findAll({
        order: [["name"]],
      })
    );
  } catch (err) {
    next(err);
  }
});

// GET /api/campuses/:id
router.get("/:id", async (req, res, next) => {
  try {
    res.send(
      await Campus.findOne({
        where: { id: req.params.id },
      })
    );
  } catch (error) {
    next(error);
  }
});

// POST /api/campuses
router.post("/", async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
    res.send(campus);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/campuses/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    campus.destroy();

    //remove enrollments for deleted campusees
    const campusStudents = await Student.findAll({
      where: { campusId: req.params.id },
    });
    campusStudents.map((s) => s.update({ campusId: null }));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// PUT /api/campuses/:id
router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    //updating the entire student to be able to use this route to update any property
    campus.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
