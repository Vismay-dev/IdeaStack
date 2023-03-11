const router = require("express").Router();
const nodemailer = require("nodemailer");
const studentUser = require("../models/studentUser");
const project = require("../models/project");
const workshop = require("../models/workshop");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const multer = require("multer");
const cloudinary = require("cloudinary");
const Mentor = require("../models/mentor");

const fileStorageEngine = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

const request = require("request");

router.post("/sendUserQuery", (req, res) => {
  async function sendMail() {
    try {
      const transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          type: "OAuth2",
          user: "ideastackapp@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          accessToken: process.env.ACCESS_TOKEN,
          refreshToken: process.env.REFRESH_TOKEN,
        },
      });

      const mailOptions = {
        from: "IdeaStack <ideastackapp@gmail.com>",
        to: [req.body.mailId],
        bcc: ["vismaysuramwar@gmail.com"],
        subject: "Contacting IdeaStack",
        text: `
                Hey ${req.body.name} !
        
                Your message has been noted.
                Message: ${req.body.message}.
                We'll get back to you as soon as possible!
                
                Best Regards,
                Outreach, IdeaStack`,
        html: `
                <p>Hey ${req.body.name}!</p>
        
                <p>Your message has been noted.<br/>
                <h4>Message: "${req.body.message}".</h4>
                Thank you for showing interest in IdeaStack.<br/> 
                We'll get back to you as soon as possible!</p>
                
                <p>Best Regards,<br/>
                Outreach team, IdeaStack</p>
                <br/><br/>
                <img style = "width:152px; position:relative; margin:auto;" src="cid:ideastack@orgae.ee"/>
                `,
        attachments: [
          {
            fileName: "IdeaStack.jpg",
            path: "server/routes/IdeaStack.jpg",
            cid: "ideastack@orgae.ee",
          },
        ],
      };
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (err) {
      return err;
    }
  }

  sendMail()
    .then((result) => {
      res.send("Successfully sent Email !");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

//receives user data and registers user in database
//sends back user and token.
router.post("/register", async (req, res) => {
  try {
    let hash = await bcrypt.hash(req.body.password.trim(), 10);
    let existingUser = await studentUser.findOne({
      email: req.body.email.trim(),
    });
    if (existingUser) {
      res.status(400).send("This Email ID has already been registered.");
    } else {
      const newUser = new studentUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase().trim(),
        password: hash,
        isAdditionalMember: req.body.additionalMember,
        initialized: false,
        initializationStep: "pi",
        role: req.body.additionalMember ? req.body.role : null,
        projectId: req.body.additionalMember ? req.body.projId : null,
      });

      if (
        req.body.additionalMember &&
        req.body.uniqueCode &&
        req.body.uniqueCode != req.body.requiredUniqueCode
      ) {
        res.status(400).send("Invalid Unique Join Code...");
        return;
      }

      if (req.body.additionalMember) {
        const proj = await project.findById(req.body.projId);
        let chk = true;
        for (let k = 0; k < proj.team.length; k++) {
          console.log(req.body.uniqueCode);
          console.log(proj.team[k].uniqueJoinCode);
          if (
            parseInt(req.body.uniqueCode) ==
            parseInt(proj.team[k].uniqueJoinCode)
          ) {
            chk = false;
            proj.team[k].name = req.body.firstName + " " + req.body.lastName;
            proj.team[k].email = req.body.email;
            proj.team[k].role = req.body.role;
            proj.team[k].onboarded = true;
          }
        }
        if (chk) {
          console.log("here1");

          res.status(400).send("Invalid Unique Join Code...");
          return;
        } else {
          proj.markModified("team");
          await proj.save();
        }
      }
      console.log("here2");

      const user = await newUser.save().catch((err) => console.log(err));
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "2.5h",
      });
      console.log("- Logged In");
      console.log("here3");

      res.send({ user: user, userToken: token });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/checkCookie", async (req, res) => {
  try {
    const users = await studentUser.find();
    let chk = false;
    for (let i = 0; i < users.length; i++) {
      const decoded = await jwt.verify(
        req.body.cookieString,
        process.env.TOKEN_SECRET
      );
      const isMatch =
        JSON.stringify(users[i]._id) === JSON.stringify(decoded._id);
      if (isMatch) {
        let user = users[i];
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "2.5h",
        });
        console.log("- Logged In");
        chk = true;
        res.send({ user: user, userToken: token, isValid: true });
      }
    }
    if (!chk) {
      res.send("Invalid Cookie");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await studentUser.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    if (!user) {
      console.log("- User not found");
      res.status(401).send("User not found");
    } else {
      const isMatch = await bcrypt.compare(
        req.body.password.trim(),
        user.password
      );
      if (!isMatch) {
        console.log("- Incorrect password");
        res.status(401).send("Incorrect password");
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "2.5h",
        });

        const token2 = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "14d",
        });

        console.log("- Logged In");

        if (!user.mentorshipPackages || user.mentorshipPackages.length == 0) {
          user.mentorshipPackages = [];
          await user.save();
        }

        if (!req.body.rememberme) {
          let cookieNow = req.session.cookie;
          cookieNow.path = "www.ideastack.org/home";
          cookieNow.id = token2;
          cookieNow.expires = new Date(Date.now() + 900000);
          req.session.isAuth = true;
          res.send({
            user: user,
            userToken: token,
            cookieObj: {
              ...cookieNow,
              id: token2,
              expires: new Date(Date.now() + 900000),
            },
          });
        } else {
          res.send({ user: user, userToken: token });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/getMentorshipPackages", auth, async (req, res) => {
  const user = await studentUser.findOne({ _id: req.user._id });
  res.send(user.mentorshipPackages);
});

