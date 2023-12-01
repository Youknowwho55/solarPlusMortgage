/** @format */

const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setHours(0, 0, 0, 0);

const endOfMonth = new Date();
endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
endOfMonth.setHours(23, 59, 59, 999);

const mtdStatistics = await Loan.aggregate([
  {
    $match: {
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      // Additional conditions if needed
    },
  },
  {
    $group: {
      _id: null,
      loansInProgress: {
        $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] },
      },
      newLoans: { $sum: { $cond: [{ $eq: ["$status", "New"] }, 1, 0] } },
      pendingLock: {
        $sum: { $cond: [{ $eq: ["$status", "Pending Lock"] }, 1, 0] },
      },
      ctc: { $sum: { $cond: [{ $eq: ["$status", "CTC"] }, 1, 0] } },
    },
  },
]);

const mtdStats = mtdStatistics[0]; // Assuming there's only one result

document.getElementById("loansInProgress").innerText = mtdStats.loansInProgress;
document.getElementById("newLoans").innerText = mtdStats.newLoans;
document.getElementById("pendingLock").innerText = mtdStats.pendingLock;
document.getElementById("ctc").innerText = mtdStats.ctc;
