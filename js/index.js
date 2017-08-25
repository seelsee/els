var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d");
var score = document.querySelector('.score');
var high = document.querySelector('.highScore');
var cWidth = 500;//canvas宽
var cHeitht = 500;//canvas高
 canvas.width = cWidth;
 canvas.height = cHeitht;
var rectl = 12;
var rectr = 12;
 var data = map(rectl, rectr);
 var arr = [
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[1,1,0],[0,1,1]],
    [[0,1,1],[1,1,0]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[1,0,1],[1,1,1]],
    [[1,1,1],[1,0,1]],
    [[1,1,1],[0,1,0]]
]
//数组中０代表方块，１代表移动的方块
var getRandomColor = () => {
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
  }
//创建方块,背景
function render(data, context) {
    var w = h = cWidth / 12 - 10;
    for(let i =0;i < data.length;i++) {
        for(let j =0;j < data[0].length;j++) {
            // console.log(data[i][j])
            context.fillStyle = data[i][j] == 0?'skyblue':'red';
            context.fillRect(j*(w+10)+5,i*(h+10)+5,w,h);//绘制矩形
        }
    }
}




// var diff = document.querySelector('.nandu');
// diff.addEventListener('click',function() {
//     console.log(1)
//     function render(data, context) {
//     var w = h = cWidth / 12 - 10;
//     for(let i =0;i < data.length;i++) {
//         for(let j =0;j < data[0].length;j++) {
//             // console.log(data[i][j])
//             context.fillStyle = data[i][j] == 0?'#fff':getRandomColor();
//             context.fillRect(j*(w+10)+5,i*(h+10)+5,w,h);//绘制矩形
//         }
//     }
// }




// })














var t =500;//运行间隔时间
function start() {
    
    ti(t);

}


var st = document.querySelector('.start');
st.addEventListener('click', function() {
    start();
    create(matrix);
})
var stopp = document.querySelector('.stop');
stopp.addEventListener('click', function() {
    stop();

})
function stop() {
    clearInterval(timer);
    return true; 
}




//生成地图

var y = 0;
var　x = 4;
var matrix;
function bg() {
    return matrix = mold();
}
bg();
// console.log(matrix)
var timer = null;
function ti(time) {
    timer = setInterval(function() {
        fall();
    },time);
    
}
// ti(t)
render(data,context);



function play() {
    var onOff = false;
    document.onkeydown = (ev) => {
       
        switch(ev.keyCode) {
            case 37://左
                clear(matrix);
                
                if(!collideTestX(-1, matrix)){
                    x--;
                }
                create(matrix);
                break;
            case 39://右
                clear(matrix);
                if(!collideTestX(1,matrix)){
                    x++;
                }
                create(matrix);
                break;
            case 38://上，变形
                clear(matrix);
                rotate();
                create(matrix);
                break;
            case 40://下，加速
            if(!onOff) {
                clearInterval(timer);
                ti(100);
                onOff = true;
            }
                break;
        }
    }
    document.onkeyup = (ev) => {
        if(ev.keyCode == 40) {
            onOff = false;
            clearInterval(timer);
            ti(t);
        }
    }
}
play();

//变形
function rotate() {
    var arr = [];
    var x = matrix[0].length;

    for(let i = 0;i < x;i++) {
        arr.push([]);
    }
    for(let i = 0;i < matrix.length;i++) {
        for(let j = 0;j < x;j++) {
            arr[j][matrix.length-1-i] = matrix[i][j];
        }
    }
    //变形出边缘
    if(collideTestX(1, arr) || collideTestX(-1, arr) || check(arr)) {
        return;
    }
    matrix = arr;
}

