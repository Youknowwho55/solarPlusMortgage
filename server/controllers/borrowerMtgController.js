/** @format */

const models = require("../models/borrowerMtg");
const BorrowerMtg = models.BorrowerMtg;

exports.getBorrowerMtgEdit = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Edit",
      description: "Edit the borrowers information",
    };
    res.render("borrowersMtg/edit", { locals, borrowerMtg: borrowerMtg });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBorrowerMtgById = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Custimer",
      description: "Get the borrowers identification",
    };
    res.render("borrowersMtg/mainFile", {
      locals,
      borrowerMtg: borrowerMtg,
      layout: "../views/layouts/dashboardLayout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//the ID might now work., its not getting called>
exports.createBorrowerMtg = async (req, res) => {
  const locals = {
    title: "Create",
    description: "Create a new borrower",
  };

  await saveBorrowerMtgAndRender(req, res, "edit", locals);
};

exports.updateBorrowerMtg = async (req, res) => {
  const locals = {
    title: "Update",
    description: "Update borrower",
  };

  await saveBorrowerMtgAndRender(req, res, "edit", locals);
};

exports.updatePeople = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Update",
      description: "Update people associated with the file",
    };
    res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
  } catch (error) {
    console.error(error);
    res.render("borrowersMtg/edit", { borrowerMtg: borrowerMtg });
  }
};

// keeping this it might be the way to solve my error
// async function (req, res) {
//   const borrowerMtg = await BorrowerMtg.findById(req.params.id);
//   // Update borrowerMtg properties related to people
//   try {
//     // Save updated borrowerMtg
//     res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
//   } catch (e) {
//     res.render("borrowersMtg/edit", { borrowerMtg: borrowerMtg });
//   }
// }

exports.deleteBorrowerMtg = async (req, res) => {
  try {
    await BorrowerMtg.findByIdAndDelete(req.params.id);
    const locals = {
      title: "Delete",
      description: "Delete the borrower",
    };
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// function savePeople(path) {
//   return async (req, res) => {
//     let borrowerMtg = req.borrowerMtg;
//     borrowerMtg.loanOfficer = req.body.loanOfficer;
//     borrowerMtg.processor = req.body.processor;
//     borrowerMtg.referral = req.body.referral;

//     try {
//       borrowerMtg = await borrowerMtg.save();
//       res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
//     } catch (e) {
//       res.render(`borrowersMtg/${path}`, { borrowerMtg: borrowerMtg });
//     }
//   };
// }

async function saveBorrowerMtgAndRender(req, res, path, locals) {
  let borrowerMtg;

  try {
    borrowerMtg = req.params.id
      ? await BorrowerMtg.findById(req.params.id)
      : new BorrowerMtg();

    borrowerMtg.firstName = req.body.firstName;
    borrowerMtg.lastName = req.body.lastName;
    borrowerMtg.phoneNumber = req.body.phoneNumber;
    borrowerMtg.email = req.body.email;
    borrowerMtg.loanOfficer = req.body.loanOfficer;

    borrowerMtg = await borrowerMtg.save();

    res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
  } catch (error) {
    console.error(error);
    res.render(`borrowersMtg/${path}`, {
      borrowerMtg: borrowerMtg,
      locals: locals,
    });
  }
}
