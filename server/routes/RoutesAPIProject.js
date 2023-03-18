const router = require("express").Router();
const nodemailer = require("nodemailer");
const studentUser = require("../models/studentUser");
const project = require("../models/project");
// const mentor = require("../models/mentor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { PromiseProvider } = require("mongoose");

const fileStorageEngine = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/getQuestions", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const application = proj.application ? proj.application : [];
  res.send(application);
});

router.post("/updateProject", auth, async (req, res) => {
  let newproj = await project.findByIdAndUpdate(
    req.body.projectID,
    req.body.update
  );
  res.send({ ...newproj, ...req.body.update });
});

router.post("/updateQuestions", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  proj.application = req.body.questions;
  proj.save();
  res.send(proj.application);
});

router.post("/updateAppStatus", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  proj.accepting = req.body.accepting;
  proj.save();
  res.send(proj.accepting);
});

router.post("/getProjUser", auth, async (req, res) => {
  try {
    console.log(req.body.id);
    const user = await studentUser.findById(req.body.id);
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/acceptApp", auth, async (req, res) => {
  const applicant = await studentUser.findOne({ _id: req.body.application.id });
  const proj = await project.findOne({ _id: req.body.application.projID });

  for (let k = 0; k < applicant.joinRequests.length; k++) {
    if (
      JSON.stringify(applicant.joinRequests[k]) ===
      JSON.stringify(req.body.application)
    ) {
      applicant.joinRequests[k].appStatus = "Accepted";
    }
  }

  for (let k = 0; k < proj.joinRequests.length; k++) {
    if (
      JSON.stringify(proj.joinRequests[k]) ===
      JSON.stringify(req.body.application)
    ) {
      proj.joinRequests[k].appStatus = "Accepted";
    }
  }

  const io = req.io;
  await io.emit("applicationAccepted", {
    acceptedUserId: applicant._id,
    id: req.body.application.projID,
    project: proj,
  });

  await applicant.markModified("joinRequests");
  await proj.markModified("joinRequests");
  await applicant.save();
  await proj.save();

  let notifications = applicant.notifications ? applicant.notifications : [];
  notifications.push({
    seen: false,
    type: "application",
    title: "Join Request Accepted!",
    subtitle: "Your Application to " + proj.name + " has been accepted",
    icon: proj.projPic,
  });
  applicant.notifications = notifications;
  await applicant.markModified("notifications");
  await applicant.save();

  res.send(proj.joinRequests);
});

router.post("/sendInvite", auth, async (req, res) => {
  let invitee = await studentUser.findOne({ _id: req.body.user.id });
  const proj = await project.findOne({ _id: req.body.projectID });

  let joinRequest = {
    isInvite: true,
    projID: req.body.projectID,
    id: req.body.user.id,
    appStatus: "Invited",
    dateReceived: new Date(),
  };

  proj.joinRequests.push(joinRequest);
  proj.markModified("joinRequests");
  await proj.save();
  let chk = false;
  for (let i = 0; i < invitee.joinRequests.length; i++) {
    if (
      JSON.stringify(invitee.joinRequests[i].projID) ===
      JSON.stringify(joinRequest.projID)
    ) {
      chk = true;
    }
  }
  if (!chk) {
    invitee.joinRequests.push(joinRequest);
    invitee.markModified("joinRequests");
    console.log(invitee.joinRequests);
    await invitee.save();
  }

  let io = req.io;
  await io.emit("inviteSent", {
    invitee: invitee,
    id: proj._id,
    project: proj,
  });

  let notifications = invitee.notifications ? invitee.notifications : [];
  notifications.push({
    seen: false,
    type: "invite",
    title: "New Project Invite",
    subtitle: "You've been invited to join " + proj.name,
    icon: proj.projPic,
  });
  invitee.notifications = notifications;
  await invitee.markModified("notifications");
  await invitee.save();

  res.send("Worked..");
});

router.post("/confirmAcceptance", auth, async (req, res) => {
  const applicant = await studentUser.findOne({ _id: req.body.application.id });
  const proj = await project.findOne({ _id: req.body.application.projID });
  let appObj = {
    id: applicant._id,
    name: applicant.firstName + " " + applicant.lastName,
    pic: applicant.profilePic,
    dateAdded: new Date(),
  };

  let io = req.io;
  await io.emit("acceptanceConfirmed", {
    user: applicant,
    id: req.body.application.projID,
  });

  proj.team.push(appObj);
  proj.markModified("team");
  await proj.save();

  applicant.projects.push(proj._id);
  applicant.markModified("projects");
  await applicant.save();

  proj.joinRequests = proj.joinRequests.filter((jR) => {
    console.log(JSON.stringify(jR.id));
    console.log(JSON.stringify(req.body.application.id));
    return JSON.stringify(jR.id) !== JSON.stringify(req.body.application.id);
  });

  proj.markModified("joinRequests");
  await proj.save();

  applicant.joinRequests = applicant.joinRequests.filter((jR) => {
    return JSON.stringify(jR.id) !== JSON.stringify(req.body.application.id);
  });

  applicant.markModified("joinRequests");
  await applicant.save();

  const projAdmin = await studentUser.findOne({ _id: proj.admin.id });
  let notifications = projAdmin.notifications ? projAdmin.notifications : [];
  notifications.push({
    seen: false,
    type: "new member",
    title: "New Team Member!",
    subtitle: applicant.firstName + " has joined " + proj.name + "!",
    icon: applicant.profilePic,
  });
  projAdmin.notifications = notifications;
  await projAdmin.markModified("notifications");
  await projAdmin.save();

  res.send(applicant.joinRequests);
});

router.post("/rejectApp", auth, async (req, res) => {
  const applicant = await studentUser.findOne({ _id: req.body.application.id });
  const proj = await project.findOne({ _id: req.body.application.projID });
  let appObj = {
    id: applicant._id,
    name: applicant.firstName + " " + applicant.lastName,
    pic: applicant.profilePic,
  };

  for (let k = 0; k < applicant.joinRequests.length; k++) {
    if (
      JSON.stringify(applicant.joinRequests[k]) ===
      JSON.stringify(req.body.application)
    ) {
      applicant.joinRequests[k].appStatus = "Rejected";
    }
  }

  proj.joinRequests = proj.joinRequests.filter((jR) => {
    jR !== req.body.application;
  });

  proj.markModified("joinRequests");
  applicant.markModified("joinRequests");

  await applicant.save();

  await proj.save();

  res.send(proj.joinRequests);
});

router.post("/confirmRejection", auth, async (req, res) => {
  const applicant = await studentUser.findOne({ _id: req.body.application.id });
  applicant.joinRequests = applicant.joinRequests.filter((jR) => {
    jR !== req.body.application &&
      ((jR.isInvite == true && req.body.application.isInvite == true) ||
        (jR.isInvite == false && req.body.application.isInvite == false));
  });

  applicant.markModified("joinRequests");

  await applicant.save();

  res.send(applicant.joinRequests);
});

router.post("/confirmRejectionInvite", auth, async (req, res) => {
  const applicant = await studentUser.findOne({ _id: req.user._id });
  applicant.joinRequests = applicant.joinRequests.filter((jR) => {
    return (
      jR !== req.body.application &&
      !(
        (jR.isInvite == true && req.body.application.isInvite == true) ||
        (jR.isInvite == false && req.body.application.isInvite == false)
      )
    );
  });

  applicant.markModified("joinRequests");
  await applicant.save();

  const proj = await project.findOne({ _id: req.body.application.projID });
  proj.joinRequests = proj.joinRequests.filter((jR) => {
    return (
      jR !== req.body.application &&
      !(
        (jR.isInvite == true && req.body.application.isInvite == true) ||
        (jR.isInvite == false && req.body.application.isInvite == false)
      )
    );
  });

  proj.markModified("joinRequests");
  await proj.save();

  const io = req.io;
  await io.emit("flagInviteRejection", {
    user: applicant,
    project: proj,
  });

  const projAdmin = await studentUser.findOne({ _id: proj.admin.id });
  let notifications = projAdmin.notifications ? projAdmin.notifications : [];
  notifications.push({
    seen: false,
    type: "invite rejected",
    title: "Invite Rejected",
    subtitle: applicant.firstName + " rejected your invite to " + proj.name,
    icon: applicant.profilePic,
  });
  projAdmin.notifications = notifications;
  await projAdmin.markModified("notifications");
  await projAdmin.save();

  res.send(applicant.joinRequests);
});

router.post("/updateFeed", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const io = req.io;
  let origNum = proj.messages.length;
  proj.messages = req.body.feed;
  let newProj = await proj.save();
  await io.emit("redistributeMessages", {
    feed: req.body.feed,
    id: req.body.projectID,
  });

  if (proj.messages.length > origNum) {
    for (let i = 0; i < proj.team.length; i++) {
      console.log(proj.team[i].name);
      console.log(req.body.feed[req.body.feed.length - 1].from);

      if (proj.team[i].name !== req.body.feed[req.body.feed.length - 1].from) {
        let member = await studentUser.findOne({ email: proj.team[i].email });
        let notifications = member.notifications ? member.notifications : [];
        notifications.push({
          seen: false,
          type: "message",
          title: "New Message - " + proj.name,
          subtitle:
            req.body.feed[req.body.feed.length - 1].from +
            " sent a new message..",
          icon: req.body.feed[req.body.feed.length - 1].authorPicture,
        });
        member.notifications = notifications;
        await member.markModified("notifications");
        await member.save();
      }
    }
  }

  res.send(newProj.messages);
});

