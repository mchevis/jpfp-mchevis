const faker = require("faker");
const conn = require("./conn");
const Student = require("./student");
const Campus = require("./campus");

//associations
Student.belongsTo(Campus);
Campus.hasMany(Student);

//sync & seed
const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    //campuses
    const [mit, harvard, yale] = await Promise.all(
      ["MIT", "Harvard", "Yale"].map((c, idx) =>
        Campus.create({
          name: c,
          address: `${idx} ${c} road`,
          description: new Array(50).fill(c).join(" "),
        })
      )
    );

    const campuses = new Array(10).fill("").map((_) => {
      return {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        description: faker.lorem.paragraph(),
      };
    });
    await Promise.all(campuses.map((c) => Campus.create(c)));

    //MIT logo
    mit.image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1280px-MIT_logo.svg.png";
    mit.save();

    //students
    await Promise.all([
      Student.create({
        firstName: "Marina",
        lastName: "Chevis",
        email: "mchevis@mit.edu",
        gpa: 3.8,
        campusId: mit.id,
      }),
      Student.create({
        firstName: "Jane",
        lastName: "Doe",
        email: "jdoe@harvard.edu",
        gpa: 2.6,
        // campusId: harvard.id,
      }),
      Student.create({
        firstName: "Jeff",
        lastName: "Bezos",
        email: "jbezos@yale.edu",
        gpa: 2.2,
        campusId: yale.id,
        image:
          "https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg",
      }),
    ]);

    function getRandomInt() {
      min = 0.0;
      max = 4.0;
      return (Math.random() * (max - min) + min).toFixed(1); //The maximum is exclusive and the minimum is inclusive
    }

    function getRandomCampusId() {
      min = 1;
      max = 13;
      return Math.floor(Math.random() * (max - min) + min);
    }

    const students = new Array(10).fill("").map((_) => {
      return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gpa: getRandomInt(),
        campusId: getRandomCampusId(),
      };
    });
    await Promise.all(students.map((s) => Student.create(s)));

    console.log(`
          
          
              Seeding successful!
          
          
          `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Student,
    Campus,
  },
};