//左右移动,检测方块相互碰撞
function collideTestX(n, matrix1) {
    //n为-1向左,1向右;

    //左右边界
    if(x + n < 0 || x + n > data[0].length - matrix1[0].length) {
        return true;
    }
    //右往左碰撞
    if(n < 0) {
        for(let i = 0;i<matrix1.length;i++) {
            var index = 0;
            while(!matrix1[i][index]) {
                index++;
            }
            if(!data[i+y] || data[i + y][x + index - 1]) {
                return true;
            }
        }
    } else {
        //从左往右
        for(let i = 0;i<matrix1.length;i++) {
            var index = matrix1[0].length;
            while(!matrix1[i][index]) {
                index--;
            }
            if(!data[i + y] || data[i + y][x + index + 1]) {
                return true;
            }
        }
    }
    return false;
}
var m = 0;
function fall() {
    //撞到底部
    if(check(matrix)) {
        matrix = mold();
        // console.log(matrix);
       
        clearLine();
        
        x = 4;
        y = 0;

        for(let i = 0;i< data[1].length;i++) {
            if(data[1][i] == 1) {
                stop();
                
                var date1 = new Date();
                var date2 = date1 - date;
                var date3 = date2 / 1000;
                // console.log(date2)
                alert('GAME OVER!用时:'+ date3 + '秒');
                // var c = true;
                for(let j = 0;j<data[0].length;j++) {
                    data[0][j]=0;
                    data[1][j]=0;
                    data[2][j]=0;
                    data[3][j]=0;
                    data[4][j]=0;
                    data[5][j]=0;
                    data[6][j]=0;
                    data[7][j]=0;
                    data[8][j]=0;
                    data[9][j]=0;
                    data[10][j]=0;
                    data[11][j]=0;
                }
                
                break;
                
                // data[i]=0;
            }
            // if(data[1][i] == 1) {
            //     var c;
            //     return c = true;
            // }
            // console.log(i)
            // console.log(data[1][4])
        }
    }
    clear(matrix)
    y++;

        create(matrix);


    
}
var arr1 = [];
for(let i = 0;i < 12;i++) {
    arr1.push(0);
}
//清除一行
function clearLine() {
    var n;
    
    for (let i = 0; i < data.length; i++) {
        n = true;
        for(let j = 0;j < data[0].length;j++){
            if(!data[i][j]) {
                n = false;

            }

        }
        if(n) {
            data.splice(i,1);
            data.unshift([].concat(arr1));
            // console.log( data.unshift([].concat(arr1)));
            m++;
            score.innerHTML = '得分:' + m * 100;
            var mm = m * 100;
            hs(mm);
            // console.log(m)
            
        }
    }
}

//最高分
var hightScore = 0;
var date = new Date();
window.onload = function () {
    
    // console.log(date);
    if(localStorage.hightScore == undefined) {
        high.innerHTML = '最高分:' + 0;
        window.localStorage.setItem("hightScore",0);
    } else {
        high.innerHTML = '最高分:' + localStorage.hightScore;
    }
}
function hs(mm) {
    if(mm > localStorage.hightScore) {
        window.localStorage.setItem("hightScore",mm);
        localStorage.hightScore = mm;
        console.log(localStorage.hightScore)
        high.innerHTML = '最高分:' + localStorage.hightScore;

    }
}

//检测碰撞
function check(matrix1) {
    //到底部
    if(y + matrix1.length >= data.length ) {
        return true;
    }

    var arr = matrix1[matrix1.length - 1];
    var n;
    for(let i =0;i < arr.length;i++) {
        n = matrix1.length - 1;
        while(!matrix1[n][i]) {
            n--;
        }
        if (data[y+1+n][i+x]) {
            return true;
        }
    }
    return false;
}
//清除上一个
function clear(arr) {
    for(let i =0;i < arr.length;i++) {
        for(let j = 0;j < arr[i].length;j++) {
            if(arr[i][j]) {
                data[i+y][j+x] = 0;
            }
        }
    } 
}

//创建方块
function create(arr) {
    //  console.log(arr.length)
    for(let i =0;i < arr.length;i++) {
        for(let j = 0;j < arr[i].length;j++) {
            if (!data[i+y][j+x]) {
                data[i+y][j+x] =  arr[i][j];//生成位置
                
            }
        }
    }
    render(data,context);
}
// create();

//随机生成一个方块
function mold() {
    return arr[Math.floor(Math.random()*10)];
}

//创建数据
function map(row, column) {
    var data = [];
    for(let i = 0;i < row;i++) {
        data.push([]);
        for(let j = 0;j < column;j++) {
            data[i].push(0);
        }
    }
    return data;
}



function init() {
    
}