router.post("/seeMessages", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const viewer = await studentUser.findOne({ _id: req.user._id });

  if (proj) {
    for (let x = 0; x < proj.messages.length; x++) {
      if (!proj.messages[x].seenBy) {
        proj.messages[x].seenBy = [viewer.firstName + " " + viewer.lastName];
      }
      if (
        !proj.messages[x].seenBy.includes(
          viewer.firstName + " " + viewer.lastName
        )
      ) {
        proj.messages[x].seenBy.push(viewer.firstName + " " + viewer.lastName);
      }
    }

    // proj.markModified("messages");
    await proj.save();

    res.send(proj.messages);
  }

  res.end();
});

router.post("/uploadProjectFile", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const user = await studentUser.findById(req.user._id);

  const upload = {
    ...req.body.upload,
    uploadedBy: user.firstName + " " + user.lastName,
  };
  if (proj.documents) {
    proj.documents.push(upload);
  } else {
    proj.documents = new Array(upload);
  }

  let newProj = await proj.save();
  let io = req.io;
  await io.emit("redistributeFiles", {
    files: proj.documents,
    id: req.body.projectID,
  });

  for (let i = 0; i < proj.team.length; i++) {
    console.log(proj.team[i].name);
    console.log(proj.documents[proj.documents.length - 1].uploadedBy);

    if (
      proj.team[i].name !== proj.documents[proj.documents.length - 1].uploadedBy
    ) {
      let member = await studentUser.findOne({ email: proj.team[i].email });
      let notifications = member.notifications ? member.notifications : [];
      notifications.push({
        seen: false,
        type: "files",
        title: "New Document - " + proj.name,
        subtitle:
          proj.documents[proj.documents.length - 1].uploadedBy +
          " uploaded a new document...",
        icon: proj.projPic,
      });
      member.notifications = notifications;
      await member.markModified("notifications");
      await member.save();
    }
  }

  res.send(newProj.documents);
});

