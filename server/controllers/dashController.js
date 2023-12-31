/** @format */
const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");
const multer = require("multer");

const User = require("../models/user");

const statusOrder = [
  "new",
  "nos",
  "sold",
  "doco",
  "awc",
  "und",
  "ctc",
  "fun",
  "comp",
];

exports.dashSales = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find();
  const user = await User.findById(req.user.id).populate("borrowerMtg");

  const locals = {
    title: "Dashboard",
    description: "View your personalized Sales dashboard",
    user: user,
  };
  const filteredBorrowerMtg = borrowermtgs.filter(
    (borrowerMtg) =>
      borrowerMtg.user && borrowerMtg.user.toString() === user._id.toString()
  );

  // Sort the borrowermtgs based on the specified order
  const sortedBorrowerMtg = borrowermtgs.sort((a, b) => {
    const statusAIndex = statusOrder.indexOf(a.loanStatus);
    const statusBIndex = statusOrder.indexOf(b.loanStatus);

    if (statusAIndex === -1) {
      return 1; // move items with unknown status to the end
    }

    if (statusBIndex === -1) {
      return -1; // move items with unknown status to the end
    }

    return statusAIndex - statusBIndex;
  });

  res.render("mainDashboard/salesDashboard", {
    locals,
    sortedBorrowerMtg: sortedBorrowerMtg,
    filteredBorrowerMtg: filteredBorrowerMtg,

    user: user,
    borrowermtgs: user.borrowerMtg,
  });
};

exports.dashSolar = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find();
  const user = await User.findById(req.user.id).populate("borrowerMtg");

  const locals = {
    title: "Dashboard",
    description: "Main Dashboard for Sales professionals",
  };
  // Sort the borrowermtgs based on the specified order
  const sortedBorrowerMtg = borrowermtgs.sort((a, b) => {
    const statusAIndex = statusOrder.indexOf(a.loanStatus);
    const statusBIndex = statusOrder.indexOf(b.loanStatus);

    if (statusAIndex === -1) {
      return 1; // move items with unknown status to the end
    }

    if (statusBIndex === -1) {
      return -1; // move items with unknown status to the end
    }

    return statusAIndex - statusBIndex;
  });
  res.render("mainDashboard/solarDashboard", {
    locals,
    borrowermtgs: borrowermtgs,
    sortedBorrowerMtg: sortedBorrowerMtg,
    user,
  });
};

//Direct to the Admin Dashboard
exports.getAdmin = async (req, res) => {
  const users = await User.find().sort({
    createdAt: "desc",
  });
  const user = await User.findById(req.user.id);

  const locals = {
    title: "Admin",
    description: "Admin Dashboard",
  };
  res.render("mainDashboard/adminDashboard", {
    locals,
    users: users,
    user,
  });
};

exports.dashProcessing = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find().sort({
    createdAt: "desc",
  });
  const user = await User.findById(req.user.id).populate("borrowerMtg");

  const locals = {
    title: "Dashboard",
    description: "Main Dashboard for Sales professionals",
  };
  res.render("mainDashboard/processorDashboard", {
    locals,
    borrowermtgs: borrowermtgs,
    user,
  });
};

exports.dashSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const locals = {
      title: "Settings",
      description: "User Settings",
      user: user,
    };
    res.render("settings/salesSettings", { locals, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// exports.postProfileUpload = async (req, res) => {
//   try {
//     // Handle file upload and store the URL in the user's profilePhotoUrl field
//     const user = await User.findById(req.user._id); // Assuming you have user authentication
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Process the uploaded file and save it to your database or storage service
//     // In this example, we'll use a placeholder URL
//     const profilePhotoUrl = "http://example.com/path/to/profile-photo.jpg";

//     // Update the user's profilePhotoUrl field
//     user.profilePhotoUrl = profilePhotoUrl;
//     await user.save();

//     res.json({ success: true, profilePhotoUrl });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

// add random other pages that are main like About, FAQ, Help
