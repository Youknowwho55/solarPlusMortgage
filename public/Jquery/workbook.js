/** @format */

$(document).ready(function () {
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

  // Define a custom JavaScript function
  function myCustomFunction() {
    alert("Hello from my custom function!");
  }

  // Call the custom function when a button with the ID "myButton" is clicked
  $("#myButton").click(function () {
    myCustomFunction();
  });
});
