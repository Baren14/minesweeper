const grid_x = ['0','1','2','3','4','5','6','7','8','9']
const grid_y = ['a','b','c','d','e','f','g','h','i','j'];

function start_game(){
    //grids for mines
    const mine_grids = document.getElementById('grids');
    const mines = new Set();
    mine_grids.innerHTML = '';
    grid_y.forEach(y => {
        const row = document.createElement('div');
        grid_x.forEach(x =>{
            const grid = document.createElement('button');
            grid.className = 'game_grid';
            grid.x = x;
            grid.y = y;
            grid.id = y + x;
            grid.textContent = ' ';
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
    bomb.textContent = '!';
}