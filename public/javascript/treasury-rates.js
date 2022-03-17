//Construct the header for the treasury rate table
function makeHeader(data, keys) {
        var row = $("<tr class='dates'>");
        var dateKeys = Object.keys(data.data.Date[keys[0]]);
        if (data !== 0) {
        $(".treasury-rates-head").append(row);
        row.append($("<th></th>"));
        var years = ["1 yr", "2 yr","3 yr","3 yr","5 yr","7 yr"];
        for(var i = 0; i < dateKeys.length; i++) {
            if(years.includes(dateKeys[i])) {
                row.append($("<th class ='year'>" + dateKeys[i] + "</th>"));
                row.append($("<th class='space'></th>"));
            } else {
                row.append($("<th>" + dateKeys[i] + "</th>"));
                row.append($("<th class='space'></th>"));
            }
        }
    }
}

//Contruct the body for the treasury rate table
function makeBody(data, keys) {
            var dateKeys = Object.keys(data.data.Date[keys[0]]);
            for(var j = 0; j < keys.length; j++) {
                if (j % 2 === 0) {
                    var row = $("<tr class='even-rates'>");
                    row.append($("<td class='category'>" + keys[j] + "</td>"));
                    for (var x = 0; x < dateKeys.length; x++) {
                        $(".treasury-rates-body").append(row);
                        row.append($("<td class='grid'>" + data.data.Date[keys[j]][dateKeys[x]] + "</td>"));
                        row.append($("<td class='space'></td>"));
                }
                } else {
                    var row = $("<tr class='odd-rates'>");
                    row.append($("<td class='category'>" + keys[j] + "</td>"));
                    for (var x = 0; x < dateKeys.length; x++) {
                        $(".treasury-rates-body").append(row);
                        row.append($("<td class='grid'>" + data.data.Date[keys[j]][dateKeys[x]] + "</td>"));
                        row.append($("<td class='space'></td>"));
                }

                }
            }
}

//When the page has loaded.
$( document ).ready(function(){
    //Perform Ajax request.
    $.ajax({
        url: '/treasury-scraper',
        type: 'get',
        success: function(data){
            if (data !== 0) {
                var keys = Object.keys(data.data.Date)
                makeHeader(data, keys);
                makeBody(data, keys);
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});