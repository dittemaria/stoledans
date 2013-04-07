var move = 10;
var timeout = 200;
var go = true;

var initialLeft = 33;
var spacing = 7;

var allDancers = new Array(); //.person elements
var deadDancers = new Array(); // dead dancers
var allPositions = null;



/**
 * Bare en kommentar
 **/
$(document).ready(function () {
   
   $(".person input").on('change', function(){
      readURL(this); //prev is the img tag
   });
   
    $('#play').on('click', function () {
      if(deadDancers.length == 0){ // first play
         if(allDancers.length < 2){
            alert("Du skal indsætte mindst 2 ansigter");
            return;
         }
         $('.person:last').remove();
      } else {
         
      }
      //if(allDancers.length != 1){
      //   proceed();
      //   removeChair();
      //}
      go=true;
      $('.bubble').css('display','none');
      $('audio').trigger('play');
      
      
      $('.person').not('.dead').each(function(){
         moveOn($(this),Math.floor((Math.random()*3)+1));
      });
    });
    
    $('#pause').on('click', function () {
        go=false;
        $('audio').trigger('pause');
           removePerson();
    });
    $('#refresh').on('click', function () {
        location.reload();
    });
    
});



/************ Handling movements *****************/

function proceed(){
   //for (var i = 0; i < allDancers.length; i++){
   //   $(allDancers[i]).css('left',allPositions[i].left);
   //   $(allDancers[i]).css('top',allPositions[i].top);
   //}
}

function sitDown(){
   allDancers = $('.person:not(#first):not(.dead)'); // array of all live dancers
   var allChairs = $('.chair:not(#chair)'); // array of all chairs
   
   var tmpDancers = allDancers;
   allPositions = new Array();
   for (var i = 0; i < allDancers.length; i++){
      allPositions[i] = $(allDancers[i]).position();
      moveRandom();
      $(allDancers[i]).css('top',$(document).height()/2+50);
      $(allDancers[i]).css('left',$(allChairs[i]).position().left+300);
   }
}

function moveRandom(){
   
}



function moveOn(elem, pos){
  if(go  && !elem.hasClass('dead')){
   var p = elem.position();
   if(p.left < 600 +(allDancers.length * 30) && p.top < 340){
      moveRight(elem, pos);  
   }
   if(p.left >= 600 +(allDancers.length * 30) && p.top < 500){
      moveDown(elem, pos);  
   }
   if(p.left > 600 -(allDancers.length * 30) && p.top >= 500){
      moveLeft(elem, pos);  
   }
   if(p.left <= 600 -(allDancers.length * 30)&& p.top > 320){
      moveUp(elem, pos);  
   }
   if(pos < 3){pos++;} else{pos=1;}
      setTimeout(function(){
         moveOn(elem, pos);
      }, timeout);
   }
}



function moveLeft(elem, pos){
  var p = elem.position();
  var newLeft = p.left-move;
  elem.find('img:first').attr('src','img/stickman_'+pos+'_nohead.png');
  elem.css('left',newLeft);
}

function moveRight(elem, pos){
  var p = elem.position();
  var newLeft = p.left+move;
  elem.find('img:first').attr('src','img/stickman_'+pos+'_nohead.png');
  elem.css('left',newLeft);
}


function moveDown(elem, pos){
  var p = elem.position();
  var newLeft = p.top+move;
  elem.find('img:first').attr('src','img/stickman_'+pos+'_nohead.png');
  elem.css('top',newLeft);
}

function moveUp(elem, pos){
  var p = elem.position();
  var newLeft = p.top-move;
  elem.find('img:first').attr('src','img/stickman_'+pos+'_nohead.png');
  elem.css('top',newLeft);
}


/**
 * 
 *
 **/
function readURL(input) {
   if (input.files && input.files[0]) {
    for(var i = 0; i < input.files.length; i++){
      var reader = new FileReader();
      reader.readAsDataURL(input.files[i]);
      reader.onload = function (e) {
         addPerson(e.target.result);
      };
      
      }
   }
}

/********** Handling chairs *********/
function removeChair(){
   $('.center img:last').remove();
}

function addChair(){
   $('#chair').clone().appendTo('.center').css('display','inline').attr('id','');
}


/*********** Handling persons**************/
function addPerson(img){
   var elemList = $('.person');
   var elem = $(elemList[0]);
   for (var i = 0; i < elemList.length; i++){
      if( $(elemList[i]).find('.ansigt').length == 0 ){
         elem = $(elemList[i]);
         break;
      }
   }
   
   // First and second we just andd faces and push them into the
   // Array of persons

   if (allDancers.length == 0){
      allDancers.push(elem);
      elem.append("<img src='"+ img +"'class='ansigt' />");
      elem.find('input').remove();
   } else if (allDancers.length == 1){
      allDancers.push(elem);  
      addTemplate(elem);
      elem.append("<img src='"+ img +"'class='ansigt' />");
      elem.find('input').remove();
      $(elem).attr("id","");
   } else {
      allDancers.push(elem);  
      addTemplate(elem);
      $(elem).attr("id","");
      elem.append("<img src='"+ img +"'class='ansigt' />");
      elem.find('input').remove();
      addChair();
   }
   
}

function addTemplate(elem){
   $(elem).after($('#person_template').clone());
   var newLeft = initialLeft + ( allDancers.length * spacing ) + "%";
   $('.person:last').css('left', newLeft);
   $('.person:last img[class="ansigt"]').remove();
   $(".person input").on('change', function(){
      readURL(this); //prev is the img tag
   });
}

function removePerson(){

   var rand = Math.floor((Math.random()*allDancers.length)+0);
   allDancers[rand].addClass('dead');
   var deadPerson = allDancers[rand];
   
   deadDancers.push(allDancers[rand]);
   allDancers.splice(rand,1);
   
   if(allDancers.length % 2 == 0){
      $(deadPerson).css('top','70%');   
      $(deadPerson).css('left',90 - deadDancers.length * 3.5 + '%');
   } else {
      $(deadPerson).css('top','70%');   
      $(deadPerson).css('left',4 + deadDancers.length * 3.5 + '%');
   }  
     
   setTimeout(function(){
      $(deadPerson).find('img[class="ansigt"]').addClass('face-dead');
   }, 4000);
   
   //alert(allDancers.length + "; " + deadDancers.length);
/*
   var removed = false;
   while (!removed){
      if( $('#dancer'+rand)[0]){
         
         var height = $(window).height();
         var width = $(window).width();
         
         $('#dancer'+rand).css('margin-top','0px;');
         $('#dancer'+rand).css('top',height+60+'px');
         $('#dancer'+rand).css('left',width-150-(120*(numberOfDancers-numberAlive))+'px');
      
         $('#dancer'+rand).addClass('dead');
         
         
         setTimeout(function(){
                  $('#dancer'+rand + ' > span > img').addClass('face-dead');
                  $('#dancer'+rand).attr('id','');
         
         }, 4000);
         removed = true;
         numberAlive--;
         if(numberAlive === 1){
            // THE END
            alert('tillykke');
         }
      
      }
      */
   }