router.post("/getDocs", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  res.send(proj.documents);
});

router.post("/updateDocs", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  proj.documents = req.body.docs;
  proj.save();
  let io = req.io;
  await io.emit("redistributeFiles", {
    files: proj.documents,
    id: req.body.projectID,
  });
  res.send(proj.documents);
});

router.post("/getTeamContacts", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let contacts = [];
  for (let i = 0; i < proj.team.length; i++) {
    const user = await studentUser.findOne({ email: proj.team[i].email });
    if (user) {
      contacts.push(user.email);
    } else {
      contacts.push("(member has not signed up)");
    }
  }

  res.send(contacts);
});

router.post("/getMentors", auth, async (req, res) => {
  const mentors = await mentor.find({});
  res.send(mentors);
});

router.post("/getMentorsAdmin", async (req, res) => {
  const mentors = await mentor.find({});
  res.send(mentors);
});

router.post("/checkAvailability", auth, async (req, res) => {
  const projects = await project.find();
  const mentor = req.body.consultant;
  const date = req.body.date;
  let availability = true;

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].mentorshipPackages.length; j++) {
      if (
        JSON.stringify(projects[i].mentorshipPackages[j]._id) ===
        JSON.stringify(mentor._id)
      ) {
        console.log(
          projects[i].mentorshipPackages[j].selectedDates.map((dateStr) =>
            String(new Date(dateStr))
          )
        );
        console.log(String(new Date(date)));
        if (
          projects[i].mentorshipPackages[j].selectedDates
            .map((dateStr) => String(new Date(dateStr)))
            .includes(String(new Date(date)))
        ) {
          console.log("Date Taken");
          availability = false;
        }
      }
    }
  }

  res.send(availability);
});

