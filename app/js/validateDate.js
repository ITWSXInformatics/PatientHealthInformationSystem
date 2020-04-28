// assume the userid is stored at sessionstorage as userId:
// https://stackoverflow.com/questions/11609376/share-data-between-html-pages:
// https://healthservices.atlassian.net/wiki/spaces/HSPC/pages/64585802/How+to+Get+the+Current+User
// document.getElementById("holder").style.display = "none";
// document.getElementById("loading").style.display = "block";


// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
// credits goes to https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript


function validate(){

    //check valid input
    var startDay = $('#start').val();
    var endDay =$('#end').val();

    // window.alert("line108");
    return checkInputValidation(startDay, endDay);
}

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);

    // get current date
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDay = today.getDate();

    console.log(currentYear);
    console.log(currentMonth);
    console.log(currentDay);

    // Check the ranges of month and year
    if(year < 1000 || year > currentYear || month == 0 || month > 12)
        return false;

    if (year == currentYear && month > currentMonth) {
        return false;
    }

    if (year == currentYear && month == currentMonth && day > currentDay) {
      return false;
    }

    var monthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthDays[1] = 29;


    // Check the range of the day
    return day > 0 && day <= monthDays[month - 1];
};

function checkInputValidation(startDay, endDay) {

  // the start date must be a valid date
  if (!isValidDate(startDay)){
     window.alert("Start Date is not valid");
      return 0;}

  // the end date must be a valid date
  else if (!isValidDate(endDay)){
     window.alert("End Date is not valid");
     return 0;}

  // the start date must be no later than end date
  else if (Date.parse(startDay) > Date.parse(endDay)){
    window.alert("End Date should no earlier than start Date");
    return 0;}

  return 1;
};
