//Sources: https://stackoverflow.com/questions/28047264/tables-with-row-and-column-headers
// https://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair?lq=1
// https://stackoverflow.com/questions/2620181/clear-table-jquery
// https://www.w3schools.com/js/js_if_else.asp

//Remove extra spaces from the stock forms
function removeSpaces(string) {
 return string.split(' ').join('');
}

// Construct the table data based on the stock information, id attribute to identify right or left
function makeBody(data, keys, id) {
    if(id === 1){
    console.log(keys);
    $(".stock-data-head-1 tr").remove();
    $(".stock-data-body-1 tr").remove();
    const row = $("<tr class='stocks'>");
    $(".stock-data-head-1").append(row);
    row.append($("<td class='stock-data-row'>" + keys[0] + "</td>"));
    row.append($("<td class='stock-data-row'>" + data[keys[0]] + "</td>"));
    for(var j = 1; j < keys.length; j++) {
        const row = $("<tr class='stocks'>");
        $(".stock-data-body-1").append(row);
        row.append($("<td class='stock-data-row'>" + keys[j] + "</td>"));
        row.append($("<td class='stock-data-row'>" + data[keys[j]] + "</td>"));
    }
} else {
    console.log(keys);
    $(".stock-data-head-2 tr").remove();
    $(".stock-data-body-2 tr").remove();
    const row = $("<tr class='stocks'>");
    $(".stock-data-head-2").append(row);
    row.append($("<td class='stock-data-row'>" + keys[0] + "</td>"));
    row.append($("<td class='stock-data-row'>" + data[keys[0]] + "</td>"));
    for(var j = 1; j < keys.length; j++) {
        const row = $("<tr class='stocks'>");
        $(".stock-data-body-2").append(row);
        row.append($("<td class='stock-data-row'>" + keys[j] + "</td>"));
        row.append($("<td class='stock-data-row'>" + data[keys[j]] + "</td>"));
    }
    }
}

//Ajax call for the left stock form
$( "#stocks-1" ).submit(function(event) {
  event.preventDefault();
  let getUrl = $(this).attr("action");
  let requestMethod = $(this).attr("method");
  let formValues = $(this).serialize();
      $.ajax({
        url: getUrl + formValues,
        type: requestMethod,
        success: function(data){
            if (data !== 0) {
                const keys = Object.keys(data)
                makeBody(data, keys, 1);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});

//Ajax call for the left stock form
$( "#stocks-2" ).submit(function(event) {
  event.preventDefault();
  let getUrl = $(this).attr("action");
  let requestMethod = $(this).attr("method");
  let formValues = $(this).serialize();
      $.ajax({
        url: getUrl + formValues,
        type: requestMethod,
        success: function(data){
            if (data !== 0) {
                const keys = Object.keys(data)
                makeBody(data, keys, 2);
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});