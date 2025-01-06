const grid_x = ['0','1','2','3','4','5','6','7','8','9'];
const grid_y = ['a','b','c','d','e','f','g','h','i','j'];
const all_grids = new Set;

//GAME SECTION

function start_game(){
    //grids for mines
    document.getElementById('start').textContent='restart';
    const mine_grids = document.getElementById('grids');
    const mines = new Set();
    mine_grids.innerHTML = '';
    grid_y.forEach((y,y_index) => {
        const row = document.createElement('div');
        grid_x.forEach((x,x_index) =>{
            const grid = document.createElement('button');
            grid.className = 'game_grid';
            const id = y + x;
            grid.x = x_index;
            grid.y = y_index;
            grid.id = id;
            grid.textContent = '_';
            grid.setAttribute('data-id', id);
            grid.addEventListener('click', () => check_grid(id, mines));
            grid.addEventListener('contextmenu', () => flag(id));
            row.append(grid);
            all_grids.add(id);
        });
        mine_grids.append(row);
    });
    random_mine(mines);
    mines.forEach(mine => plant_mine(mine));
}

function random_mine(mines){
    //generating random mine posistion
    while(mines.size < 10){
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const mine = grid_y[y] + grid_x[x];
        mines.add(mine);
        all_grids.delete(mine);
    }
    /*mines.forEach(mine => {
        console.log(mine);
    });*/
}

function plant_mine(id){
    const bomb = document.getElementById(id);
    if (bomb) {
        bomb.setAttribute('data-mine', 'true'); // Mark as a mine
    }
    //bomb.textContent = '!';
}

function check_grid(id,mines){
    const grid = document.getElementById(id);
    if(grid){
        if(mines.has(id)){
            document.getElementById(id).textContent = '!';
            mines.forEach(mine => document.getElementById(mine).textContent = '!');
            stopwatch_stop();
            alert("you lost!")
        }
        else{
            const mine_number = scan_neighbours(grid);
            grid.textContent=String(mine_number);
            grid.setAttribute('data-revealed','true');
            if(mine_number === 0){
                reveal_round(grid);
            }
        }
    }
    if(check_if_all_clear()){
        stopwatch_stop();
        alert("you win!");
    }
}

function flag(id){
    const grid = document.getElementById(id);
    const isFlagged = grid.getAttribute('data-flagged') === 'true';
    if(isFlagged){
        grid.textContent = '_';
        grid.setAttribute('data-flagged','false');
    }
    else{
        grid.setAttribute('data-flagged','true');
        grid.textContent = 'F';
    }
}

function scan_neighbours(grid){
    const x = grid.x;
    const y = grid.y;
    let count = 0;

    for(let dx = -1; dx <= 1; dx++){
        for(let dy = -1; dy <= 1; dy++){
            if (dx === 0 && dy === 0) continue; //skip current grid
            const neighbour_x = x + dx;
            const neighbour_y = y + dy;
            //error handling - on edge, only will continue when value is >= 0 and smaller than amount of the grid 
            if(neighbour_x >= 0 && neighbour_x < grid_x.length &&
                neighbour_y >= 0 && neighbour_y <grid_y.length){
                    const neighbour_id = grid_y[neighbour_y] + grid_x[neighbour_x];
                    const neighbour = document.getElementById(neighbour_id);
                    if(neighbour && neighbour.getAttribute('data-mine') === 'true'){
                        count ++;
                    }
                }
        }
    }
    return count;
}

function reveal_round(grid){
    const x = grid.x;
    const y = grid.y;
    let count = 0;

    for(let dx = -1; dx <= 1; dx++){
        for(let dy = -1; dy <= 1; dy++){
            if (dx === 0 && dy === 0) continue; //skip current grid
            const neighbour_x = x + dx;
            const neighbour_y = y + dy;
            //error handling - on edge, only will continue when value is >= 0 and smaller than amount of the grid 
            if(neighbour_x >= 0 && neighbour_x < grid_x.length &&
                neighbour_y >= 0 && neighbour_y <grid_y.length){
                    const neighbour_id = grid_y[neighbour_y] + grid_x[neighbour_x];
                    const neighbour = document.getElementById(neighbour_id);
                    
                    if(neighbour && !neighbour.getAttribute('data-revealed')){
                        const mine_number = scan_neighbours(neighbour);
                        neighbour.textContent = String(mine_number);
                        neighbour.setAttribute('data-revealed', 'true');

                        if(mine_number === 0){
                            reveal_round(neighbour);
                        }
                    }
                }
        }
    }
}


function check_if_all_clear() {
    for (const id of all_grids) {
        const grid = document.getElementById(id);
        if (grid.getAttribute('data-revealed') !== 'true') {
            return false;
        }
    }
    return true;
}

//GAME SECTION END

//CLOCK SECTION
const stopwatch_display = document.getElementById("clock");

let min = 0;
let sec = 0;
let count = 0;
let timer = false;

document.getElementById('start').addEventListener('click', function(){
    timer = true;
    stopwatch_run();
})

function stopwatch_run(){
    if(timer){
        count++;
        if(count == 100){
            sec ++;
            count = 0;
        }
        if(sec == 60){
            min ++;
            sec = 0;
        }
    }
    let count_string = String(count);
    let sec_string = String(sec);
    let min_string = String(min);
    if(count_string.length == 1){
        count_string = '0' + count_string;
    }
    if(sec_string.length == 1){
        sec_string = '0' + sec_string;
    }
    if(min_string.length == 1){
        min_string = '0' + min_string;
    }
    let time_text = min_string + ':' + sec_string + ':' + count_string;
    stopwatch_display.value = time_text;

    setTimeout(stopwatch_run,10);
}

function stopwatch_stop(){
    timer = false;
}