router.post("/sendResetCode", async (req, res) => {
  const user = await studentUser.findOne({
    email: req.body.mail.toLowerCase().trim(),
  });
  if (!user) {
    console.log("- User not found");
    res.status(401).send("User Email ID not found");
  } else {
    async function sendMail() {
      try {
        const transport = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            type: "OAuth2",
            user: "ideastackapp@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            accessToken: process.env.ACCESS_TOKEN,
            refreshToken: process.env.REFRESH_TOKEN,
          },
        });

        const mailOptions = {
          from: "IdeaStack <ideastackapp@gmail.com>",
          to: [user.email],
          subject: "Password Reset",
          text: `
                        Hey ${user.firstName},
            
                        Welcome Back to IdeaStack!
                        Requested Password Reset Code: ${req.body.code}.
                        Please use this code to access the privilege to reset your password. It will expire in 10 minutes
                        
                        Best Regards,
                        Outreach team, IdeaStack
                         `,
          html: `
                        <p>Hey ${user.firstName}!</p>
                
                        <h4>Welcome Back to IdeaStack!</h4>
                        Requested Password Reset Code: <strong>${req.body.code}</strong>.<br/> 
                        Please use this code to access the privilege to reset your password. It will expire in 10 minutes<br/>
                        
                        <p>Best Regards,<br/>
                        Outreach team, IdeaStack</p>
                        <br/><br/>
                        <img style = "width:152px; position:relative; margin:auto;" src="cid:ideastack@orgae.ee"/>
                        `,
          attachments: [
            {
              fileName: "IdeaStack.jpg",
              path: "server/routes/IdeaStack.jpg",
              cid: "ideastack@orgae.ee",
            },
          ],
        };
        const result = await transport.sendMail(mailOptions);
        return result;
      } catch (err) {
        return err;
      }
    }
    sendMail()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send("Code succesfully sent!");
  }
});

