//Sources: https://stackoverflow.com/questions/28047264/tables-with-row-and-column-headers
// https://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair?lq=1
// https://stackoverflow.com/questions/2620181/clear-table-jquery
// https://www.w3schools.com/js/js_if_else.asp

//Remove extra spaces from the company forms
function removeSpaces(string) {
    return string.split(' ').join('');
}

// varruct the table data based on the company information, id attribute to identify right or left
function makeBody(company, keys, body) {
    if(body === 1){
    clearTable(1)
    var row = $("<tr class='company'>");
    $(".company-data-head-1").append(row);
    appendRow(keys[0], company[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        if (j % 2 === 0){
            var row = $("<tr class='even-company'>");
            $(".company-data-body-1").append(row);
            appendRow(keys[j], company[keys[j]], row)}
        else {
            var row = $("<tr class='odd-company'>");
            $(".company-data-body-1").append(row);
            appendRow(keys[j], company[keys[j]], row)}
            }
        }
     else {
    clearTable(2)
    var row = $("<tr class='company'>");
    $(".company-data-head-2").append(row);
    appendRow(keys[0], company[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        if (j % 2 === 0){
            var row = $("<tr class='even-company'>");
            $(".company-data-body-2").append(row);
            appendRow(keys[j], company[keys[j]], row)
        }
        else{
            var row = $("<tr class='odd-company'>");
            $(".company-data-body-2").append(row);
            appendRow(keys[j], company[keys[j]], row)

        }

    }
    }
}

function camelCase (key) {
    var temp = key[0]
    for (i = 1; i < key.length; i++) {
        var hasNextCap = false;
        var hasPrevCap = false;

    var charValue = key.charCodeAt(i);
    if (charValue > 64 && charValue < 91) {
        if (key.length > i + 1) {
            var next_charValue = key.charCodeAt(i + 1);
            if (next_charValue > 64 && next_charValue < 91)
                hasNextCap = true;
        }
        if (i - 1 > -1) {
            var prev_charValue =  key.charCodeAt(i - 1);
            if (prev_charValue > 64 && prev_charValue < 91)
                hasPrevCap = true;
        }
        if (i < key.length-1 &&
            (!(hasNextCap && hasPrevCap || hasPrevCap)
            || (hasPrevCap && !hasNextCap)))
            temp += " ";
        }
    temp += key[i];
    }
    return temp;
}

//Ajax call for the left company form
$( "#company-1" ).submit(function(event) {
  event.preventDefault();
  var getUrl = $(this).attr("action");
  var requestMethod = $(this).attr("method");
  var formValues = $(this).serialize();
      $.ajax({
        url: getUrl + formValues,
        type: requestMethod,
        success: function(data){
            var keys = Object.keys(data)
            if (keys.length !== 0) {
                makeBody(data, keys, 1);
            }
            else {
                clearTable(1)
                errorDetected(1)
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});

//Ajax call for the left company form
$("#company-2").submit(function (event) {
    event.preventDefault();
    var getUrl = $(this).attr("action");
    var requestMethod = $(this).attr("method");
    var formValues = $(this).serialize();
    $.ajax({
        url: getUrl + formValues,
        type: requestMethod,
        success: function (data) {
            var keys = Object.keys(data)
            if (keys.length !== 0) {
                makeBody(data, keys, 2);
            } else {
                clearTable(2)
                errorDetected(2)
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});



function appendRow(key, data, row) {

    var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
    });
    key = camelCase(key);
    row.append($("<td class='company-data-row'>" + key + "</td>"));
    var financials = ['EBITDA','Market Capitalization','Revenue TTM','Gross Profit TTM'];
    if(financials.includes(key)) {
        data = formatter.format((data/1000)) + "M";
    }
    row.append($("<td class='company-data-row'>" + data + "</td>"));
}

function errorDetected(body) {
    if (body === 1) {
        var row = $("<tr class='error'>");
        $(".company-data-head-1").append(row);
        row.append($("<td class='error'>Company not found. Please try again!</td>"));
    } else {
        var row = $("<tr class='error'>");
        $(".company-data-head-2").append(row);
        row.append($("<td class='error'>Company not found. Please try again!</td>"));
    }
}

function clearTable(body) {
    if (body === 1) {
        $(".company-data-head-1 tr").remove();
        $(".company-data-body-1 tr").remove();
    } else {
        $(".company-data-head-2 tr").remove();
        $(".company-data-body-2 tr").remove();
    }
}

