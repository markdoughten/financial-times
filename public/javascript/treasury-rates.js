//Construct the table from the json data for the treasury rate table
function makeTable(data) {
            for(var j = 0; j < data.length; j++) {
                if(j % 2 === 0){
                    if(j === 0) {
                        var row = $("<tr class='title'>");
                        for (var i = 0; i < data[j].length; i++) {
                            row.append($("<td class='category'>" + data[j][i] + "</td>"));
                        }
                    } else {
                        var row = $("<tr class='even-rates'>");
                        for(var i = 0; i < data[j].length; i++) {
                            row.append($("<td class='category'>" + data[j][i] + "</td>"));
                        }

                    }
                $(".treasury-rates").append(row);
                }
                else {
                var row = $("<tr class='odd-rates'>");
                for(var i = 0; i < data[j].length; i++) {
                    row.append($("<td class='category'>" + data[j][i] + "</td>"));
                }
                $(".treasury-rates").append(row);
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
                console.log(data.data[0][0]);
                makeTable(data.data);
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});