router.post("/resetPassword", async (req, res) => {
  try {
    const user = await studentUser.findOne({ email: req.body.email });
    let hash = await bcrypt.hash(req.body.pass.trim(), 10);
    user.password = hash;
    await user.save();
    res.send("Done succesfully");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//sends back user data based on token
router.post("/getUser", auth, async (req, res) => {
  try {
    const user = await studentUser.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/getUserView", async (req, res) => {
  try {
    const user = await studentUser.findById(req.body.token);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/updateUser", auth, async (req, res) => {
  try {
    const userPrev = await studentUser.findById(req.user._id);
    updateInfo = { ...req.body.user, password: userPrev.password };
    const newUser = await studentUser.findByIdAndUpdate(
      req.user._id,
      updateInfo
    );
    const updatedUser = await newUser.save();
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/uploadProfPic", upload.single("image"), async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  let id = decoded._id;
  const user = await studentUser.findOne({ userId: id });

  let file = req.file;
  var fileUrl;
  await cloudinary.v2.uploader
    .upload(file.path, { folder: "IdeaStack" }, (err, result) => {
      fileUrl = result.secure_url;
      console.log("File Uploaded");
    })
    .catch((err) => console.log(err.response));
  let userUpdated = await studentUser
    .findOneAndUpdate({ _id: id }, { profilePic: fileUrl })
    .catch((err) => console.log(err));
  let projects = await project
    .find({ _id: { $in: user.projects } })
    .catch((err) => console.log(err));
  for (let i = 0; i < projects.length; i++) {
    let proj = projects[i];
    for (let i = 0; i < proj.team.length; i++) {
      if (JSON.stringify(proj.team[i].id) === JSON.stringify(userUpdated._id)) {
        proj.team[i].pic = fileUrl;
        proj.markModified("team");
        if (i === 0) {
          proj.admin.pic = fileUrl;
        }
        proj.markModified("admin");
        await proj.save();
      }
    }
  }

  res.send(userUpdated);
});

router.post("/removeAvailableDate", auth, async (req, res) => {
  const mentor = await Mentor.findById(req.body.mentorID);
  mentor.availableDates = mentor.availableDates.filter((date) => {
    return String(new Date(date)) !== String(new Date(req.body.date));
  });

  mentor.markModified("availableDates");
  await mentor.save();
  res.send("Succesfully Booked A Time");
});

router.post("/onboardTeam", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const projId = user.projectId;
  const currProject = await project.findById(projId);

  for (let i = 0; i < req.body.team.length; i++) {
    let uniqueCode = Math.trunc(Math.random() * 100000);
    currProject.team.push({
      ...req.body.team[i],
      uniqueJoinCode: uniqueCode,
      onboarded: false,
    });

    sendMail(req.body.team[i], uniqueCode)
      .then(async (result) => {
        await currProject.save().catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });

        let updateInfo = {
          initialized: true,
        };

        const newUser = await studentUser
          .findOneAndUpdate({ _id: req.user._id }, updateInfo)
          .catch((err) => console.log(err));

        await newUser.save().catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });

        console.log(result);
        res.send(newUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  async function sendMail(teamMember, uniqueCodeParam) {
    try {
      const transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          type: "OAuth2",
          user: "ideastackapp@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          accessToken: process.env.ACCESS_TOKEN,
          refreshToken: process.env.REFRESH_TOKEN,
        },
      });

      const mailOptions = {
        from: "IdeaStack <ideastackapp@gmail.com>",
        to: teamMember.email,
        cc: [user.email],
        bcc: ["vismaysuramwar@gmail.com"],
        subject: "IdeaStack Team Onboarding - " + user.firstName,
        text: `
                Hey ${teamMember.name}!
        
                ${
                  user.firstName
                }, from your startup, has registered you & your team for mentorship
                on IdeaStack. You've been listed as a team-member with the role: ${
                  teamMember.role
                }
                
                Unique Registration Code: ${uniqueCodeParam}.

                Use the code above to access your team's mentorship dashboard & workspace. 

                Join using this link (unique link, will not work for any other user): https://ideastack.org/teamonboarding/${
                  teamMember.name
                }/${user.firstName + " " + user.lastName}/${currProject.name}

                Note: The link above is unique, and will not work for any other user. There are limited seats available for IdeaStack registration

                Reply to this mail if you face any issues; we'll get back to you as soon as possible!
                
                Best Regards,
                Admin, IdeaStack`,
        html: `
                <p>Hey ${teamMember.name}!</p>
        
                <p> ${
                  user.firstName
                }, from your startup, has registered you & your team for mentorship<br/>
                on IdeaStack. You've been listed as a team-member with the role: ${
                  teamMember.role
                }</p>
               
                <h4>Unique Registration Code: ${uniqueCodeParam}.</h4>

                <p>Use the code above to access your team's mentorship dashboard & workspace.</p>
                <p>Join using this link: <a href = 'https://ideastack.org/teamonboarding/${
                  teamMember.name
                }/${
          user.firstName + " " + user.lastName
        }'>https://ideastack.org/teamonboarding/${teamMember.name}/${
          user.firstName + " " + user.lastName
        }</a></p>
                
                <p> Note: The link above is unique, and will not work for any other user. There are limited seats available for IdeaStack registration, so sign-up soon! </p>

                <p> Reply to this mail if you face any issues; we'll get back to you as soon as possible! </p>

                <p>Best Regards,<br/>
                 Admin, IdeaStack</p>
                <br/>
                <img style = "width:152px; position:relative; margin:auto;" src="cid:ideastack@orgae.ee"/>
                `,
        attachments: [
          {
            fileName: "IdeaStack.jpg",
            path: "server/routes/IdeaStack.jpg",
            cid: "ideastack@orgae.ee",
          },
        ],
      };
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (err) {
      return err;
    }
  }

  // update the project document
  // complete user initialization
});

router.post("/createProject", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const userName = user.firstName + " " + user.lastName;
  const projectData = req.body.project;

  let newProject = new project({
    name: projectData.name,
    category: projectData.category,
    maxCap: projectData.maxCap,
    problem: projectData.problem,
    mentorsMatched: [],
    mentorshipDetails: [],
    admin: {
      name: userName,
      id: req.user._id,
    },
    team: [
      {
        name: userName,
        id: req.user._id,
        role: projectData.adminRole,
      },
    ],
    projPic: projectData.projPic,
  });

  newProject = await newProject.save().catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });

  updateInfo = {
    projectId: newProject._id,
    initializationStep: "otm",
    role: projectData.adminRole,
  };

  const newUser = await studentUser
    .findOneAndUpdate({ _id: req.user._id }, updateInfo)
    .catch((err) => console.log(err));
  const updatedUser = await newUser.save().catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });

  res.send(updatedUser);
});

