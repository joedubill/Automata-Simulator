
let isError = false;

function parseDFA(statesf, sigmaf, deltf, startf, finalf){

    //gets set of states
    statesf = ""+statesf;
    var statesList = verifyDFAStates(statesf);
    if (isError){return;}

    //gets set of symbols
    sigmaf = ""+sigmaf;
    var sigma = verifyDFAAlphabet(sigmaf);
    if (isError){return;}

    //gets  array of strings of the format (i,j,k)
    deltf = ""+deltf;
    var delta = verifyDFADelta(deltf, statesList, sigma);
    if (isError){return;}

    //gets start state
    startf = ""+startf;
    var start = verifyDFAStart(startf, statesList);
    if (isError){return;}

    //gets set of final states
    finalf = ""+finalf;
    var final = verifyDFAFinal(finalf, statesList);
    if (isError){return;}

    document.getElementById('message').textContent = "";
    renderNew(statesList, sigma, delta, start, final);

    return;
}




function verifyDFAStates(states){
    if (states.empty){
        document.getElementById("message").textContent = "Must enter input for states";
        isError = true;
        return;
    }
    //remove parenthesis and set message for input error
    if (states.charAt(0) === "(" && states.charAt(states.length - 1) === ")"){
        states = states.substring(1, states.length - 1);
    }else{
        document.getElementById("message").textContent = "State input must be enclosed in a single pair of parenthesis";
        isError = true;
        return;
    }
    //regex match to verify csv integers
    var pattern = /^[0-9]+(,[0-9]+)*$/;
    if (pattern.test(states)){
        var s1 = states.split(",");
    }else{
        document.getElementById("message").textContent = "State values inside parenthesis must follow pattern i,j,k,...,l where i j k and l are integers, without any spaces";
        isError = true;
        return;
    }
    //check for duplicates by passing into a new set
    var s2 = getDistinctArray(s1);
    return s2;
}


function verifyDFAAlphabet(sig){
    if (sig.empty){
        document.getElementById("message").textContent = "Must enter input for alphabet";
        isError = true;
        return;
    }
    //remove parenthesis
    if (sig.charAt(0) === "(" && sig.charAt(sig.length - 1) === ")"){
        sig = sig.substring(1, sig.length - 1);
    }
    else{
        document.getElementById("message").textContent = "Alphabet input must be enclosed in a single pair of parenthesis";
        isError = true;
        return;
    }
    //regex match to verify csv integers
    var pattern =  /^(.)(,.)*$/;
    if (pattern.test(sig)){
        //get states array
        var s1 = sig.split(",");
    }else{
        document.getElementById("message").textContent = "Alphabet values inside parenthesis must follow pattern i,j,k,...,l where i j k and l are symbols, without any spaces";
        isError = true;
        return;
    }
    //check for duplicates by passing into a new set
    var s2 = getDistinctArray(s1);
    return s2;
}





function verifyDFADelta(delt, states, sigma){
    if (delt.empty){
        document.getElementById("message").textContent = "Must enter input for transition function";
        isError = true;
        return;
    }
    //remove brackets
    if (delt.charAt(0) === "{" && delt.charAt(delt.length - 1) === "}"){
        delt = delt.substring(1, delt.length - 1);
    }
    else{
        document.getElementById("message").textContent = "Transition function input must be enclosed in a single pair of brackets";
        isError = true;
        return;
    }
    //matches general pattern - ignores specific symbol values at first
    var pattern = /^[(][0-9]+[,][0-9]+[,].[)]([,][(][0-9]+[,][0-9]+[,].[)])*$/;
    if (pattern.test(delt)){
        //get transitions array by splitting on commas
        //fix bug that removes last tranition
        var s1 = [];
        var trip;
        for (var i=0; !(i + 7 > delt.length); i= i+8){
            if (i+7 == delt.length){
                trip = delt.substring(i);
            }else {
                trip = delt.substring(i, i + 7);
            }
            s1.push(trip);
        }
    }else{
        document.getElementById("message").textContent = "Transitions must follow format {(s1,s2,char),(s3,s4, char),...,(sn,sn,char)} without any spaces";
        isError = true;
        return;
    }

    //Check for duplicate transitions
    for (var i=0; i < s1.length; i++){
        var trans = s1[i];
        var state1 = trans.charAt(1);
        var state2 = trans.charAt(3);
        var char = trans.charAt(5);
        if (! states.includes(state1) || ! states.includes(state2)){
            document.getElementById("message").textContent = "States included in transition function must be in Q";
            isError = true;
            return;
        }
        if (! sigma.includes(char)){
            document.getElementById("message").textContent = "Transition symbols must be a part of the alphabet";
            isError = true;
            return;
        }
    }
    var s2 = getDistinctArray(s1);
    return s2;
}



function verifyDFAStart(start, states){
    var startState;
    if (start.empty){
        document.getElementById("message").textContent = "Must enter input for start state";
        isError = true;
        return;
    }
    //matches a single integer
    var pattern = /^[0-9]+$/;
    if (pattern.test(start)) {
        if (states.includes(start)) {
            startState = parseInt(start);
            return startState;
        }else{
            document.getElementById("message").textContent = "Start state must be included in set of states";
            isError = true;
            return;
        }
    }else{
        document.getElementById("message").textContent = "Start state must be a single integer with no spaces";
        isError = true;
        return;
    }
    return;
}



function verifyDFAFinal(fstates, states){
    if (fstates.empty){
        document.getElementById("message").textContent = "Must enter input for final states";
        isError = true;
        return;
    }
    //remove parenthesis and set message for input error
    if (fstates.charAt(0) === "(" && fstates.charAt(fstates.length - 1) === ")"){
        fstates = fstates.substring(1, fstates.length - 1);
    }else{
        document.getElementById("message").textContent = "Final state input must be enclosed in a single pair of parenthesis";
        isError = true;
        return;
    }
    //regex match to verify csv integers
    var pattern = /^[0-9]+(,[0-9]+)*$/;
    if (pattern.test(fstates)){
        var s1 = fstates.split(",");
    }else{
        document.getElementById("message").textContent = "Final state values inside parenthesis must follow pattern i,j,k,...,l where i j k and l are integers, without any spaces";
        isError = true;
        return;
    }

    //check that all final states are in Q
    for (var s of s1){
        if (!states.includes(s)){
            document.getElementById("message").textContent = "Set of final states must be a subset of the set of all states";
            isError = true;
            return;
        }
    }

    //check for duplicates by passing into a new set
    var s2 = getDistinctArray(s1);
    return s2;
}


function getDistinctArray(arr) {
    return [...new Set(arr)];
}

