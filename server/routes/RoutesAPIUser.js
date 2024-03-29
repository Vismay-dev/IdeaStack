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
const dotenv = require("dotenv");

dotenv.config();

var Mixpanel = require("mixpanel");

const https = require("https");

const Agenda = require("agenda");
const agenda = new Agenda({
  db: {
    address:
      "mongodb+srv://Vismay3003:Momdad123@cluster0.kuil0.mongodb.net/?retryWrites=true&w=majority",
    collection: "newNotification",

    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  processEvery: "40 seconds",
});

const fileStorageEngine = multer.diskStorage({
  filename: function (req, file, cb) {
    filepath = Date.now();

    const mimeType = file.mimetype.split("/");
    var fileType = mimeType[1];
    if (fileType == "vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      fileType = "xlsx";
    } else if (fileType == "text/plain") {
      fileType = "txt";
    } else if (fileType == "text/csv") {
      fileType = "csv";
    } else if (fileType == "vnd.ms-excel") {
      fileType = "xls";
    } else if (
      fileType == "vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      fileType = "docx";
    } else if (fileType == "msword") {
      fileType = "doc";
    } else if (
      fileType ==
      "vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      fileType = "pptx";
    } else if (fileType == "vnd.ms-powerpoint") {
      fileType = "ppt";
    }

    const fileName = filepath + "." + fileType;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

var mixpanel = Mixpanel.init(process.env.MIXPANELTOKEN);

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
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com "],
        subject: "Contacting IdeaStack - Query",
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
        isAdditionalMember: req.body.additionalMember || req.body.uniqueCode,
        initialized: false,
        initializationStep: "pi",
        role: req.body.additionalMember ? req.body.role : null,
        projectId: req.body.additionalMember ? req.body.projId : null,
      });

      console.log(req.body);

      if (
        req.body.additionalMember &&
        req.body.uniqueCode &&
        Number(req.body.uniqueCode) !== Number(req.body.requiredUniqueCode)
      ) {
        res.status(400).send("Invalid Unique Join Code...");
        return;
      }

      const proj = await project.findById(req.body.projId);
      if (req.body.additionalMember) {
        let chk1 = true;
        let chk2 = true;

        mixpanel.track("Signed Up", {
          distinct_id: newUser._id,
          "Signup Type": "Additional Member",
        });

        for (let k = 0; k < proj.team.length; k++) {
          if (
            Number(req.body.uniqueCode) === Number(proj.team[k].uniqueJoinCode)
          ) {
            chk1 = false;
            if (proj.team[k].onboarded === false) {
              chk2 = false;
            }
            proj.team[k].name = req.body.firstName + " " + req.body.lastName;
            proj.team[k].email = req.body.email;
            proj.team[k].role = req.body.role;
            proj.team[k].onboarded = true;
          }
        }

        if (chk1) {
          res.status(400).send("Invalid Unique Join Code...");
          return;
        } else if (chk2) {
          res.status(400).send("Member Already Onboarded...");
          return;
        } else {
          async function sendOnboardedMail() {
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
                to: [proj.team[0].email],
                bcc: [],
                subject: `${req.body.firstName} has joined IdeaStack.org!`,
                text: `
                        Hey ${proj.team[0].firstName}!
                
                        Your team-member, ${req.body.firstName}, has onboarded your venture (${proj.name}) @ IdeaStack.org.
                        
                        We hope to take you and your team to new heights through mentorship!
                        Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.
    
                        Contact us if you face any issues- our team prioritizes your experience above all else.
                        
                        Best Regards,
                        Admin Team, IdeaStack`,
                html: `
                        <p>Hey ${proj.team[0].firstName}!</p>
                
                        <p>Your team-member, ${req.body.firstName}, has onboarded your venture (${proj.name}) @ IdeaStack.org.<br/>
                        <h4>We hope to take you and your team to new heights through mentorship!.</h4>
                        Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.<br/> 
                        Contact us if you face any issues- our team prioritizes your experience above all else.
                        </p>
                        
                        <p>Best Regards,<br/>
                        Admin Team, IdeaStack</p>
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

          sendOnboardedMail()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });

          proj.markModified("team");
          await proj.save();
        }
      } else if (proj && proj.team && proj.team.length === 1) {
        proj.teamOnboarded = true;
        proj.markModified("teamOnboarded");
        await proj.save();
        mixpanel.track("Signed Up", {
          distinct_id: newUser._id,
          "Signup Type": "Team Initiator",
        });
      } else {
        mixpanel.track("Signed Up", {
          distinct_id: newUser._id,
          "Signup Type": "Team Initiator",
        });
      }

      async function sendRegistrationMail() {
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
            to: [newUser.email],
            bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
            subject: `${newUser.firstName}, Welcome to IdeaStack!`,
            text: `
                    Hey ${newUser.firstName}!
            
                    Welcome to IdeaStack.org.
                    
                    We hope to take you and your team ${
                      proj ? `@ ${proj.name} ` : ""
                    }to new heights through mentorship!
                    Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.

                    Contact us if you face any issues- our team prioritizes your experience above all else.
                    
                    Best Regards,
                    Admin Team, IdeaStack`,
            html: `
                    <p>Hey ${newUser.firstName}!</p>
            
                    <p> Welcome to IdeaStack.org.<br/>
                    <h4>We hope to take you and your team ${
                      proj ? `@ ${proj.name} ` : ""
                    }to new heights through mentorship!</h4>
                    Explore our portfolio of mentors and request a mentor based on your specific needs; we will take your requests into consideration while matching you with a mentor.<br/> 
                    Contact us if you face any issues- our team prioritizes your experience above all else.
                    </p>
                    
                    <p>Best Regards,<br/>
                    Admin Team, IdeaStack</p>
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

      sendRegistrationMail()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });

      const user = await newUser.save().catch((err) => console.log(err));
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "2.5h",
      });
      console.log("- Logged In");
      console.log("here3");

      res.send({ user: user, userToken: token });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/registerWithGoogle", async (req, res) => {
  await https
    .get(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        req.body.oauthObj.access_token,
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          let userDetails = JSON.parse(data);
          regUser(userDetails);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
      return;
    });

  const regUser = async (details) => {
    let existingUser = await studentUser.findOne({
      email: details.email.trim(),
    });

    if (existingUser) {
      console.log(existingUser);
      res.status(400).send("This Email ID has already been registered.");
    } else {
      const newUser = new studentUser({
        firstName:
          details.given_name.substring(0, 1).toUpperCase() +
          details.given_name.substring(1),
        lastName:
          details.family_name.substring(0, 1).toUpperCase() +
          details.family_name.substring(1),
        email: details.email.toLowerCase().trim(),
        isAdditionalMember: req.body.additionalMember || req.body.uniqueCode,
        initialized: false,
        initializationStep: "pi",
        role: req.body.additionalMember ? req.body.role : null,
        projectId: req.body.additionalMember ? req.body.projId : null,
      });

      if (
        req.body.additionalMember &&
        req.body.uniqueCode &&
        Number(req.body.uniqueCode) !== Number(req.body.requiredUniqueCode)
      ) {
        res.status(400).send("Invalid Unique Join Code...");
        return;
      }

      const proj = await project.findById(req.body.projId);

      if (req.body.additionalMember) {
        let chk1 = true;
        let chk2 = true;

        for (let k = 0; k < proj.team.length; k++) {
          if (
            Number(req.body.uniqueCode) === Number(proj.team[k].uniqueJoinCode)
          ) {
            chk1 = false;
            if (proj.team[k].onboarded === false) {
              chk2 = false;
            }
            proj.team[k].name =
              details.given_name.substring(0, 1).toUpperCase() +
              details.given_name.substring(1) +
              " " +
              details.family_name.substring(0, 1).toUpperCase() +
              details.family_name.substring(1);
            proj.team[k].email = details.email;
            proj.team[k].role = req.body.role;
            proj.team[k].onboarded = true;
          }
        }

        if (chk1) {
          res.status(400).send("Invalid Unique Join Code...");
          return;
        } else if (chk2) {
          res.status(400).send("Member Already Onboarded...");
          return;
        } else {
          async function sendOnboardedMail() {
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
                to: [proj.team[0].email],
                bcc: [],
                subject: `${req.body.firstName} has joined IdeaStack.org!`,
                text: `
                        Hey ${proj.team[0].firstName}!
                
                        Your team-member, ${proj.team[0].firstName}, has onboarded your venture (${proj.name}) @ IdeaStack.org.
                        
                        We hope to take you and your team to new heights through mentorship!
                        Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.
    
                        Contact us if you face any issues- our team prioritizes your experience above all else.
                        
                        Best Regards,
                        Admin Team, IdeaStack`,
                html: `
                        <p>Hey ${proj.team[0].firstName}!</p>
                
                        <p>Your team-member, ${req.body.firstName}, has onboarded your venture (${proj.name}) @ IdeaStack.org.<br/>
                        <h4>We hope to take you and your team to new heights through mentorship!.</h4>
                        Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.<br/> 
                        Contact us if you face any issues- our team prioritizes your experience above all else.
                        </p>
                        
                        <p>Best Regards,<br/>
                        Admin Team, IdeaStack</p>
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

          sendOnboardedMail()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send(err);
            });

          mixpanel.track("Signed Up", {
            distinct_id: newUser._id,
            "Signup Type": "Additional Member",
          });

          proj.markModified("team");
          await proj.save();
        }
      } else if (proj && proj.team && proj.team.length === 1) {
        proj.teamOnboarded = true;
        proj.markModified("teamOnboarded");
        await proj.save();
        mixpanel.track("Signed Up", {
          distinct_id: newUser._id,
          "Signup Type": "Team Initiator",
        });
      } else {
        mixpanel.track("Signed Up", {
          distinct_id: newUser._id,
          "Signup Type": "Team Initiator",
        });
      }

      console.log("here2");

      async function sendRegistrationMail() {
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
            to: [newUser.email],
            bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
            subject: `${newUser.firstName}, Welcome to IdeaStack!`,
            text: `
                    Hey ${newUser.firstName}!
            
                    Welcome to IdeaStack.org.
                    
                    We hope to take you and your team ${
                      proj ? `@ ${proj.name} ` : ""
                    }to new heights through mentorship!
                    Explore our portfolio of mentors and request a mentor based on your specific needs; our team will take your requests into consideration while matching you with a mentor.

                    Contact us if you face any issues- our team prioritizes your experience above all else.
                    
                    Best Regards,
                    Admin Team, IdeaStack`,
            html: `
                    <p>Hey ${newUser.firstName}!</p>
            
                    <p> Welcome to IdeaStack.org.<br/>
                    <h4>We hope to take you and your team ${
                      proj ? `@ ${proj.name} ` : ""
                    }to new heights through mentorship!.</h4>
                    Explore our portfolio of mentors and request a mentor based on your specific needs; we will take your requests into consideration while matching you with a mentor.<br/> 
                    Contact us if you face any issues- our team prioritizes your experience above all else.
                    </p>
                    
                    <p>Best Regards,<br/>
                    Admin Team, IdeaStack</p>
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

      sendRegistrationMail()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
          return;
        });

      const user = await newUser.save().catch((err) => console.log(err));
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "2.5h",
      });
      console.log("- Logged In");

      res.send({ user: user, userToken: token });
    }
  };
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
      if (!user.password) {
        res.status(400).send("Sign in with Google...");
        return;
      }
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

        if (!req.body.rememberme) {
          let cookieNow = req.session.cookie;
          cookieNow.path = "www.ideastack.org/home";
          cookieNow.id = token2;
          cookieNow.expires = new Date(Date.now() + 900000);
          req.session.isAuth = true;
          mixpanel.track("Log In", {
            distinct_id: user._id,
          });
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
          mixpanel.track("Log In", {
            distinct_id: user._id,
          });
          res.send({ user: user, userToken: token });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/googleLogin", async (req, res) => {
  await https
    .get(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        req.body.oauthObj.access_token,
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          let userDetails = JSON.parse(data);
          logUserIn(userDetails);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
      return;
    });

  const logUserIn = async (userDetails) => {
    const user = await studentUser.findOne({
      email: userDetails.email.toLowerCase().trim(),
    });
    if (!user) {
      console.log("- User not found");
      res.status(401).send("User not found - google");
      return;
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "2.5h",
      });

      const token2 = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "14d",
      });

      console.log("- Logged In");

      if (!req.body.rememberme) {
        let cookieNow = req.session.cookie;
        cookieNow.path = "www.ideastack.org/home";
        cookieNow.id = token2;
        cookieNow.expires = new Date(Date.now() + 900000);
        req.session.isAuth = true;
        mixpanel.track("Log In", {
          distinct_id: user._id,
        });
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
        mixpanel.track("Log In", {
          distinct_id: user._id,
        });
        res.send({ user: user, userToken: token });
      }
    }
  };
});