router.post("/getUserProject", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const userProjectId = user.projectId;
  const userProject = await project.findById(userProjectId);
  res.send(userProject);
});

router.post("/getUserProjectsView", async (req, res) => {
  const user = await studentUser.findById(req.body.token);
  const userProjects = user.projects;
  const projects = await project.find({ _id: { $in: userProjects } });
  res.send(projects);
});

router.post("/getAllProjects", auth, async (req, res) => {
  const projects = await project.find();
  res.send(projects);
});

router.post("/getWorkshops", auth, async (req, res) => {
  const workshops = await workshop.find();
  res.send(workshops);
});

router.post("/getWorkshop", auth, async (req, res) => {
  const workshopSearched = await workshop.findById(req.body.workshopId);
  res.send(workshopSearched);
});

router.post("/getWorkshopsOngoing", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  workshops = [];
  for (let i = 0; i < user.workshopsOngoing.length; i++) {
    const ws = await workshop.findById(JSON.parse(user.workshopsOngoing[i]));
    workshops.push(ws);
  }
  res.send(workshops);
});

router.post("/getCommonCourseTeammates", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const userCourses = user.workshopsOngoing;
  const teamMates = [];
  for (let i = 0; i < user.projects.length; i++) {
    let proj = await project.findById(user.projects[i]);
    if (proj) {
      for (let j = 0; j < proj.team.length; j++) {
        if (JSON.stringify(proj.team[j].id) !== JSON.stringify(req.user._id))
          teamMates.push(JSON.stringify(proj.team[j].id));
      }
    }
  }

  let comm = [];

  for (let i = 0; i < userCourses.length; i++) {
    let course = await workshop.findById(JSON.parse(userCourses[i]));
    for (let j = 0; j < course.currentMentees.length; j++) {
      if (teamMates.includes(JSON.stringify(course.currentMentees[j]))) {
        const teamMate = await studentUser.findOne({
          _id: course.currentMentees[j],
        });
        comm.push({
          courseName: course.title,
          courseId: course._id,
          teamMateId: course.currentMentees[j],
          teamMateName: teamMate.firstName,
          teamMatePic: teamMate.profilePic,
        });
      }
    }
  }

  res.send(comm);
});