router.post("/getFirstFree", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let chk = false;
  for (let i = 0; i < proj.mentorshipDetails.length; i++) {
    let mentorName = proj.mentorshipDetails[i].name;
    if (mentorName === req.body.expertName) {
      chk = true;
    }
  }
  res.send(!chk);
});

router.post("/addMentorshipPackage", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let isFirstTime = req.body.isFirstFree;

  let io = req.io;

  const noOfSessions = req.body.mentorshipPackage.numberOfSessions;
  let newInfo = {
    ...req.body.mentorshipPackage,
    numberOfSessionsRemaining: noOfSessions,
    packageCompleted: false,
    isFirstFree: isFirstTime,
    paymentPending:
      isFirstTime || req.body.mentorshipPackage.pricing[0] === 0 ? false : true,
    individualCostPerSession: isFirstTime
      ? 0
      : req.body.mentorshipPackage.individualCostPerSession,
    pendingAmount:
      req.body.mentorshipPackage.pricing[0] *
      (isFirstTime ? noOfSessions - 1 : noOfSessions),
    sessionsConfirmed: false,
  };
  if (isFirstTime) {
    newInfo = {
      ...newInfo,
      individualTotalCost: newInfo.pendingAmount / proj.team.length,
    };
  }
  proj.mentorshipPackages.push(newInfo);

  for (let i = 0; i < proj.team.length; i++) {
    if (proj.team[i].pendingPayments) {
      proj.team[i].pendingPayments.push(
        (req.body.mentorshipPackage.pricing[0] / parseFloat(proj.team.length)) *
          (isFirstTime ? noOfSessions - 1 : noOfSessions)
      );
    } else {
      proj.team[i].pendingPayments = [
        (req.body.mentorshipPackage.pricing[0] / parseFloat(proj.team.length)) *
          (isFirstTime ? noOfSessions - 1 : noOfSessions),
      ];
    }

    const user = await studentUser.findById(proj.team[i].id);

    let paymentInfo = {
      amounts: [
        (req.body.mentorshipPackage.pricing[0] / parseFloat(proj.team.length)) *
          (isFirstTime ? noOfSessions - 1 : noOfSessions),
      ],
      totalAmountForThisProject:
        (req.body.mentorshipPackage.pricing[0] / parseFloat(proj.team.length)) *
        (isFirstTime ? noOfSessions - 1 : noOfSessions),
      projectID: req.body.projectID,
      projectName: proj.name,
    };

    if (user.pendingPayments) {
      let chk = false;
      let finI = 0;

      for (let j = 0; j < user.pendingPayments.length; j++) {
        if (
          JSON.stringify(user.pendingPayments[j].projectID) ===
          JSON.stringify(req.body.projectID)
        ) {
          chk = true;
          finI = j;
          break;
        }
      }

      if (!chk) {
        user.pendingPayments.push(paymentInfo);
      } else {
        user.pendingPayments[finI].amounts.push(
          (req.body.mentorshipPackage.pricing[0] /
            parseFloat(proj.team.length)) *
            (isFirstTime ? noOfSessions - 1 : noOfSessions)
        );
        user.pendingPayments[finI].totalAmountForThisProject =
          user.pendingPayments[finI].totalAmountForThisProject +
          (req.body.mentorshipPackage.pricing[0] /
            parseFloat(proj.team.length)) *
            (isFirstTime ? noOfSessions - 1 : noOfSessions);
      }
    } else {
      user.pendingPayments = [paymentInfo];
    }

    user.markModified("pendingPayments");
    await user.save();
  }

  await io.emit("mentorBooked", {
    info: newInfo,
    id: req.body.projectID,
  });

  for (let i = 0; i < proj.team.length; i++) {
    if (proj.team[i].name !== proj.admin.name) {
      let member = await studentUser.findOne({ email: proj.team[i].email });
      let notifications = member.notifications ? member.notifications : [];
      notifications.push({
        seen: false,
        type: "mentor",
        title: "Mentor Booked! - " + proj.name,
        subtitle: req.body.mentorshipPackage.name + " has been booked!!",
        icon: req.body.mentorshipPackage.pic,
      });
      member.notifications = notifications;
      await member.markModified("notifications");
      await member.save();
    }
  }

  let mentorshipDetails = proj.mentorshipDetails;
  let chk = false;

  for (let i = 0; i < mentorshipDetails.length; i++) {
    let mentorName = mentorshipDetails[i].name;
    if (mentorName === req.body.mentorshipPackage.name) {
      chk = true;
      let newObj = mentorshipDetails[i];
      newObj.paymentPending = newObj.paymentPending + newInfo.pendingAmount;
      mentorshipDetails[i] = newObj;
    }
  }

  if (!chk) {
    mentorshipDetails.push({
      name: req.body.mentorshipPackage.name,
      sessionsHeld: 0,
      paymentPending: 0,
      paymentMade: parseInt(0),
    });
  }
  proj.mentorshipDetails = mentorshipDetails;

  proj.markModified("team");
  proj.markModified("mentorshipPackages");
  proj.markModified("mentorshipDetails");

  let newProj = await proj.save();

  res.send(newProj);
});

