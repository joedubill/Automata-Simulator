


function runInput(str){

    var data = JSON.parse(localStorage.getItem('data'));
    var states = data[0];
    var sigma = data[1];
    var delta = data[2];
    var start = data[3];
    var final = data[4];

    var currentState = start;
    for (var i =0; i<str.length; i++){

        var current = str.charAt(i);
        if (!sigma.includes(current)){
            document.getElementById("Inputmessage").textContent = "Input strings must contain only symbols found in the alphabet";
            return;
        }

        var accessor = currentState+current;

        currentState = delta[accessor];

    }
    var acceptance;
    if (final.includes(currentState)){

        acceptance = "Accept";

    }else{

        acceptance = "Reject";
    }

    var table = document.getElementById('outputtable');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = str;
    cell2.innerHTML = acceptance;





}


