class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    c1=createSprite(200,300);
    c2=createSprite(400,300);
    c3=createSprite(600,300);
    c4=createSprite(800,300);
    
    cars=[c1,c2,c3,c4]
  }

  play(){
    form.hide();
  
    Player.getPlayerInfo();

    if(allPlayers !== undefined)
    {

      var index=0;
      var x=0;
      var y;
      
      for(var plr in allPlayers)
      {
        x=x+200; 
        y=displayHeight-allPlayers[plr].distance
        cars[index].x=x;
        cars[index].y=y;
        index += 1;


        if((index+1)===player.index)
        {
          cars[index].shapeColor="red";
        // camera.position.x=cars[index].x;;
        camera.position.x=displayWidth/2;
         camera.position.y=cars[index].y;

        }


        
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    drawSprites();
  }
}
