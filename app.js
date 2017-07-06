var jqueryFunction;

var woodColors = {
   "Ebony": "#292117",
   "Jatoba": "#B56816",
   "Maple": "#FDE96D",
   "Purpleheart": "#AF0B7B",
   "Walnut": "#4B351A" };

function drawCanvas(){
    var c = document.getElementById("glueUp");
    var ctx = c.getContext("2d");
    var cb = document.getElementById("cboard");
    var cbtx = cb.getContext("2d");


    var tbl = document.getElementById("wood_list");
    var row = tbl.getElementsByTagName("tr");
    var rowLength = row.length;
    var opt = document.getElementsByTagName("select");
    // add for loop
    var wood_rows = opt.length;
    var planks = []
    var flip_chk_bx = document.getElementById("flip_chk_box");

    // Get number of planks
    var planksheight = Math.floor(150/wood_rows)
    var cbheight = Math.floor(350/wood_rows)
    for (var i=0; i< wood_rows; i++){
        planks.push(opt[i].value);
        ctx.fillStyle = opt[i].value;
        ctx.fillRect(0,i*planksheight, 300,planksheight);

        //if (flip_chk_bx){
        //    var a;
        //}
        //else{
            planks.push(opt[i].value);
            cbtx.fillStyle = opt[i].value;
            cbtx.fillRect(0,i*cbheight, 600,cbheight);
        //}
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
    select.onchange = function(){drawCanvas();};
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
    drawCanvas();
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
    drawCanvas()
}

function move_up(){
    var row = this.parentNode.parentNode;
    var sibling = row.previousElementSibling;
    var par = row.parentNode;
    par.insertBefore(row, sibling);
    drawCanvas()
}

function move_dn(){
    var row = this.parentNode.parentNode;
    var sibling = row.nextElementSibling;
    var par = row.parentNode;
    par.insertBefore(sibling, row);
    drawCanvas()
}


//drawCanvas()