router.post("/cancelLatestMentorship", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });

  let mentorshipDetails = proj.mentorshipDetails;

  for (let i = 0; i < mentorshipDetails.length; i++) {
    if (
      proj.mentorshipPackages[proj.mentorshipPackages.length - 1] &&
      mentorshipDetails[i].name ===
        proj.mentorshipPackages[proj.mentorshipPackages.length - 1].name
    ) {
      mentorshipDetails[i].paymentPending = 0;
    }
  }
  proj.mentorshipDetails = mentorshipDetails;
  proj.markModified("mentorshipDetails");
  await proj.save();

  proj.mentorshipPackages = proj.mentorshipPackages.filter((pcage) => {
    return (
      pcage !== proj.mentorshipPackages[proj.mentorshipPackages.length - 1]
    );
  });

  proj.markModified("mentorshipPackages");
  await proj.save();

  for (let i = 0; i < proj.team.length; i++) {
    let costreduced = proj.team[i].pendingPayments.splice(
      proj.team[i].pendingPayments.length - 1,
      1
    );
    proj.markModified("team");
    await proj.save();
    if (costreduced !== 0) {
      let id = proj.team[i].id;
      let user = await studentUser.findById(id);
      for (let k = 0; k < user.pendingPayments.length; k++) {
        if (
          JSON.stringify(user.pendingPayments[k].projectID) ===
          JSON.stringify(proj._id)
        ) {
          user.pendingPayments[k].totalAmountForThisProject -= costreduced;
          let dummy = user.pendingPayments[k].amounts.pop();
        }
      }
      user.markModified("pendingPayments");
      await user.save();
    }
  }

  let io = req.io;
  await io.emit("latestMentorCancelled", {
    info: proj.mentorshipPackages[proj.mentorshipPackages.length - 1],
    id: req.body.projectID,
  });

  for (let i = 0; i < proj.team.length; i++) {
    console.log(proj.team[i].name);

    if (proj.team[i].name !== proj.admin.name) {
      let member = await studentUser.findOne({ email: proj.team[i].email });
      let notifications = member.notifications ? member.notifications : [];
      notifications.push({
        seen: false,
        type: "mentor",
        title: "Booking Cancelled! - " + proj.name,
        subtitle:
          "Mentorship by - " +
          req.body.mentorshipPackage.name +
          " - has been cancelled!",
        icon: req.body.mentorshipPackage.pic,
      });
      member.notifications = notifications;
      await member.markModified("notifications");
      await member.save();
    }
  }

  res.send("Done Succesfully");
});

router.post("/getMentorshipPackages", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  res.send(proj.mentorshipPackages);
});

router.post("/getMentorshipDetails", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  res.send(proj.mentorshipDetails);
});

router.post("/getTeam", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  res.send(proj.team);
});