router.post("/getAllUsers", auth, async (req, res) => {
  const users = await studentUser.find();
  res.send(users);
});

router.post("/getAllProjectsAdmin", async (req, res) => {
  const projects = await project.find();
  res.send(projects);
});

router.post("/uploadPic", upload.single("image"), async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  let id = decoded._id;
  try {
    let file = req.file;
    var fileUrl;
    await cloudinary.v2.uploader
      .upload(file.path, { folder: "IdeaStack" }, (err, result) => {
        console.log(err ? err : result);
        fileUrl = result.secure_url;
        console.log("File Uploaded");
      })
      .catch((err) => console.log(err.response));

    res.send(fileUrl);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/uploadPicAdmin", upload.single("image"), async (req, res) => {
  let file = req.file;
  var fileUrl;
  await cloudinary.v2.uploader
    .upload(file.path, { folder: "IdeaStack" }, (err, result) => {
      fileUrl = result.secure_url;
      console.log("File Uploaded");
    })
    .catch((err) => console.log(err.response));

  res.send(fileUrl);
});

router.post("/createJoinRequest", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let date = new Date();
  proj.joinRequests = proj.joinRequests
    ? [...proj.joinRequests, { ...req.body.application, dateReceived: date }]
    : [{ ...req.body.application, dateReceived: date }];

  const user = await studentUser.findById(req.user._id);
  user.joinRequests = user.joinRequests
    ? [...user.joinRequests, { ...req.body.application, dateReceived: date }]
    : [{ ...req.body.application, dateReceived: date }];

  let io = req.io;

  await io.emit("sentApplication", {
    user: user,
    id: req.body.projectID,
  });

  user.save();
  proj.save();

  const projAdmin = await studentUser.findOne({ _id: proj.admin.id });

  let notifications = projAdmin.notifications ? projAdmin.notifications : [];
  notifications.push({
    seen: false,
    type: "application",
    title: "New Join Request",
    subtitle: user.firstName + " sent an application to join " + proj.name,
    icon: user.profilePic,
  });
  projAdmin.notifications = notifications;
  await projAdmin.markModified("notifications");
  await projAdmin.save();

  res.send("Join Request Succesfully Sent!");
});

