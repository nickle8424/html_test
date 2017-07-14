var jqueryFunction;

var plank = {
    len: 15,
    plkHeight: .75,
    numBoards: 1,
    width : 11,
    height: 2,
    boards: [],
    boardWidth:[],
    pxlLength: 1,
    pxlWidth: 1};

var woodColors = {
   "Ebony": "#292117",
   "Jatoba": "#B56816",
   "Maple": "#FDE96D",
   "Purpleheart": "#AF0B7B",
   "Walnut": "#4B351A" };

function inchToPxls( inch) {
    return inch*15;
}

function updatePlank(){
    updateWidth();
    updateLength();
    // get Board order and widths
    //input_sz = document.getElementsByClassName("size");
    //var width = 0;
    //planks.boards = []
    //for (var i =0; i < input_sz.length; i++ ){
    //    planks.boardsWidth.push(input_sz[i].valueAsNumber;
    //    //console.log(input_sz[i]);
    //    width += input_sz[i].valueAsNumber;
    //}

    //plank.width = cbWidth();
}
function updateLength(){
    var len = document.getElementById("cbLength");
    plank.len = len.valueAsNumber;
    plank.pxlLength = inchToPxls(plank.len);
}

function updatePlkHeight(){
    var plHeight = document.getElementById("plkHeight");
    plank.plkHeight = plHeight.valueAsNumber;
}

function updateWidth(){
    input_sz = document.getElementsByClassName("size");
    var width = 0;
    plank.boards = []
    for (var i =0; i < input_sz.length; i++ ){
        plank.boardWidth.push(input_sz[i].valueAsNumber);
        //console.log(input_sz[i]);
        width += input_sz[i].valueAsNumber;
    }
    document.getElementById('cbWidth').value = width;
    plank.width = width;
    plank.pxlWidth = inchToPxls(plank.width);
}


function drawCanvas(){
    updatePlank();

    var c = document.getElementById("glueUp");
    var ctx = c.getContext("2d");
    var cb = document.getElementById("cboard");
    var cbtx = cb.getContext("2d");
    
    c.height = plank.pxlWidth;
    c.width = plank.pxlLength;
    cb.height = plank.pxlWidth;
    cb.width = plank.pxlLength;
    console.log(plank);


    var tbl = document.getElementById("wood_list");
    var row = tbl.getElementsByTagName("tr");
    var rowLength = row.length;
    var opt = document.getElementsByTagName("select");
    // add for loop
    var wood_rows = opt.length;
    var planks = []
    var flip_chk_bx = document.getElementById("flip_chk_box");

    // Get number of planks
    var planksheight = Math.floor(plank.pxlWidth/wood_rows);
    var cbheight = Math.floor(350/wood_rows);
    var cblen = Math.floor(plank.len/wood_rows);
    var numStrips = Math.ceil(plank.pxlLength/plank.plkHeight);

    for (var i=0; i< wood_rows; i++){
        planks.push(opt[i].value);
        ctx.fillStyle = opt[i].value;
        ctx.fillRect(0,i*plank.pxlWidth, plank.pxlLength, planksheight);

        if (flip_chk_bx.checked){
            for (var j=0; j < numStrips; j++){ 
                var x = j*numStrips;
                var endX = (j+1) * numStrips;
                //cbtx.fillStyle = opt[i].value;
                //cbtx.fillRect(x,i*cbheight, endX, cbheight);
                //cbtx.fillRect(0,i*cbheight, 0,cbheight);
                console.log(x, i*cbheight, endX, cbheight);
                if (j%2 == 0 || opt.length ==1){
                    cbtx.fillStyle = opt[i].value;
                    cbtx.fillRect(x, i*plank.pxlWidth, endX, plank.pxlWidth);
                }
                else {
                    var flpSelect = opt.length - i;
                    //console.log(opt[flpSelect].value);
                    cbtx.fillStyle = opt[flpSelect-1].value;
                    cbtx.fillRect(x, i*plank.pxlWidth, endX, plank.pxlWidth);
                }
            }
        }
        else{
            //planks.push(opt[i].value);
            cbtx.fillStyle = opt[i].value;
            cbtx.fillRect(0,i*plank.pxlWidth, plank.pxlLength , planksheight);
        }
    }
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
    size_num.className += "size";
    size_num.value = "1";
    size_num.step = ".25";
    size_num.min = "0";
    size_num.onchange= function(){updateWidth();};

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
    plank.numBoards = table.rows.length -1;

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
    try {
        par.insertBefore(row, sibling);
    }
    catch (err) {
        ;
    }
    drawCanvas()
}

function move_dn(){
    var row = this.parentNode.parentNode;
    var sibling = row.nextElementSibling;
    var par = row.parentNode;
    try  {
        par.insertBefore(sibling, row);
    } catch (err){
       ; 
    }

    updateWidth();
    drawCanvas()
}


//drawCanvas()


