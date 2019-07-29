
$(function(){
  
  //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');
    var reaction = $('#reaction');
    var jokeLoader = $('#joke-loader');
    var jokeCount = 0;
    var jokeFunny = 0;
    
    jokeLoader.hide();
    jokeResetButton.hide();
  
    //Events
    jokeButton.on('click',  function(e){
      jokeLoader.show();
      jokeCount++;
      //Do the magic here
     $.ajax({
        method:'GET',
        url: JOKES_API,
        
      }).then( function(res){
        $.ajax({
          method:'GET',
          url: YN_API,
          
        }).then( function(res){
          
         jokesList.append('<img style="height:200px;width:100%" src="'+res.image+'"/>');
         console.log(res);
         if(res.answer== 'yes'){
           jokeFunny++;
         }
        
         console.log(jokeFunny,jokeCount,res.answer);
        });
        console.log(res);
        jokeLoader.hide();
          jokesList.append("<li>"+res+"</li>");
      });

       if(jokeCount==5){
     
        if(jokeFunny==3&&jokeFunny>3){
          reaction.append('<img style="height:200px;width:100%" src="../LAYOUT/funny.png"/>');
         }
         else{
          reaction.append('<img style="height:200px;width:100%" src="../LAYOUT/not funny.png"/>');
         }
         jokeResetButton.show();  
        }
      
     
      
    });
    jokeResetButton.on('click', function(){
      jokeResetButton.hide();
      location.reload();  
    });
    
  })