router.post("/getLatestPendingPayment", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const pendingPayments = user.pendingPayments;
  try {
    for (let i = 0; i < pendingPayments.length; i++) {
      if (pendingPayments[i].projectID === req.body.projectID) {
        res.send({
          payment: parseFloat(
            pendingPayments[i].amounts[pendingPayments[i].amounts.length - 1]
          ),
        });
        return;
      }
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

router.post("/getNotifications", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  res.send(user.notifications);
});

router.post("/updateNotifications", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  user.notifications = req.body.notifs;
  await studentUser.updateOne(
    { _id: user._id },
    { notifications: req.body.notifs }
  );
  res.send(user.notifications);
});

router.post("/completeLatestPendingPayment", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const pendingPayments = user.pendingPayments;
  let amnt = 0;
  for (let i = 0; i < pendingPayments.length; i++) {
    if (pendingPayments[i].projectID === req.body.projectID) {
      amnt = user.pendingPayments[i].amounts.splice(0, 1);
      user.pendingPayments[i].totalAmountForThisProject =
        user.pendingPayments[i].totalAmountForThisProject - amnt;
    }
  }

  user.markModified("pendingPayments");
  await user.save();
  let io = req.io;
  proj = await project.findOne({ _id: req.body.projectID });
  proj.mentorshipPackages[proj.mentorshipPackages.length - 1].pendingAmount -=
    amnt;
  if (
    proj.mentorshipPackages[proj.mentorshipPackages.length - 1].pendingAmount ==
    0
  ) {
    proj.mentorshipPackages[
      proj.mentorshipPackages.length - 1
    ].paymentPending = false;

    await io.emit("memberPaid", {
      user: user,
      mentorPackage:
        proj.mentorshipPackages[proj.mentorshipPackages.length - 1],
      project: proj,
      allPaymentsCompleted: true,
    });
  } else {
    await io.emit("memberPaid", {
      user: user,
      mentorPackage:
        proj.mentorshipPackages[proj.mentorshipPackages.length - 1],
      project: proj,
    });
  }

  for (let i = 0; i < proj.team.length; i++) {
    if (JSON.stringify(user._id) !== JSON.stringify(proj.team[i].id)) {
      let member = await studentUser.findOne({ _id: proj.team[i].id });
      let notifications = member.notifications ? member.notifications : [];
      notifications.push({
        seen: false,
        type: "member paid",
        title: "Payment by " + user.firstName + " completed!",
        subtitle:
          user.firstName +
          " paid for package with " +
          proj.mentorshipPackages[proj.mentorshipPackages.length - 1].name,
        icon: proj.mentorshipPackages[proj.mentorshipPackages.length - 1].pic,
      });

      member.notifications = notifications;
      await member.markModified("notifications");
      await member.save();
    }
  }

  proj.markModified("mentorshipPackages");
  await proj.save();

  for (let i = 0; i < proj.team.length; i++) {
    let member = proj.team[i];
    if (JSON.stringify(member.id) === JSON.stringify(req.user._id)) {
      if (
        Number(member.pendingPayments[member.pendingPayments.length - 1]) ===
        Number(amnt)
      ) {
        proj.team[i].pendingPayments[
          proj.team[i].pendingPayments.length - 1
        ] = 0;
      }
    }
  }

  proj.markModified("team");
  await proj.save();

  let mentorshipDetails = proj.mentorshipDetails;

  for (let i = 0; i < mentorshipDetails.length; i++) {
    let mentorName = mentorshipDetails[i].name;
    if (
      mentorName ===
      proj.mentorshipPackages[proj.mentorshipPackages.length - 1].name
    ) {
      let newObj = mentorshipDetails[i];
      newObj.paymentMade = Number(newObj.paymentMade) + Number(amnt);
      newObj.paymentPending = Number(newObj.paymentPending) - Number(amnt);
      mentorshipDetails[i] = newObj;
    }
  }

  proj.mentorshipDetails = mentorshipDetails;

  proj.markModified("mentorshipDetails");
  await proj.save();

  res.send("Payment Completed!");
});

// router.post("/updateLatestPendingSession", auth, async (req, res) => {
//   proj = await project.findOne({ _id: req.body.projectID });
//   mentorshipPackage = proj.mentorshipPackages[0];
//   if (mentorshipPackage.pendingAmount == 0) {
//     proj.mentorshipPackages[0] = { ...mentorshipPackage, ...req.body.updated };
//   }

//   proj.markModified("mentorshipPackages");
//   await proj.save();

//   res.send("Request Sent!");
// });

// router.post("/updateLatestPendingSessionAdmin", async (req, res) => {
//   proj = await project.findOne({ _id: req.body.projectID });
//   mentorshipPackage = proj.mentorshipPackages[0];
//   if (mentorshipPackage.pendingAmount == 0) {
//     proj.mentorshipPackages[0] = { ...mentorshipPackage, ...req.body.updated };
//   }

//   let io = req.io;
//   await io.emit("packageApproved", {
//     project: proj,
//     package: mentorshipPackage,
//     id: req.body.projectID,
//   });

//   proj.markModified("mentorshipPackages");
//   await proj.save();

