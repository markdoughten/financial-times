//Sources: https://stackoverflow.com/questions/28047264/tables-with-row-and-column-headers
// https://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair?lq=1
// https://stackoverflow.com/questions/2620181/clear-table-jquery
// https://www.w3schools.com/js/js_if_else.asp

//Remove extra spaces from the stock forms
function removeSpaces(string) {
 return string.split(' ').join('');
}

// Construct the table data based on the stock information, id attribute to identify right or left
function makeBody(stocks, keys, id) {
    if(id === 1){
    clearTable(1)
    const row = $("<tr class='stocks'>");
    $(".stock-data-head-1").append(row);
    appendRow(keys[0], stocks[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        const row = $("<tr class='stocks'>");
        $(".stock-data-body-1").append(row);
        appendRow(keys[j], stocks[keys[j]], row)
    }
} else {
    clearTable(2)
    const row = $("<tr class='stocks'>");
    $(".stock-data-head-2").append(row);
    appendRow(keys[0], stocks[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        const row = $("<tr class='stocks'>");
        $(".stock-data-body-2").append(row);
        appendRow(keys[j], stocks[keys[j]], row)
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
            const keys = Object.keys(data)
            //console.log(keys)
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

//Ajax call for the left stock form
    $("#stocks-2").submit(function (event) {
        event.preventDefault();
        let getUrl = $(this).attr("action");
        let requestMethod = $(this).attr("method");
        let formValues = $(this).serialize();
        $.ajax({
            url: getUrl + formValues,
            type: requestMethod,
            success: function (data) {
                const keys = Object.keys(data)
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
        row.append($("<td class='stock-data-row'>" + key + "</td>"));
        row.append($("<td class='stock-data-row'>" + data + "</td>"));
    }

    function errorDetected(body) {
        if (body === 1) {
            const row = $("<tr class='error'>");
            $(".stock-data-head-1").append(row);
            row.append($("<td class='error'>Stock not found. Please try again!</td>"));
        } else {
            const row = $("<tr class='error'>");
            $(".stock-data-head-2").append(row);
            row.append($("<td class='error'>Stock not found. Please try again!</td>"));
        }
    }

    function clearTable(body) {
        if (body === 1) {
            $(".stock-data-head-1 tr").remove();
            $(".stock-data-body-1 tr").remove();
        } else {
            $(".stock-data-head-2 tr").remove();
            $(".stock-data-body-2 tr").remove();
        }
    }

