/** @format */
const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

// Now you can use BorrowerMtg, MortgageLoan, and Employer directly.

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
      title: "Customer",
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