router.post("/finishLatestSession", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let mentorshipPackage = proj.mentorshipPackages[0];
  let mentorshipDetails = proj.mentorshipDetails;

  for (let i = 0; i < mentorshipDetails.length; i++) {
    if (mentorshipDetails[i].name === proj.mentorshipPackages[0].name) {
      mentorshipDetails[i].sessionsHeld += 1;
    }
  }
  proj.mentorshipDetails = mentorshipDetails;

  if (mentorshipPackage.numberOfSessionsRemaining === 1) {
    // let discardedPackage = proj.mentorshipPackages.splice(0, 1);
    proj.mentorshipPackages[0].packageCompleted = true;
    proj.markModified("mentorshipPackages");
    proj.markModified("mentorshipDetails");
    await proj.save();
    let randamnt;
    for (let i = 0; i < proj.team.length; i++) {
      randamnt = proj.team[i].pendingPayments.splice(0, 1);
      const user = await studentUser.findById(proj.team[i].id);
      for (let i = 0; i < user.pendingPayments.length; i++) {
        if (
          JSON.stringify(user.pendingPayments[i].projectID) ===
          JSON.stringify(proj._id)
        ) {
          let discardedPayment = user.pendingPayments[i].amounts.splice(0, 1);
        }
      }
      user.markModified("pendingPayments");
      await user.save();
    }
    proj.markModified("team");
    await proj.save();
  } else {
    proj.mentorshipPackages[0].numberOfSessionsRemaining -= 1;
    proj.markModified("mentorshipPackages");
    proj.markModified("mentorshipDetails");
    await proj.save();
  }

  res.send("Works");
});

router.post("/finishPackage", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  let mentorshipPackage = proj.mentorshipPackages[0];
  let mentorshipDetails = proj.mentorshipDetails;

  if (mentorshipPackage.packageCompleted === true) {
    let discardedPackage = proj.mentorshipPackages.splice(0, 1);
    proj.markModified("mentorshipPackages");
    proj.markModified("mentorshipDetails");
    await proj.save();
  }
  let io = req.io;
  await io.emit("packageCompleted", {
    id: proj._id,
    project: proj,
    package: mentorshipPackage,
  });

  for (let i = 0; i < proj.team.length; i++) {
    console.log(proj.team[i].name);
    let member = await studentUser.findOne({ email: proj.team[i].email });
    let notifications = member.notifications ? member.notifications : [];
    notifications.push({
      seen: false,
      type: "package",
      title: "Mentorship Package Completed! - " + proj.name,
      subtitle: "Mentorship Package Completed - " + mentorshipPackage.name,
      icon: mentorshipPackage.pic,
    });

    member.notifications = notifications;
    await member.markModified("notifications");
    await member.save();
  }

  res.send("Works");
});

router.post("/leaveProject", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const id = req.user._id;
  proj.team = proj.team.filter((member) => {
    return JSON.stringify(member.id) !== JSON.stringify(id);
  });
  proj.markModified("team");
  await proj.save();
  console.log(proj.team);

  const user = await studentUser.findById(req.user._id);
  user.projects = user.projects.filter((userproj) => {
    JSON.stringify(proj._id) !== JSON.stringify(userproj._id);
  });
  user.markModified("projects");
  await user.save();
  console.log(user.projects);

  user.pendingPayments = user.pendingPayments.filter((payment) => {
    JSON.stringify(proj) !== JSON.stringify(payment.projectID);
  });
  user.markModified("pendingPayments");
  await user.save();
  console.log(user.pendingPayments);

  const userProjects = user.projects;
  const projects = await project.find({ _id: { $in: userProjects } });
  res.send(projects);
});

router.post("/removeMember", auth, async (req, res) => {
  const proj = await project.findOne({ _id: req.body.projectID });
  const id = req.body.member.id;

  proj.team = proj.team.filter((mem) => {
    return JSON.stringify(mem.id) !== JSON.stringify(id);
  });
  proj.markModified("team");
  await proj.save();
  console.log(proj.team);

  const user = await studentUser.findById(req.body.member.id);
  user.projects = user.projects.filter((userproj) => {
    JSON.stringify(proj._id) !== JSON.stringify(userproj._id);
  });
  user.markModified("projects");
  await user.save();
  console.log(user.projects);

  user.pendingPayments = user.pendingPayments.filter((payment) => {
    JSON.stringify(proj) !== JSON.stringify(payment.projectID);
  });
  user.markModified("pendingPayments");
  await user.save();
  console.log(user.pendingPayments);

  res.send(user.projects);
});

module.exports = router;
