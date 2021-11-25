//Sources: https://stackoverflow.com/questions/28047264/tables-with-row-and-column-headers
// https://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair?lq=1
// https://stackoverflow.com/questions/2620181/clear-table-jquery
// https://www.w3schools.com/js/js_if_else.asp

//Remove extra spaces from the company forms
function removeSpaces(string) {
 return string.split(' ').join('');
}

// Construct the table data based on the company information, id attribute to identify right or left
function makeBody(company, keys, body) {
    if(body === 1){
    clearTable(1)
    const row = $("<tr class='company'>");
    $(".company-data-head-1").append(row);
    appendRow(keys[0], company[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        if (j % 2 === 0){
            const row = $("<tr class='even-company'>");
            $(".company-data-body-1").append(row);
            appendRow(keys[j], company[keys[j]], row)}
        else {
            const row = $("<tr class='odd-company'>");
            $(".company-data-body-1").append(row);
            appendRow(keys[j], company[keys[j]], row)}
            }
        }
     else {
    clearTable(2)
    const row = $("<tr class='company'>");
    $(".company-data-head-2").append(row);
    appendRow(keys[0], company[keys[0]], row)
    for(var j = 1; j < keys.length; j++) {
        if (j % 2 === 0){
            const row = $("<tr class='even-company'>");
            $(".company-data-body-2").append(row);
            appendRow(keys[j], company[keys[j]], row)
        }
        else{
            const row = $("<tr class='odd-company'>");
            $(".company-data-body-2").append(row);
            appendRow(keys[j], company[keys[j]], row)

        }

    }
    }
}

//Ajax call for the left company form
$( "#company-1" ).submit(function(event) {
  event.preventDefault();
  const getUrl = $(this).attr("action");
  const requestMethod = $(this).attr("method");
  const formValues = $(this).serialize();
      $.ajax({
        url: getUrl + formValues,
        type: requestMethod,
        success: function(data){
            const keys = Object.keys(data)
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
        const getUrl = $(this).attr("action");
        const requestMethod = $(this).attr("method");
        const formValues = $(this).serialize();
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

        var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0

        });

        row.append($("<td class='company-data-row'>" + key + "</td>"));
        const financials = ['EBITDA','MarketCapitalization','RevenueTTM','GrossProfitTTM', 'SharesOutstanding'];
        if(financials.includes(key)) {
            data = formatter.format((data/1000)) + "M";
        }
        row.append($("<td class='company-data-row'>" + data + "</td>"));
    }

    function errorDetected(body) {
        if (body === 1) {
            const row = $("<tr class='error'>");
            $(".company-data-head-1").append(row);
            row.append($("<td class='error'>Company not found. Please try again!</td>"));
        } else {
            const row = $("<tr class='error'>");
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

