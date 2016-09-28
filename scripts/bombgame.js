var app=angular.module('app',[]);

app.controller('myCtrl',function($scope,$interval,$timeout){
    $scope.bombgameswitch1=true;
    $scope.bombgameswitch2=false;

    var BombPlateNotCreated=true;

    $scope.switchbombgame=function(value){
        $scope.bombgameswitch1=value;
        $scope.bombgameswitch2=!value;
        if($scope.bombgameswitch2&&BombPlateNotCreated){
           createGrids();
           initializebomb();
           BombPlateNotCreated=false;
        }
    }

    //bombgame app
    var BombPlate=document.getElementById('bombplate');
    var updateBombArr=[];
    var bombs=document.getElementsByClassName('bomb');
    
    //create grids of bombs
    function createGrids(){
        for(var v=0;v<100;v++){
            (function(v){
                var newBombDiv=document.createElement('div');
                var newBombChildDiv=document.createElement('div');
                newBombDiv.setAttribute("style","float:left;width:80px;height:80px;border:2px solid white;");
                newBombDiv.setAttribute("class","bomb");
                newBombChildDiv.setAttribute("id","bomb"+v);
                newBombChildDiv.setAttribute("style","width:76px;height:76px;border-radius:76px;color:white;font-size:30px;text-align:center;padding-top:18px;");
                newBombChildDiv.setAttribute("kind","");
                newBombChildDiv.setAttribute("timer","off");
                newBombChildDiv.setAttribute("class","nobomb");
                newBombDiv.appendChild(newBombChildDiv);
                BombPlate.appendChild(newBombDiv);
                updateBombArr.push(newBombChildDiv);
            }(v));
        }
    }

    /*set each bomb grid its property,when click on that bomb,the bomb will be divided to two bombs
    or one bomb and one apple*/
    function initializebomb(){
        for(var d=0;d<100;d++){
           bombs[d].onclick=function(){
              if(this.firstChild.getAttribute('class')==='bombactive'){
                var generateAppleProbability=Math.ceil(Math.random()*10);
                var devidedbomb1Num=Math.ceil(Math.random()*(updateBombArr.length));
                var devidedbomb1=updateBombArr[devidedbomb1Num];
                devidedbomb1.setAttribute("kind","bomb");
                devidedbomb1.setAttribute("timer","on");
                devidedbomb1.setAttribute("class","bombactive");
                devidedbomb1.setAttribute("style","width:76px;height:76px;border-radius:76px;color:white;font-size:30px;text-align:center;padding-top:18px;background:url(images/bomb.png);");
                var randomtime1=8+Math.ceil(Math.random()*10);
                bombtimer(randomtime1,devidedbomb1);

                do{ 
                   var devidedbomb2Num=Math.ceil(Math.random()*(updateBombArr.length))
                }while(devidedbomb2Num==devidedbomb1Num);
                var devidedbomb2=updateBombArr[devidedbomb2Num];
                if(generateAppleProbability>3){
                   devidedbomb2.setAttribute("kind","apple");
                   devidedbomb2.setAttribute("style","width:76px;height:76px;border-radius:76px;color:white;font-size:30px;text-align:center;padding-top:18px;background:url(images/apple.png);");
                }else{
                   devidedbomb2.setAttribute("kind","bomb");
                   devidedbomb2.setAttribute("style","width:76px;height:76px;border-radius:76px;color:white;font-size:30px;text-align:center;padding-top:18px;background:url(images/bomb.png);");
                }
                devidedbomb2.setAttribute("timer","on");
                devidedbomb2.setAttribute("class","bombactive");
                var randomtime2=8+Math.ceil(Math.random()*10);
                bombtimer(randomtime2,devidedbomb2);
                
                updatebomb();
                console.log(updateBombArr);
                this.firstChild.setAttribute("class","nobomb");
                this.firstChild.innerText="";
                this.firstChild.setAttribute("style","color:green;");
                var id=this.firstChild.getAttribute('id').substring(4);
              }
           }
        }
    }
    
    //click to start the game, randomly pick a grid of bomb.
    $scope.bombgamestart=function(){
       $scope.bombgameover=false;
       var randomtime=8+Math.ceil(Math.random()*10);
       var startbombNum=Math.ceil(Math.random()*100)-1;
       var startbomb=document.getElementById('bomb'+startbombNum);
       startbomb.setAttribute("kind","bomb");
       startbomb.setAttribute("timer","on");
       startbomb.setAttribute("class","bombactive");
       startbomb.setAttribute("style","width:76px;height:76px;border-radius:76px;color:white;font-size:30px;text-align:center;padding-top:18px;background:url(images/bomb.png);");
       bombtimer(randomtime,startbomb);
    }

    var bombcountTimer=0;
    
    //each bomb will be given a timer
    function bombtimer(time,bomb){
       bomb.innerText=time+"";
       for(var t=0;t<=time;t++){
         (function(t){
           bombcountTimer=$timeout(function(){
             if(time-t===0){
                bomb.innerText="";
                bomb.setAttribute("style","color:green;");
                if(bomb.getAttribute("class")==="bombactive"&&bomb.getAttribute("kind")==="bomb"){
                    bombgameover();
                    $timeout.cancel(bombtimer);
                    $scope.bombgameover=true;
                }
             }else{
                bomb.innerText=time-t+"";
             }
          },t*1000);
         }(t));
       }
    }
    
    //before each click, to check how many grids are in the condition of no bombs
    function updatebomb(){
        updateBombArr=[];
        for(var c=0;c<100;c++){
            if(bombs[c].firstChild.getAttribute("timer")==="off"){
                updateBombArr.push(bombs[c].firstChild);
            }
        }
        return updateBombArr;
    }
    
    //bomb game over
    function bombgameover(){
        for(var e=0;e<100;e++){
            bombs[e].firstChild.setAttribute("kind","");
            bombs[e].firstChild.setAttribute("class","nobomb");
            bombs[e].firstChild.setAttribute("style","color:green");
            bombs[e].firstChild.innerText="";
        }
    }
})