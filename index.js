
function makeCloud(offSet = canvas.width+100){
    let numberOfCloud = Math.floor(Math.random()*(4-2))+2;
    for(let i =0; i<= numberOfCloud; i++){
        const width = Math.floor(Math.random() * (60 - 40)) + 40;
            if(i!= numberOfCloud){ clouds.push([
                new sprite({
                    position: {
                        x:Math.floor(Math.random()*(50-20)+20)+i*width + offSet,
                        y:Math.floor(Math.random()*(100-30)+30)
                    },
                    color: 'white',
                    size: {
                        width: width,
                        height:0
                    },
                    velocity: {
                        x:-0.7,
                        y:0
                    }
                }),0
            ]);}
            else{clouds.push([
                new sprite({
                    position: {
                        x:Math.floor(Math.random()*(50-20)+20)+i*width + offSet,
                        y:Math.floor(Math.random()*(100-30)+30)
                    },
                    color: 'white',
                    size: {
                        width: width,
                        height:0
                    },
                    velocity: {
                        x:-0.7,
                        y:0
                    }
                }),1
            ]);

            }
    }
}

function makePipe(){
    let pipeYOffset = Math.floor(Math.random()*((canvas.height-370)-20))+20;
    pipes.push([ //top pipe
        new sprite({
            position: {
                x: canvas.width+300,
                y: 0
            },
            color: 'green',
            size: {
                width: 80,
                height: pipeYOffset
            },
            velocity: {
                x: -3,
                y: 0
            }
        }),
        new sprite({
            position: {
                x: canvas.width+300,
                y: pipeYOffset + 250
            },
            color: 'green',
            size: {
                width: 80,
                height: canvas.height - (pipeYOffset+80)
            },
            velocity: {
                x: -3,
                y: 0
            }
        })
    ])
}

function death(){
    gameState = 2;
    document.querySelector('#displayText').innerHTML = "GAME OVER <br> Score: " + score+"<br><br> Press space";
    document.querySelector('#displayText').style.display = "flex";
    player.velocity.y = 0
}

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'blue';
    c.fillRect(0,0,canvas.width,canvas.height);
    for (let i =0; i < clouds.length; i++ ){
        clouds[i][0].update('circle');
        if(clouds[i][0].position.x<-100){
            if (clouds[i][1]==1){
                clouds.splice(i,1);
                makeCloud();
            }else{
                clouds.splice(i,1);
            }
            i--;
        }
    }
    switch (gameState){
        case 0:
            ground.update('rect');
            grass.update('rect');
            break;
        case 1:
            for (let i = 0; i < pipes.length; i++) {
                pipes[i][0].update('rect');
                pipes[i][1].update('rect');
                if(pipes[i][0].position.x < canvas.width/2 && pipes.length == 1)makePipe();
                if(pipes[i][0].position.x < player.position.x + player.size.width && pipes[i][0].position.x+pipes[i][0].size.width > player.position.x - player.size.width){
                    if(pass == 0)pass = 2;
                    //check for colision
                    if(pipes[i][0].size.height >= player.position.y-player.size.height || pipes[i][1].position.y < player.position.y+player.size.height){
                        death();
                    }
                }
                if(pipes[i][0].position.x < -100) {
                    pipes.splice(0,1);
                    pass = 0;
                    i--;
                }
            }
            if(pass == 2){
                score++;
                pass = 1;
                document.querySelector('#score').innerHTML = "score: "+score
            }
            ground.update('rect');
            grass.update('rect');
            player.velocity.y += gravity;
            player.update('circle');
            if (player.position.y + player.size.height/2 +70 >= canvas.height || player.position.y - player.size.height/2 <= 0){
                death();
            }
         break;
        case 2:
            ground.update('rect');
            grass.update('rect');
            break;
    }
}
makeCloud(100);
makeCloud(500);
makeCloud(1000);
makePipe();
animate();

window.addEventListener('keydown', (event) =>{
    if (event.key == ' '){
        if (!spacePressed){
            if(gameState==0){
                gameState=1;
                player.position.y = canvas.height/2;
                document.querySelector('#displayText').style.display = 'none';
                score = 0;
                document.querySelector('#score').innerHTML = "score: "+score
                pass = 0;
                pipes = []
                makePipe();
            } else if(gameState==2){
                gameState = 0;
                document.querySelector('#displayText').innerHTML = "Press space to flap !!";
            }
            
            player.velocity.y = -10;
            spacePressed = 1;
        }
    }
})
window.addEventListener('keyup',(event)=>{
    if (event.key == ' ') spacePressed = 0;
})