//   for (let i = 0; i < proj.team.length; i++) {
//     let member = await studentUser.findOne({ _id: proj.team[i].id });
//     let notifications = member.notifications ? member.notifications : [];
//     notifications.push({
//       seen: false,
//       type: "package",
//       title: "Mentorship Package Approved!",
//       subtitle: mentorshipPackage.name + "  - Mentorship Schedule",
//       icon: mentorshipPackage.pic,
//     });

//     member.notifications = notifications;
//     await member.markModified("notifications");
//     await member.save();
//   }

//   res.send("Request Sent!");
// });

router.post("/getProjectsPaid", async (req, res) => {
  const proj = await project.find({});
  let projectsPaid = [];
  for (let i = 0; i < proj.length; i++) {
    for (let j = 0; j < proj[i].mentorshipPackages.length; j++) {
      if (
        proj[i].mentorshipPackages[i].paymentPending === false &&
        proj[i].mentorshipPackages[i].sessionScheduled === false
      ) {
        projectsPaid.push(proj[i]);
      }
    }
  }

  res.send(projectsPaid);
});

router.post("/getProject", auth, async (req, res) => {
  const proj = await project.findById(req.body.projId);
  res.send(proj);
});

router.post("/getProjectMember", async (req, res) => {
  const projects = await project.find();
  let proj;
  for (let j = 0; j < projects.length; j++) {
    if (
      String(projects[j]["name"]).toLowerCase() ==
      req.body.projectName.toLowerCase()
    ) {
      proj = projects[j];
    }
  }
  let member = null;

  for (let i = 0; i < proj.team.length; i++) {
    if (proj.team[i].name.toLowerCase() == req.body.memberName.toLowerCase()) {
      member = {
        fullName: proj.team[i].name,
        email: proj.team[i].email,
        role: proj.team[i].role,
        projId: proj._id,
        uniqueCode: proj.team[i].uniqueJoinCode,
      };
    }
  }

  res.send(member);
});

router.post("/modifyMentorAdmin", async (req, res) => {
  const updateInfo = req.body.mentor;
  const newMentor = await Mentor.findByIdAndUpdate(req.body.id, updateInfo);
  newMentor.save();

  const projects = await project.find();

  for (let x = 0; x < projects.length; x++) {
    for (let y = 0; y < projects[x].mentorshipPackages.length; y++) {
      if (
        JSON.stringify(projects[x].mentorshipPackages[y]._id) ===
        JSON.stringify(newMentor._id)
      ) {
        projects[x].mentorshipPackages[y] = {
          ...projects[x].mentorshipPackages[y],
          ...updateInfo,
        };
        projects[x].markModified("mentorshipPackages");
        projects[x].save();
      }
    }
  }

  res.send("Succesfully Modified Mentor");
});

router.post("/requestMentor", auth, async (req, res) => {
  const user = await studentUser.findOne({ _id: req.user._id });
  const mentor = await workshop.findOne({
    _id: JSON.parse(req.body.workshopId),
  });
  const proj = await project.findById(req.body.projectId);

  if (proj.mentorsRequested && proj.mentorsRequested.length > 0) {
    proj.mentorsRequested.push(JSON.parse(req.body.workshopId));
  } else {
    proj.mentorsRequested = [JSON.parse(req.body.workshopId)];
  }

  await proj.markModified("mentorsRequested");
  await proj.save();

  mentor.mentorshipRequests.push(proj._id);
  await mentor.markModified("mentorshipRequests");
  await mentor.save();

  res.send(proj);
});

router.post("/addMentorAdmin", async (req, res) => {
  const newMentor = new Mentor({
    name: req.body.name,
    background: req.body.background,
    pricing: req.body.pricing,
    strengths: req.body.strengths,
    role: req.body.role,
    contact: req.body.contact,
    pic: req.body.pic,
    mentorshipProp: req.body.mentorshipProp,
    availableDates: req.body.availableDates,
  });
  const mentor = await newMentor.save();

  res.send("Succesfully Added Mentor");
});

module.exports = router;
