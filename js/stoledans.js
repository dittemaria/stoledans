var move = 10;
var timeout = 200;
var go = true;
var numberOfDancers = 0;
var numberAlive= 0;
var allDancers = null;
var allPositions = null;


/**
 * Bare en kommentar
 **/
$(document).ready(function () {
   
   $('.fileinput').on('change', function(){
      readURL(this); //prev is the img tag   
   });
   
    $('#play').on('click', function () {
      if(allDancers != null){
         proceed();
         removeChair();
      }
      go=true;
      $('#files').css('display','none');
      $('.bubble').css('display','none');
      $('audio').trigger('play');
      $('.person').each(function(){
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



function proceed(){
   allDancers = $('.person:not(#first):not(.dead)'); // array of all live dancers
   for (var i = 0; i < allDancers.length; i++){
      $(allDancers[i]).css('left',allPositions[i].left);
      $(allDancers[i]).css('top',allPositions[i].top);
   }
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
  //alert(p.top + ", " + p.left);
  if(p.left < 600 +(numberAlive * 30) && p.top < 340){
    moveRight(elem, pos);  
  }
  if(p.left >= 600 +(numberAlive * 30) && p.top < 500){
    moveDown(elem, pos);  
  }
  if(p.left > 600 -(numberAlive * 30) && p.top >= 500){
    moveLeft(elem, pos);  
  }
  if(p.left <= 600 -(numberAlive * 30)&& p.top > 320){
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
      var reader = new FileReader();

      reader.onload = function (e) {
         $(input).prev()
            .attr('src', e.target.result)
               //.width(150)
               //.height(200);
      };
      reader.readAsDataURL(input.files[0]);
   }
}

/*          
          addPerson();
          if(numberOfDancers === 0){
            numberOfDancers++;
            numberAlive++;
          } else {
            addChair();
            numberOfDancers++;
            numberAlive++;
          }          
*/


function addChair(){
   $('#chair').clone().appendTo('.center').css('display','inline').attr('id','');
}

function addPerson(){
   var position = $(document).width()/2 - 75;
   if (numberOfDancers % 2 === 0){
      position = position + (numberOfDancers/2 * 70)
   } else {
      position = position - ((numberOfDancers+1)/2 * 70)
   }
   $('#first').clone().appendTo('body').css('display','inline').css('left',position).attr('id','dancer'+numberOfDancers);
}


function removePerson(){
   var removed = false;
   while (!removed){
      var rand = Math.floor((Math.random()*numberOfDancers)+0);
      if( $('#dancer'+rand)[0]){
         
         var height = $(window).height();
         var width = $(window).width();
         
         $('#dancer'+rand).css('margin-top','0px;');
         $('#dancer'+rand).css('top',height+60+'px');
         $('#dancer'+rand).css('left',width-150-(120*(numberOfDancers-numberAlive))+'px');
      
         $('#dancer'+rand).addClass('dead');
         
         sitDown();
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
   }
}

function removeChair(){
   $('.center img:last').remove();
}

