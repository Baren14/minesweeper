const grid_x = ['0','1','2','3','4','5','6','7','8','9']
const grid_y = ['a','b','c','d','e','f','g','h','i','j','k'];

function start_game(){
    const mine_grids = document.getElementById('grids');
    mine_grids.innerHTML = '';
    grid_y.forEach(y => {
        grid_x.forEach(x =>{
            grid = document.createElement('button');
            grid.className = 'game_grid';
            grid.id = y + x;
        }
    }
}
