

function renderNew(states, sigma, delta, start, final){
    var options = {};
    var nodeData = [];
    for (var i of states){
        nodeData.push({"id" : i, label : i})
    }
    var ds1  = new vis.DataSet(nodeData,options);

    var edgeData = [];
    var deltastore = {};
    //stores delta as key value, with current node concateneted to symbol

    for (var j of delta){
         var s1 = j.charAt(1);
         var s2 = j.charAt(3);
         var char = j.charAt(5);
         var key = s1+char;
         deltastore[key] = s2;

         edgeData.push({from : s1, to: s2, label: char,  color : "black", arrows: { to: { enabled: true, scaleFactor: 1, type: "arrow" }   }})
    }
    var ds2 = new vis.DataSet(edgeData, options);
    //style start state green
    var idchanged = ds1.update({id: start, label: start, color : 'green'});

    //style final states
    for (var k of final) {
        ds1.update({"id" : k, color : 'red'})
    }

    var data = {nodes: ds1, edges: ds2};

    var localstore = [states, sigma, deltastore, start, final];
    //stores data (not as vis Dataset) for later use
    localStorage.setItem('data', JSON.stringify(localstore));


    var container = document.getElementById('network');
    var network = new vis.Network(container,data,options);
    document.getElementById("calc").style .visibility = "visible";

    return;
}




function renderParity() {
    var nodes = new vis.DataSet([
        {id: 0, label: 'Even'},
        {id: 1, label: 'Odd'}
    ]);
    var edges = new vis.DataSet([
        {from: "0", to: "1", label: 1},
        {from: "1", to: "0", label: 1},
        {from: "0", to: "0", label: 0},
        {from: "1", to: "1", label: 0}
    ]);
    var data = {nodes: nodes, edges: edges};
    var options = {};
    var container = document.getElementById('network');
    var network = new vis.Network(container, data, options);

}

