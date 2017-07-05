var jqueryFunction;

var woodColors = {
   "Ebony": "#292117",
   "Jatoba": "#B56816",
   "Maple": "#FDE96D",
   "Purpleheart": "#AF0B7B",
   "Walnut": "#4B351A" };

function drawGlueUp(){
    var c = document.getElementById("glueUp");
    var ctx = c.getContext("2d");
    var tbl = document.getElementById("wood_list");
    var row = tbl.getElementsByTagName("tr");
    var rowLength = row.length;
    var opt = document.getElementsByTagName("select");
    // add for loop
    var wood_rows = opt.length;
    var planks = []

    // Get number of planks
    var planksheight = Math.floor(150/wood_rows)
    for (var i=0; i< wood_rows; i++){
        planks.push(opt[i].value);
        ctx.fillStyle = opt[i].value;
        ctx.fillRect(0,i*planksheight, 250,planksheight);
    }
    //console.log(planks);
    //console.log(opt[0].options[opt.optionsIndex].text);
    //var sel = opt[0].value;
    //console.log(sel);
}

function addRow() {
    var table = document.getElementById("wood_list");
    var rm_button = document.createElement("button");
    rm_button.innerHTML = "Remove";
    rm_button.onclick = remove_row;

    var select = document.createElement('select');
    select.onchange = function(){drawGlueUp();};
    //select.className = "wood_opt";
    for(var key in woodColors){
        select.appendChild(new Option(key, woodColors[key]));
    }
    var size_num = document.createElement("input");
    size_num.type = "number";
    size_num.name = "size";
    size_num.step = ".25";
    size_num.min = "0";

    var up_button = document.createElement("button");
    up_button.innerHTML = "Move Up";
    up_button.value = "move up";
    up_button.className += "move up";
    up_button.onclick = move_up;
    var dn_button = document.createElement("button");
    dn_button.innerHTML = "Move Down";
    dn_button.value = "move down";
    dn_button.className += "move down";
    dn_button.onclick = move_dn;

    var lock_sz = document.createElement("input");
    lock_sz.type = "checkbox";
    lock_sz.name = "lock_size";
    lock_sz.value = "locked";

    
    tr = document.createElement('tr');
    tr.class = "woodRows";
    td = document.createElement('td');

    td.appendChild(rm_button)
    td.appendChild(select);
    td.appendChild(size_num);
    td.appendChild(lock_sz);
    td.appendChild(up_button);
    td.appendChild(dn_button);
    tr.appendChild(td);
    table.append(tr);
    drawGlueUp();
}

function createTable() {
    var table = document.getElementById("wood_list");
    var thead = document.createElement('thead');
    var head_tr = document.createElement('tr');
    var head_th = document.createElement('th');
    var head_th1 = document.createElement('th');
    head_th.appendChild(document.createTextNode("Wood"));
    head_tr.appendChild(head_th);
    thead.appendChild(head_tr);
    table.appendChild(thead);

    addRow()
}
createTable()


var add_button = document.getElementById("add_wood");
add_button.addEventListener("click", function() {
    addRow()
});

function remove_row(){
    var i = this.parentNode.parentNode.rowIndex;
    document.getElementById("wood_list").deleteRow(i);
    drawGlueUp()
}

function move_up(){
    var idx = this.parentNode.parentNode.rowIndex;
    var sct_idx = this.parentNode.parentNode.sectionRowIndex;
    console.log(idx)
    console.log(sct_idx)
    console.log(this.parentNode.parentNode.cells)
    console.log(this.parentNode.data)
    //data1 = document.getElementById("wood_list").data(i);
    //data2 = document.getElementById("wood_list").data(i+1);
}

function move_dn(){
    var i = this.parentNode.parentNode.rowIndex;
    //document.getElementById("wood_list").deleteRow(i);
}


//drawGlueUp()


