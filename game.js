const grid_x = ['0','1','2','3','4','5','6','7','8','9']
const grid_y = ['a','b','c','d','e','f','g','h','i','j'];
//const start_button = document.getElementById('start');

function start_game(){
    //grids for mines
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
            grid.textContent = '';
            grid.setAttribute('data-id', id);
            grid.addEventListener('click', () => check_grid(id, mines));
            row.append(grid);
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
    }
    mines.forEach(mine => {
        console.log(mine);
    });
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
        }
        else{
            grid.textContent = '0';
        }
    }
}
