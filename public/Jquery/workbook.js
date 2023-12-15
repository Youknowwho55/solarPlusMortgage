/** @format */

// Change the text of an element with the ID "monthlySavings" to "New Text"
$("#monthlySavings").text("New Text");

var value1 = parseInt($("#value1").text());
var value2 = parseInt($("#value2").text());

var additionResult = value1 + value2;
var subtractionResult = value1 - value2;
var multiplicationResult = value1 * value2;

$("#result").text(
  "Result (Addition): " +
    additionResult +
    ", Subtraction: " +
    subtractionResult +
    ", Multiplication: " +
    multiplicationResult
);

$(document).ready(function () {
  var ids = {
    monthlySavings: $("#monthlySavings"),
    annualSavings: $("#annualSavings"),
    debtPaid: $("#debtPaid"),
    adjtoFix: $("#adjtoFix"),
    termReduction: $("#termReduction"),
    paymentmReduction: $("#paymentmReduction"),
    recoup: $("#recoup"),
    PropertyType: $("#PropertyType"),
    occupancy: $("#occupancy"),
    loanType: $("#loanType"),
    newTerm: $("#newTerm"),
    loanPurpose: $("#loanPurpose"),
    appraisalWaiver: $("#appraisalWaiver"),
    loanBalance: $("#loanBalance"),
    payment: $("#payment"),
    oldTerm: $("#oldTerm"),
    oldRate: $("#oldRate"),
    sub: $("#sub"),
    marketValue: $("#marketValue"),
    salesPrice: $("#salesPrice"),
    downPayment: $("#downPayment"),
    baseLoanAmount: $("#baseLoanAmount"),
    subordinatedAmount: $("#subordinatedAmount"),
    ffUmip: $("#ffUmip"),
    umipRefund: $("#umipRefund"),
    totalLoanAmount: $("#totalLoanAmount"),
    noteRate: $("#noteRate"),
    LTVvalue: $("#LTVvalue"),
    CLTVvalue: $("#CLTVvalue"),
    existingPI: $("#existingPI"),
    proposedPI: $("#proposedPI"),
    existingTaxes: $("#existingTaxes"),
    proposedTaxes: $("#proposedTaxes"),
    escrowTaxes: $("#escrowTaxes"),
    existingInsurance: $("#existingInsurance"),
    proposedInsurance: $("#proposedInsurance"),
    escrowInsurance: $("#escrowInsurance"),
    existingFloodInsurance: $("#existingFloodInsurance"),
    proposedFloodInsurance: $("#proposedFloodInsurance"),
    escrowFloodInsurance: $("#escrowFloodInsurance"),
    existingPMI: $("#existingPMI"),
    proposedPMI: $("#proposedPMI"),
    proposedPMIamount: $("#proposedPMIamount"),
    existingHOA: $("#existingHOA"),
    proposedHOA: $("#proposedHOA"),
    existingmortgagePayment: $("#existingmortgagePayment"),
    proposedmortgagePayment: $("#proposedmortgagePayment"),
    overageShartage: $("#overageShartage"),
    debtPaydown: $("#debtPaydown"),
    existingObligation: $("#existingObligation"),
    proposedObligation: $("#proposedObligation"),
    thirdPartyFees: $("#thirdPartyFees"),
    appraisalFee: $("#appraisalFee"),
    investorFee: $("#investorFee"),
    paymentPadTaxes: $("#paymentPadTaxes"),
    paymentPadInsurace: $("#paymentPadInsurace"),
    lenderCredit: $("#lenderCredit"),
    closingCosts: $("#closingCosts"),
    cashOutAmount: $("#cashOutAmount"),
    debtorName: $("#debtorName"),
    creditType: $("#creditType"),
    balanceTotal: $("#balanceTotal"),
    monthlyDebtPayment: $("#monthlyDebtPayment"),
    omitDebt: $("#omitDebt"),
    paydebt: $("#paydebt"),
    termDebt: $("#termDebt"),
    rateDebt: $("#rateDebt"),
    frontRatio: $("#frontRatio"),
    backRatio: $("#backRatio"),
    borrowersIncome: $("#borrowersIncome"),
    coborrowersIncome: $("#coborrowersIncome"),
  };

  // You can access and manipulate the elements using the 'ids' object.
  // For example, to get the value of #monthlySavings:
  var monthlySavingsValue = ids.monthlySavings.val();

  // To set the value of #annualSavings:
  ids.annualSavings.val("New Value");

  // You can perform similar operations for other elements as needed.
});

// Get the values of totalLoanAmount and marketValue
var baseLoanAmountValue = ids.baseLoanAmountAmount.val();
var totalLoanAmountValue = ids.totalLoanAmount.val();
var marketValueValue = ids.marketValue.val();

// Do whatever processing or calculations you need with these values

// Save the values in CLTVvalue
ids.CLTVvalue.val(baseLoanAmountValue + marketValueValue);

// Assuming totalLoanAmount and marketValue are input fields
$("#totalLoanAmount, #marketValue").on("input", function () {
  updateCLTVValue();
});

function updateCLTVValue() {
  var totalLoanAmountValue = parseFloat(ids.totalLoanAmount.val()) || 0;
  var marketValueValue = parseFloat(ids.marketValue.val()) || 0;

  ids.CLTVvalue.val(totalLoanAmountValue + marketValueValue);
}

$("#baseLoanAmount, #marketValue").on("input", function () {
  updateLTVValue();
});

function updateLTVValue() {
  var baseLoanAmountValue = parseFloat(ids.baseLoanAmountAmount.val()) || 0;
  var marketValueValue = parseFloat(ids.marketValue.val()) || 0;

  ids.CLTVvalue.val(baseLoanAmountValue / marketValueValue);
}
