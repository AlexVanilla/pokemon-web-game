var charmander = {
	name: "Charmander",
	health: 100,
	lvl: 12,
	effect: null,
	
	//Below is an array for the Pokemon moves with another set of attributes.
	moves: [{
		name: "Ember",
		type: "Attack",
		power: 90,
		accuracy: 1.0
		
		//power: 20,
		//accuracy: 0.8
	},
	{
		name: "Scratch",
		type: "Attack",
		power: 10,
		accuracy: .90
	},
	{
		name: "Leer",
		type: "Defense",
		power: .20,
		accuracy: 1.0
	},
	{
		name: "Growl",
		type: "Defense",
		power: .65,
		accuracy: .65
	}]	
};

var pikachu = {
	name: "Pikachu",
	health: 100,
	lvl: 9,
	effect: null,
	
	moves: [{
		name: "Thunder Shock",
		type: "Attack",
		power: 10,
		accuracy: .95
	},
	{
		name: "Thunder Wave",
		type: "Attack",
		power: 65,
		accuracy: 1.0
	},
	{
		name: "Tail Whip",
		type: "Defense",
		power: .15,
		accuracy: 1.0
	},
	{
		name: "Growl",
		type: "Defense",
		power: .55,
		accuracy: .55
	}]	

};

var currentState;
var cpuPokemon;
var userPokemon;


var cpuTurn = {
	
	play: function(){
		var randomMove = Math.floor(Math.random() * 4);
		var currentCPUMove = cpuPokemon.moves[randomMove];
		
		var setUpCPUField = function(){
			$("#chat-text").text("What will " + cpuPokemon.name + " do?");
			prepareToAttack();
		};
		
		var prepareToAttack = function(){
			$("#pikachu-img").animate({
				top: "-=25",			
				
			}, 200, function(){
				$("#pikachu-img").animate({
					top: "+=25",
				}, 200)
			});
			getAccuracy();
		};
		
		var getAccuracy = function(){
			var setAccuracy = Math.random();
			if(setAccuracy <= currentCPUMove.accuracy){
				$("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
				getMoveType();  //NOTE:  This will only call this function if the method was successful.
			} else {
				$("#chat-text").text(cpuPokemon.name + " missed with " + currentCPUMove.name + "!");
				currentState = playerTurn;
				setTimeout(loop, 1500)
			}
		};
		
		var getMoveType = function(){
			showMoveAnimation();
			
			if(currentCPUMove.type == "Attack"){
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		};
		
		var showMoveAnimation = function(){
			$("#attack-img").addClass("cpu-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};
		
		var attackingMove = function(){
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("cpu-attack-img");
			if(!cpuPokemon.effect){
				userPokemon.health -= currentCPUMove.power;
			} else {
				userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
				cpuPokemon.effect = null;
			}
			$("#user-health-bar").css("width", userPokemon.health + "%");
			currentState = playerTurn;
			loop();
		};
		
		var defensiveMove = function(){
			$("#attack-img").addClass("hid");
			$("#attack-img").removeClass("cpu-attack-img");
			userPokemon.effect = currentCPUMove.power;
			currentState = playerTurn;
			loop();
		};
		
		setUpCPUField();
	}
};

var playerTurn = {
	play: function(){
		var currentUserMove;
		
		var setUpUserField = function(){
			var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];
			
			$("#user-buttons").removeClass("hide");
			$("#chat-text").text("What will " + userPokemon.name + " do?");
			
			for(var i = moveButtons.length - 1; i >= 0; i--){
				$(moveButtons[i]).text(userPokemon.moves[i].name);
			}
			
		};
		
		var prepareToAttack = function(){
			console.log("prepare to attack called");
			$("#user-buttons").addClass("hide");
			
			$("#charmander-img").animate({
				top: "-=25",			
				
			}, 200, function(){
				$("#charmander-img").animate({
					top: "+=25",
				}, 200)
			});
			getAccuracy();
		};
		
		var getAccuracy = function(){
			console.log("getAccuracy called");
			var setAccuracy = Math.random();
			if(setAccuracy <= currentUserMove.accuracy){
				$("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
				getMoveType();
			} else {
				$("#chat-text").text(userPokemon.name + " missed with " + currentUserMove.name + "!");
				currentState = cpuTurn;
				setTimeout(loop, 1500)
			}
		};
		
		var getMoveType = function(){
			console.log("getMoveType called");
			showMoveAnimation();
			
			if(currentUserMove.type == "Attack"){
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		};
		
		var showMoveAnimation = function(){
			$("#attack-img").addClass("user-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};
		
		var attackingMove = function(){
			console.log("attackingMove called");
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("user-attack-img");
			if(!userPokemon.effect){
				cpuPokemon.health -= currentUserMove.power;
			} else {
				cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * UserPokemon.effect);
				userPokemon.effect = null;
			}
			$("#cpu-health-bar").css("width", cpuPokemon.health + "%");
			currentState = cpuTurn;
			console.log("line before loop is here");
			loop();
		};
		
		var defensiveMove = function(){
			$("#attack-img").addClass("hid");
			$("#attack-img").removeClass("user-attack-img");
			cpuPokemon.effect = currentUserMove.power;
			currentState = cpuTurn;
			loop();
		};
		
		//This is how to use multiple selectors in jquery
		$("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function(){
			var move = $(this).attr("value");
			//console.log("Click");   //This was a code that was used to help debug the code.  The clicking was working properly at the time.
			currentUserMove = userPokemon.moves[move];
			prepareToAttack();
			
			
		})
		
		setUpUserField();
	}
};

var loop = function(){
	console.log("loop called");
	if(cpuPokemon.health <= 0 || userPokemon.health <= 0){
		$("#game-over").removeClass("hide");
		console.log("Game Over");
	} else {
		console.log("Still playing");
		currentState.play();
	}
};



var init = function(){
	cpuPokemon = pikachu;
	userPokemon = charmander;
	
	//These are examples of jquery
	$("#cpu-name").text(cpuPokemon.name);
	$("#cpu-lvl").text("lvl " + cpuPokemon.lvl);
	$("#user-name").text(userPokemon.name);
	$("#user-lvl").text("lvl " + userPokemon.lvl);
	
	
	
	currentState = playerTurn;
	loop();
};

init();