router.post("/loginMentor", async (req, res) => {
  try {
    const user = await workshop.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    if (!user) {
      console.log("- User not found");
      res.status(401).send("User not found");
    } else {
      const isMatch =
        Number(req.body.uniqueCode.trim()) == Number(user.uniqueCode);

      if (!isMatch) {
        console.log("- Incorrect Unique Code");
        res.status(401).send("Incorrect Unique Code");
      } else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "2.5h",
        });

        const token2 = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "14d",
        });

        console.log("- Logged In");

        if (!req.body.rememberme) {
          let cookieNow = req.session.cookie;
          cookieNow.path = "www.ideastack.org/mentor";
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

router.post("/getUserByMail", auth, async (req, res) => {
  try {
    const user = await studentUser.findOne({ email: req.body.email });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/getUserForMentor", auth, async (req, res) => {
  try {
    idString = "";
    if (
      req.body.teamMember.firstName !== null ||
      req.body.teamMember.lastName !== null
    ) {
      idString = req.body.teamMember._id;
    } else {
      idString = req.body.teamMember;
    }

    const user = await studentUser.findById(idString);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/getMentor", auth, async (req, res) => {
  try {
    const user = await workshop.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/getUserView", async (req, res) => {
  try {
    const user = await studentUser.findOne({ email: req.body.token });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/updateUser", auth, async (req, res) => {
  const userPrev = await studentUser.findById(req.user._id);
  updateInfo = { ...req.body.user, password: userPrev.password };

  const newUser = await studentUser.findByIdAndUpdate(req.user._id, updateInfo);
  const updatedUser = await newUser.save();

  const proj = await project.findById(userPrev.projectId);

  if (
    req.body.flagTeamOnboarding ||
    updateInfo.initialized ||
    userPrev.isAdditionalMember
  ) {
    let teamChk = true;

    for (let i = 0; i < proj.team.length; i++) {
      let currTeamMember = await studentUser.findOne({
        email: proj.team[i].email,
      });
      if (currTeamMember && currTeamMember.initialized === false) {
        teamChk = false;
      }
      if (currTeamMember == null) {
        teamChk = false;
      }
    }

    if (teamChk === true) {
      const newProj = await project.findByIdAndUpdate(proj._id, {
        teamOnboarded: true,
      });
      const updatedProj = await newProj.save();
    }
  }

  console.log({ ...userPrev, ...updateInfo });
  return res.send({ ...userPrev, ...updateInfo });
});

router.post("/updateMentor", auth, async (req, res) => {
  try {
    const userPrev = await workshop.findById(req.user._id);
    let updateInfoMentor = {
      ...req.body.mentor,
      uniqueCode: userPrev.uniqueCode,
    };

    const newMentor = await workshop.findByIdAndUpdate(
      req.user._id,
      updateInfoMentor
    );
    let updatedMentor = await newMentor.save();

    if (req.body.acceptRequest && req.body.acceptRequest === true) {
      // project id: latest index in req.body.mentor.acceptedRequests[req.body.acceptRequestIndex]

      const proj = await project.findById(
        req.body.mentor.acceptedRequests[req.body.acceptRequestIndex]
      );

      async function sendRequestAcceptedMail() {
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
            to: [...proj.team.map((teamMember) => teamMember.email)],
            bcc: [],
            subject: `Mentorship Request Accepted - ${req.body.mentor.name} @ IdeaStack.org`,
            text: `
                    Hey, Entrepreneurs @ ${proj.name}!

                    IdeaStack mentor ${req.body.mentor.name} has accepted your mentorship request.

                    We'll be taking this acceptance into consideration while matching you with a mentor!
                    Sign-in to IdeaStack.org, and make more requests to mentors that interest you- this will increase the likelihood that you're matched with a mentor that suits your preferences.

                    Contact us if you face any issues- our team prioritizes your experience above all else.

                    Best Regards,
                    Admin Team, IdeaStack`,
            html: `
                    <p>Hey, Entrepreneurs @ ${proj.name}!</p>

                    <p> IdeaStack mentor ${req.body.mentor.name} has accepted your request for a meeting.<br/>
                    <h4>We'll be taking this acceptance into consideration while matching you with a mentor! </h4>
                    Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and make more requests to mentors that interest you- this will increase the likelihood that you're matched with a mentor that suits your preferences.<br/>
                    Contact us if you face any issues- our team prioritizes your experience above all else.
                    </p>

                    <p>Best Regards,<br/>
                    Admin Team, IdeaStack</p>
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

      sendRequestAcceptedMail()
        .then((result) => {
          mixpanel.track("Mentor Request Acceptance", {
            distinct_id: updatedMentor._id,
          });
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });

      currDate = new Date();
      currDate.setMonth(currDate.getMonth() + 1);

      const updateInfoProj = {
        mentorsRequested: [
          ...proj.mentorsRequested.filter((mentor) => mentor !== req.user._id),
        ],
        mentorsMatched: [
          ...proj.mentorsMatched,
          {
            mentorId: req.user._id,
            timeline: { week1: { availableDates: [] } },
            duration: 1,
            matchedDate: new Date(),
            endDate: currDate,
            materials: {
              otherDocs: [],
              taskRefs: [],
              uploads: [],
            },
            pastMeetings: [],
            upcomingMeeting: null,
          },
        ],
      };
      const newProj = await project.findByIdAndUpdate(proj._id, updateInfoProj);
      await newProj.save();

      updateInfoMentor = {
        ...updateInfoMentor,
        currentMentees: [...updatedMentor.currentMentees, proj._id],
        acceptedRequests: [
          ...updatedMentor.acceptedRequests.filter((req) => req != proj._id),
        ],
        mentorshipRequests: [
          ...newMentor.mentorshipRequests.filter(
            (req) => JSON.stringify(req) != JSON.stringify(proj._id)
          ),
        ],
      };
      const newMentor2 = await workshop.findByIdAndUpdate(
        req.user._id,
        updateInfoMentor
      );
      updatedMentor = await newMentor2.save();
    }

    res.send({ ...updatedMentor, ...updateInfoMentor });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/uploadProfPic", upload.single("image"), async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  let id = decoded._id;
  const user = await studentUser.findById(id);

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

  let obj = {};
  if (user._doc) {
    obj = { ...user._doc, profilePic: fileUrl };
  } else {
    obj = { ...user, profilePic: fileUrl };
  }

  res.send(obj);
});

router.post("/uploadMentorPic", upload.single("image"), async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  let id = decoded._id;
  const mentor = await workshop.findOne({ userId: id });

  let file = req.file;
  var fileUrl;

  await cloudinary.v2.uploader
    .upload(file.path, { folder: "IdeaStack" }, (err, result) => {
      fileUrl = result.secure_url;
      console.log("File Uploaded");
    })
    .catch((err) => console.log(err.response));
  let mentorUpdated = await workshop
    .findOneAndUpdate({ _id: id }, { pic: fileUrl })
    .catch((err) => console.log(err));

  let obj = {};
  if (mentorUpdated._doc) {
    obj = { ...mentorUpdated._doc, pic: fileUrl };
  } else {
    obj = { ...mentorUpdated, pic: fileUrl };
  }

  res.send(obj);
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

  let newUser;

  for (let i = 0; i < req.body.team.length; i++) {
    let uniqueCode = Math.trunc(Math.random() * 100000);
    currProject.team.push({
      ...req.body.team[i],
      uniqueJoinCode: uniqueCode,
      onboarded: false,
    });

    await currProject.save().catch((err) => {
      console.log(err);
      return res.status(400).send(err);
    });

    sendMail(req.body.team[i], uniqueCode)
      .then(async (result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  let updateInfo = {
    initialized: true,
  };

  newUser = await studentUser
    .findOneAndUpdate({ _id: req.user._id }, updateInfo)
    .catch((err) => {
      console.log(err);
      return res.status(400).send(err);
    });

  await newUser.save().catch((err) => {
    console.log(err);
    return res.status(400).send(err);
  });

  if (req.body.team.length === 0) {
    currProject.teamOnboarded = true;
    currProject.markModified("teamOnboarded");
    await currProject.save();
  }

  async function sendMail(teamMember, uniqueCodeParam) {
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
                }/${user.firstName + " " + user.lastName}/${currProject._id}

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
                <p>Join using this link: <a href = '${
                  process.env.NODE_ENV === "production"
                    ? "https://ideastack.org"
                    : "http://localhost:3000"
                }/teamonboarding/${teamMember.name}/${
        user.firstName + " " + user.lastName
      }/${currProject._id}'>https://ideastack.org/teamonboarding/${
        teamMember.name
      }/${user.firstName + " " + user.lastName}/${currProject._id}</a></p>

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
  }

  res.send(newUser);

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
    teamOnboarded: false,
    admin: {
      name: userName,
      id: req.user._id,
    },
    team: [
      {
        name: userName,
        id: req.user._id,
        role: projectData.adminRole,
        email: user.email,
        onboarded: true,
      },
    ],
    projPic: projectData.projPic,
  });

  newProject = await newProject.save().catch((err) => {
    console.log(err);
    return res.status(400).send(err);
  });

  let updateInfo = {
    projectId: newProject._id,
    initializationStep: "otm",
    role: projectData.adminRole,
  };

  const newUser = await studentUser
    .findOneAndUpdate({ _id: req.user._id }, updateInfo)
    .catch((err) => console.log(err));
  const updatedUser = await newUser.save().catch((err) => {
    console.log(err);
    return res.status(400).send(err);
  });

  return res.send({ ...newUser, ...updateInfo });
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
      .upload(
        file.path,
        { folder: "IdeaStack", resource_type: "raw" },
        (err, result) => {
          console.log(err ? err : result);
          if (!result) {
            res.status(400).send("Error in file..");
            return;
          }
          fileUrl = result.secure_url;
          console.log("File Uploaded");
        }
      )
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

router.post("/acknowledgeMeetingCompletion", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const proj = await project.findById(user.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    pastMeetings: [
      ...proj.mentorsMatched[index].pastMeetings,
      { ...proj.mentorsMatched[index].upcomingMeeting, completed: true },
    ],
    upcomingMeeting: {
      ...proj.mentorsMatched[index].upcomingMeeting,
      completed: true,
    },
  };

  if (
    proj.mentorsMatched[index].pastMeetings.length >=
      proj.mentorsMatched[index].duration &&
    new Date(
      proj.mentorsMatched[index].pastMeetings[
        proj.mentorsMatched[index].pastMeetings.length - 1
      ].date
    ) < new Date()
  ) {
    proj.mentorsMatched[index] = {
      ...proj.mentorsMatched[index],
      mentorshipCompleted: true,
    };
  }

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj);
});

router.post("/acknowledgeMeetingCompletionMentor", async (req, res) => {
  const proj = await project.findById(req.body.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    pastMeetings: [
      ...proj.mentorsMatched[index].pastMeetings,
      { ...proj.mentorsMatched[index].upcomingMeeting, completed: true },
    ],
    upcomingMeeting: {
      ...proj.mentorsMatched[index].upcomingMeeting,
      completed: true,
    },
  };

  if (
    proj.mentorsMatched[index].pastMeetings.length >=
      proj.mentorsMatched[index].duration &&
    new Date(
      proj.mentorsMatched[index].pastMeetings[
        proj.mentorsMatched[index].pastMeetings.length - 1
      ].date
    ) < new Date()
  ) {
    proj.mentorsMatched[index] = {
      ...proj.mentorsMatched[index],
      mentorshipCompleted: true,
    };
  }

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj);
});

router.post("/endMentorship", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const proj = await project.findById(user.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  let mentorsTemp = proj.mentorsMatched;
  mentorsTemp.splice(index, 1);
  proj.mentorsMatched = mentorsTemp;

  proj.markModified("mentorsMatched");
  await proj.save();

  const mentor = await workshop.findById(mentorMatched.mentorId);
  let indexTemp = mentor.currentMentees.indexOf(user.projectId);

  let menteesTemp = mentor.currentMentees;
  menteesTemp.splice(indexTemp, 1);
  mentor.currentMentees = menteesTemp;

  mentor.markModified("currentMentees");
  await mentor.save();

  async function sendEndMentorshipMail() {
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
        to: [...proj.team.map((teamMember) => teamMember.email), mentor.email],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Mentorship Ended - ${mentor.name} @ IdeaStack.org`,
        text: `
                  Hey, Entrepreneurs @ ${proj.name}!

                  This email is being sent to inform you that the mentorship between ${proj.name} and ${mentor.name} has ended! 

                  Kindly request a meeting with this mentor again if you wish to meet.

                  Feedback form to be filled by startup members: click here
                  Feedback form to be filled by mentor: click here

                  Sign-in to IdeaStack.org, and explore more mentor details.

                  Contact us if you face any issues- our team prioritizes your experience above all else.

                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p>Hey, Entrepreneurs @ ${proj.name}!</p>

                  <p> This email is being sent to inform you that the mentorship between ${proj.name} and ${mentor.name} has ended!
    <br/>
                  <p>Kindly request a meeting with this mentor again if you wish to meet.</p>

                  <h4> Feedback form to be filled by startup members: <a href="https://forms.gle/yFQGRD8wVH8UxR2y6" target = "_blank">click here</a>
                </h4>
   <h4> Feedback form to be filled by mentor: <a href="https://forms.gle/vRZhPkB7VcTD11YbA" target = "_blank">click here</a>
                    </h4><br/>
                  Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and explore more mentor details.<br/>
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>

                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  sendEndMentorshipMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  res.send(proj);
});

router.post("/repeatMentorship", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const proj = await project.findById(user.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    repeatRequested: true,
  };

  proj.markModified("mentorsMatched");
  await proj.save();

  const mentor = await workshop.findById(mentorMatched.mentorId);

  async function sendRepeatRequestMail() {
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
        to: [mentor.email],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Mentorship Continuation Request - ${proj.name} @ IdeaStack.org`,
        text: `
                  Hey, ${mentor.name}!

                  This email is being sent to inform you that ${proj.name} has requested to continue with your mentorship!

                  If you accept, you will be required to select two date slots again, after which a meeting date will be fixed.

                  If you deny this request, this startup team will be unable to contact you unless it requests for mentorship again.

                  Kindly sign-in to IdeaStack.org, and take a decision regarding the same.

                  Contact us if you face any issues- our team prioritizes your experience above all else.

                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p> Hey, ${mentor.name}!</p>

                  <p> This email is being sent to inform you that ${proj.name} has requested to continue with your mentorship!
    <br/>
                  <p>If you accept, you will be required to select two date slots again, after which a meeting date will be fixed.</p>
                  <br/>

                  <p>If you deny this request, this startup team will be unable to contact you unless it requests for mentorship again.</p>


                  Kindly sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and take a decision regarding the same.<br/>

                  <h4> Feedback form: <a href="https://forms.gle/vRZhPkB7VcTD11YbA" target = "_blank">click here</a><br/>

                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>

                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  sendRepeatRequestMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  res.send(proj);
});

router.post("/denyRepeatRequest", async (req, res) => {
  const proj = await project.findById(req.body.projId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    repeatRequestApproved: "no",
  };

  proj.markModified("mentorsMatched");
  await proj.save();

  const mentor = await workshop.findById(mentorMatched.mentorId);

  async function sendDenyRepeatMail() {
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
        to: [...proj.team.map((teamMember) => teamMember.email)],
        subject: `Mentorship Request Denied - ${mentor.name} @ IdeaStack.org`,
        text: `
                  Hey, Entrepreneurs @ ${proj.name}!

                  This email is being sent to inform you that ${mentor.name} has denied your request for another meeting.

                  This may be due to time-constraints, commitment issues or personal problems.

                  Sign-in to IdeaStack.org, and officially end the mentorship.

                  Contact us if you face any issues- our team prioritizes your experience above all else.

                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p>Hey, Entrepreneurs @ ${proj.name}!</p>

                  <p> This email is being sent to inform you that ${mentor.name} has denied your request for another meeting.
    <br/>
                  <p>This may be due to time-constraints, commitment issues or personal problems.</p>

                  Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and officially end the mentorship..<br/>
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>

                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  sendDenyRepeatMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  res.send(proj);
});

router.post("/acceptRepeatRequest", async (req, res) => {
  const proj = await project.findById(req.body.projId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  currDate = new Date(proj.mentorsMatched[index].endDate);
  currDate.setMonth(currDate.getMonth() + 1);

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    repeatRequestApproved: "yes",
    mentorshipCompleted: false,
    endDate: currDate,
    timeline: {
      week1: {
        availableDates: [],
      },
    },
    pastMeetings: [],
    upcomingMeeting: {},
  };

  proj.markModified("mentorsMatched");
  await proj.save();

  const mentor = await workshop.findById(mentorMatched.mentorId);

  async function sendAcceptRepeatMail() {
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
        to: [...proj.team.map((teamMember) => teamMember.email)],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Mentorship Request Accepted - ${mentor.name} @ IdeaStack.org`,
        text: `
                  Hey, Entrepreneurs @ ${proj.name}!

                  This email is being sent to inform you that ${mentor.name} has accepted your request for another meeting!

                  Your mentor will select two date slots again, after which you're expected to fix a meeting date.

                  Sign-in to IdeaStack.org, and explore more options for mentorship.

                  Contact us if you face any issues- our team prioritizes your experience above all else.

                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p>Hey, Entrepreneurs @ ${proj.name}!</p>

                  <p> This email is being sent to inform you that ${mentor.name} has accepted your request for another meeting!
    <br/>
                  <p>Your mentor will select two date slots again, after which you're expected to fix a meeting date..</p>

                  Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and and explore more options for mentorship.<br/>
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>

                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  sendAcceptRepeatMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  res.send(proj);
});

router.post("/updateInstructions", auth, async (req, res) => {
  const proj = await project.findById(req.body.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    upcomingMeeting: {
      ...proj.mentorsMatched[index].upcomingMeeting,
      mentorInstructions: req.body.instructions,
    },
  };

  const mentor = await workshop.findById(proj.mentorsMatched[index].mentorId);

  async function sendInstructionsMail() {
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
        to: [...proj.team.map((teamMember) => teamMember.email)],
        bcc: [],
        subject: `Mentorship Instructions Updated - ${mentor.name} @ IdeaStack.org`,
        text: `
                Hey, Entrepreneurs @ ${proj.name}!

                IdeaStack mentor ${
                  mentor.name
                } has set new instructions for week no. ${
          req.body.week
        } of mentorship:

                Date: ${new Date(
                  proj.mentorsMatched[index].upcomingMeeting.date
                )
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST),
                Instructions: "${req.body.instructions}"

                Kindly pay heed to the above instructions as you prepare for this week's mentorship meeting with ${
                  mentor.name
                }.
                Sign-in to IdeaStack.org, and explore more mentor details.

                Contact us if you face any issues- our team prioritizes your experience above all else.

                Best Regards,
                Admin Team, IdeaStack`,
        html: `
                <p>Hey, Entrepreneurs @ ${proj.name}!</p>

                <p> IdeaStack mentor ${
                  mentor.name
                } has set new instructions for week no. ${
          req.body.week
        } of mentorship:<br/>

                <p>Date: ${new Date(
                  proj.mentorsMatched[index].upcomingMeeting.date
                )
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST),</p>
                <p>Instructions: "${req.body.instructions}"</p>

                <h4> Kindly pay heed to the above instructions as you prepare for this week's mentorship meeting with ${
                  mentor.name
                }.</h4>
                Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and and explore more mentor details.<br/>
                Contact us if you face any issues- our team prioritizes your experience above all else.
                </p>

                <p>Best Regards,<br/>
                Admin Team, IdeaStack</p>
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

  sendInstructionsMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj);
});

router.post("/confirmMeetingSlots", auth, async (req, res) => {
  const proj = await project.findById(req.body.projectId);

  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      index = i;
    }
  }

  const mentor = await workshop.findById(proj.mentorsMatched[index].mentorId);

  if (req.body.week === 1) {
    proj.mentorsMatched[index].timeline.week1.availableDates =
      req.body.meetingSlots;
  } else if (req.body.week === 2) {
    proj.mentorsMatched[index].timeline.week2.availableDates =
      req.body.meetingSlots;
  } else if (req.body.week === 3) {
    proj.mentorsMatched[index].timeline.week3.availableDates =
      req.body.meetingSlots;
  } else if (req.body.week === 4) {
    proj.mentorsMatched[index].timeline.week4.availableDates =
      req.body.meetingSlots;
  }

  async function sendSlotsSetMail() {
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
        to: [...proj.team.map((teamMember) => teamMember.email)],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Meeting Slots Set - ${mentor.name} @ IdeaStack.org`,
        text: `
                Hey, Entrepreneurs @ ${proj.name}!
        
                IdeaStack mentor ${
                  mentor.name
                } has set the following meeting dates/slots for week no. ${
          req.body.week
        } of mentorship:

                1. ${new Date(req.body.meetingSlots[0])
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(0, 5)} ${new Date(req.body.meetingSlots[0])
          .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
          .substring(12, 17)} (GST)
                2. ${new Date(req.body.meetingSlots[1])
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(0, 5)} ${new Date(req.body.meetingSlots[1])
          .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
          .substring(12, 17)} (GST)
                
                These are the only 2 available meeting slots for this week; you've been asked to confirm one of the slots within 2 days. 
                Sign-in to IdeaStack.org, and select one of the slots. This is to finalize and schedule a meeting with your mentor.

                Contact us if you face any issues- our team prioritizes your experience above all else.
                
                Best Regards,
                Admin Team, IdeaStack`,
        html: `
                <p>Hey, Entrepreneurs @ ${proj.name}!</p>
        
                <p> IdeaStack mentor ${
                  mentor.name
                } has set the following meeting dates/slots for week no. ${
          req.body.week
        } of mentorship:<br/>

                <p>1. ${new Date(req.body.meetingSlots[0])
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST),</p>
                <p>2. ${new Date(req.body.meetingSlots[1])
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST)</p>

                <h4>These are the only 2 available meeting slots for this week; you've been asked to confirm one of the slots within 2 days.</h4>
                Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and select one of the slots. This is to finalize and schedule a meeting with your mentor.<br/> 
                Contact us if you face any issues- our team prioritizes your experience above all else.
                </p>
                
                <p>Best Regards,<br/>
                Admin Team, IdeaStack</p>
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

  sendSlotsSetMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj);
});

router.post("/pickMentorshipDate", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const proj = await project.findById(user.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  const mentor = await workshop.findById(proj.mentorsMatched[index].mentorId);

  if (req.body.week === 1) {
    proj.mentorsMatched[index].timeline.week1 = {
      ...proj.mentorsMatched[index].timeline.week1,
      selectedDate: req.body.datePicked,
    };
  } else if (req.body.week === 2) {
    proj.mentorsMatched[index].timeline.week2 = {
      ...proj.mentorsMatched[index].timeline.week2,
      selectedDate: req.body.datePicked,
    };
  } else if (req.body.week === 3) {
    proj.mentorsMatched[index].timeline.week3 = {
      ...proj.mentorsMatched[index].timeline.week3,
      selectedDate: req.body.datePicked,
    };
  } else if (req.body.week === 4) {
    proj.mentorsMatched[index].timeline.week4 = {
      ...proj.mentorsMatched[index].timeline.week4,
      selectedDate: req.body.datePicked,
    };
  }

  proj.mentorsMatched[index] = {
    ...proj.mentorsMatched[index],
    pastMeetings: [
      ...proj.mentorsMatched[index].pastMeetings,
      {
        date: req.body.datePicked,
        mentorInstructions: "",
        link: "",
        week: req.body.week,
        completed: false,
      },
    ],
    upcomingMeeting: {
      date: req.body.datePicked,
      mentorInstructions: "",
      link: "",
      week: req.body.week,
      completed: false,
    },
  };

  async function sendDatePickedMail() {
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
        to: [mentor.email],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Mentorship Meeting Confirmed - ${proj.name} @ IdeaStack.org`,
        text: `
                Hey, ${mentor.name}!
        
                IdeaStack startup '${
                  proj.name
                }' has finalized the following meeting date for week no. ${
          req.body.week
        } of mentorship:

                - ${new Date(req.body.datePicked)
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST)
                
                Reminders will be sent to ensure you attend the meeting; Kindly review your mentees' details and prepare for the meeting.
                Sign-in to IdeaStack.org/mentor, and explore more options to keep making an impact. Thank you for your support!

                Contact us if you face any issues- our team prioritizes your experience above all else.
                
                Best Regards,
                Admin Team, IdeaStack`,
        html: `
                <p>Hey, ${mentor.name}!</p>
        
                <p>IdeaStack startup '${
                  proj.name
                }' has finalized the following meeting date for week no. ${
          req.body.week
        } of mentorship:<br/>

                <p>- ${new Date(req.body.datePicked)
                  .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                  .substring(12, 17)} (GST)</p>
                

                <h4>Reminders will be sent to ensure you attend the meeting; Kindly review your mentees' details and prepare for the meeting.</h4>
                Sign-in to <a href = "https://IdeaStack.org/mentor" target = "_blank">IdeaStack.org/mentor</a>, and explore more options to keep making an impact. Thank you for your support!<br/> 
                Contact us if you face any issues- our team prioritizes your experience above all else.
                </p>
                
                <p>Best Regards,<br/>
                Admin Team, IdeaStack</p>
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

  sendDatePickedMail()
    .then((result) => {
      mixpanel.track("Meeting Confirmation", {
        distinct_id: user._id,
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  function findSecondsDifference(date1, date2) {
    var oneSecond_ms = 1000;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / oneSecond_ms);
  }

  async function sendReminderMail(uM, m, p) {
    let upcomingMeeting = uM;
    let mentor = m;
    let proj = p;

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
        to: "Undisclosed Recipients <ideastackapp@gmail.com>",
        bcc: [
          "vismaysuramwar@gmail.com",
          "raghavbhatia0611@gmail.com",
          mentor.email,
          ...proj.team.map((teamMember) => teamMember.email),
        ],
        subject: `Reminder - Mentorship Meeting on ${new Date(
          upcomingMeeting.date
        )
          .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
          .substring(12, 17)} (GST)`,
        text: `
                  Greetings,
          
                  Upcoming mentorship meeting between IdeaStack startup '${
                    proj.name
                  }' and mentor ${mentor.name} for week no. ${
          upcomingMeeting.week
        } of mentorship will happen on:
    
                  ${new Date(upcomingMeeting.date)
                    .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                    .substring(12, 17)} (GST)
                  
                  Sign-in to IdeaStack.org, and explore more options for mentorship.
    
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  
                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p>Hey, ${mentor.name}!</p>
          
                  <p>Upcoming mentorship meeting between IdeaStack startup '${
                    proj.name
                  }' and mentor ${mentor.name} for week no. ${
          upcomingMeeting.week
        } of mentorship will happen on:<br/>
    
                  <p>- ${new Date(upcomingMeeting.date)
                    .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                    .substring(12, 17)} (GST)</p>
                  
                  <p>Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and explore more options for mentorship.<br/> 
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>
                  
                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  async function sendCompletionMail(uM, m, p) {
    let upcomingMeeting = uM;
    let mentor = m;
    let proj = p;

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
        to: "Undisclosed Recipients <ideastackapp@gmail.com>",
        bcc: [
          "vismaysuramwar@gmail.com",
          "raghavbhatia0611@gmail.com",
          mentor.email,
          ...proj.team.map((teamMember) => teamMember.email),
        ],
        subject: `${mentor.name} x ${proj.name} - Mentorship Meeting Completed!`,
        text: `
                  Greetings,
          
                  Mentorship meeting between IdeaStack startup '${
                    proj.name
                  }' and mentor ${mentor.name} for week no. ${
          upcomingMeeting.week
        } has been succesfully completed! Logged meeting date:
    
                  ${new Date(upcomingMeeting.date)
                    .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                    .substring(12, 17)} (GST)
                  
                  Sign-in to IdeaStack.org, and explore more options for mentorship.
    
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  
                  Best Regards,
                  Admin Team, IdeaStack`,
        html: `
                  <p>Hey, ${mentor.name}!</p>
          
                  <p>Mentorship meeting between IdeaStack startup '${
                    proj.name
                  }' and mentor ${mentor.name} for week no. ${
          upcomingMeeting.week
        } has been succesfully completed! Logged meeting date:<br/>
    
                  <p>- ${new Date(upcomingMeeting.date)
                    .toLocaleString("en-GB", { timeZone: "Asia/Dubai" })
                    .substring(12, 17)} (GST)</p>
                  
                  <p>Sign-in to <a href = "https://IdeaStack.org" target = "_blank">IdeaStack.org</a>, and explore more options for mentorship.<br/> 
                  Contact us if you face any issues- our team prioritizes your experience above all else.
                  </p>
                  
                  <p>Best Regards,<br/>
                  Admin Team, IdeaStack</p>
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

  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  };

  agenda.define("reminderMail", () => {
    sendReminderMail(proj.mentorsMatched[index].upcomingMeeting, mentor, proj)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  agenda.define("meetingCompleted", () => {
    sendCompletionMail(proj.mentorsMatched[index].upcomingMeeting, mentor, proj)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (
    new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(2) >
    new Date()
  ) {
    let timeFromNow1 = findSecondsDifference(
      new Date(),
      new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(2)
    );
    agenda.schedule(timeFromNow1 + " seconds", "meetingCompleted");
  }

  if (
    new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-1) >
    new Date()
  ) {
    let timeFromNow2 = findSecondsDifference(
      new Date(),
      new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-1)
    );
    agenda.schedule(timeFromNow2 + " seconds", "reminderMail");
  }

  if (
    new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-6) >
    new Date()
  ) {
    let timeFromNow3 = findSecondsDifference(
      new Date(),
      new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-6)
    );
    agenda.schedule(timeFromNow3 + " seconds", "reminderMail");
  }

  if (
    new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-24) >
    new Date()
  ) {
    let timeFromNow4 = findSecondsDifference(
      new Date(),
      new Date(proj.mentorsMatched[index].upcomingMeeting.date).addHours(-24)
    );
    agenda.schedule(timeFromNow4 + " seconds", "reminderMail");
  }

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj);
});

router.post("/uploadMentorshipFile", auth, async (req, res) => {
  const user = await studentUser.findById(req.user._id);
  const proj = await project.findById(user.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  proj.mentorsMatched[index].materials.uploads =
    proj.mentorsMatched[index].materials.uploads.length == 0
      ? [req.body.upload]
      : [...proj.mentorsMatched[index].materials.uploads, req.body.upload];

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj.mentorsMatched);
});

router.post("/uploadForStartup", auth, async (req, res) => {
  const proj = await project.findById(req.body.projectId);

  let mentorMatched;
  let index;

  for (let i = 0; i < proj.mentorsMatched.length; i++) {
    if (
      JSON.stringify(proj.mentorsMatched[i].mentorId) ===
      JSON.stringify(req.body.mentorId)
    ) {
      mentorMatched = proj.mentorsMatched[i];
      index = i;
    }
  }

  if (req.body.type === "generalResource") {
    proj.mentorsMatched[index].materials.otherDocs =
      proj.mentorsMatched[index].materials.otherDocs.length == 0
        ? [req.body.upload]
        : [...proj.mentorsMatched[index].materials.otherDocs, req.body.upload];
  } else if (req.body.type === "taskReference") {
    proj.mentorsMatched[index].materials.taskRefs =
      proj.mentorsMatched[index].materials.taskRefs.length == 0
        ? [req.body.upload]
        : [...proj.mentorsMatched[index].materials.taskRefs, req.body.upload];
  }

  proj.markModified("mentorsMatched");
  await proj.save();

  res.send(proj.mentorsMatched);
});

router.post("/updateMentorshipFiles", auth, async (req, res) => {
  try {
    const user = await studentUser.findById(req.user._id);

    let proj;

    if (user) {
      proj = await project.findById(user.projectId);
    } else {
      proj = await project.findById(req.body.projectId);
    }

    let mentorMatched;
    let index;

    for (let i = 0; i < proj.mentorsMatched.length; i++) {
      if (
        JSON.stringify(proj.mentorsMatched[i].mentorId) ===
        JSON.stringify(req.body.mentorId)
      ) {
        mentorMatched = proj.mentorsMatched[i];
        index = i;
      }
    }

    if (req.body.docCategory) {
      if (req.body.docCategory === "taskRefs") {
        proj.mentorsMatched[index].materials.taskRefs = req.body.docs;
        proj.markModified("mentorsMatched");
      } else if (req.body.docCategory === "otherDocs") {
        proj.mentorsMatched[index].materials.otherDocs = req.body.docs;
        proj.markModified("mentorsMatched");
      } else if (req.body.docCategory === "taskSubs") {
        proj.mentorsMatched[index].materials.uploads = req.body.docs;
        proj.markModified("mentorsMatched");
      } else if (req.body.docCategory === "generalStartupDocs") {
        proj.documents = req.body.docs;
        proj.markModified("documents");
      }
    }

    await proj.save();

    res.send([proj.mentorsMatched[index].materials, proj]);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
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

router.post("/getProject", async (req, res) => {
  const projects = await project.find({});
  let proj;
  for (let i = 0; i < projects.length; i++) {
    if (JSON.stringify(projects[i]._id) == JSON.stringify(req.body.projId)) {
      proj = projects[i];
    }
  }

  // const updateInfo = {
  //   mentorsMatched: [
  //     ...proj.mentorsMatched,
  //     {
  //       mentorId: "6423038d9f5fdae7ba07b267",
  //       timeline: { week1: { availableDates: [] } },
  //       duration: 1,
  //       matchedDate: new Date("2023-06-25T15:02:51.972+00:00"),
  //       endDate: new Date("2023-07-26T15:02:51.972+00:00"),
  //       materials: {
  //         otherDocs: [],
  //         taskRefs: [],
  //         uploads: [],
  //       },
  //       pastMeetings: [],
  //       upcomingMeeting: null,
  //     },
  //   ],
  // };
  // const newProj = await project.findByIdAndUpdate('648edf5a639b97283b0a9043', updateInfo);
  // newProj.save();

  res.send(proj);
});

router.post("/getProjectMember", async (req, res) => {
  const projects = await project.find();
  let proj = null;

  for (let j = 0; j < projects.length; j++) {
    if (
      String(projects[j]["name"]).toLowerCase() ===
      String(req.body.projectName).toLowerCase()
    ) {
      proj = projects[j];
    }
  }
  let member = null;

  for (let i = 0; i < proj.team.length; i++) {
    if (
      proj.team[i].name.toLowerCase().trim() ===
      req.body.memberName.toLowerCase().trim()
    ) {
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

  const mentor = await workshop.findOne({ name: req.body.workshop.name });
  const proj = await project.findById(req.body.projectId);

  if (proj.mentorsRequested && proj.mentorsRequested.length > 0) {
    proj.mentorsRequested.push(req.body.workshop._id);
  } else {
    proj.mentorsRequested = [req.body.workshop._id];
  }

  async function sendRequestCreatedMail() {
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
        to: [mentor.email],
        bcc: ["vismaysuramwar@gmail.com", "raghavbhatia0611@gmail.com"],
        subject: `Mentorship Request - ${proj.name} @ IdeaStack.org`,
        text: `
                Hey ${mentor.name}!

                IdeaStack's student-users of ${proj.name} (venture) have requested your mentorship.

                We'll be taking this request into consideration while matching you with a mentee startup.
                Sign-in to IdeaStack.org/mentor, and approve a request that interests you- this will increase the likelihood that you're matched with a startup that suits your preferences.

                Contact us if you face any issues- our team prioritizes your experience above all else.

                Best Regards,
                Admin Team, IdeaStack`,
        html: `
                <p>Hey ${mentor.name}!</p>

                <p> IdeaStack's student-users of ${proj.name} (venture) have requested your mentorship.<br/>
                <h4>We'll be taking this request into consideration while matching you with a mentee startup.</h4>
                Sign-in to <a href = "https://IdeaStack.org/mentor" target = "_blank">IdeaStack.org/mentor</a>, and approve a request that interests you- this will increase the likelihood that you're matched with a startup that suits your preferences.<br/>
                Contact us if you face any issues- our team prioritizes your experience above all else.
                </p>

                <p>Best Regards,<br/>
                Admin Team, IdeaStack</p>
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

  sendRequestCreatedMail()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

  await proj.markModified("mentorsRequested");
  await proj.save();

  mentor.mentorshipRequests.push(proj._id);
  await mentor.markModified("mentorshipRequests");
  await mentor.save();

  mixpanel.track("Mentorship Request Made", {
    distinct_id: proj._id,
  });

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
