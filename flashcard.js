var inquirer = require("inquirer");



function basicFlash(){ 

	inquirer.prompt([

  
  		{
    	type:'input' ,
    	message: "Type in what you want on the front of your card",
    	name: "frontText"
  		},
  		{
    	type: 'input',
    	message: "Now type in what you want on the back of your card",
    	name: "backText"
  		},

  	]).then(function(info) {

  		function Basic(front, back) {
			this.front = front;
			this.back = back;
			this.print = function(){
				console.log(this.back, this.front);
			};
			this.choose = function() {
				inquirer.prompt([
					{
				    type: "list",
				   	message: "what would you like to do ?",
				    choices: ["show front", "show back", "enter a new card"],
				    name: "choice"
				    },

				]).then(function(selection) {
					if (selection.choice === "show front"){
						console.log(newFlash.front);
						newFlash.choose();
					};
					if (selection.choice === "show back"){
						console.log(newFlash.back);
						newFlash.choose();
					};
					if (selection.choice === "enter a new card"){
						basicFlash();
					};
				});
			};

		};

		var newFlash = new Basic(info.frontText, info.backText)
		
		newFlash.choose();

	});				
};

function clozeFlash(){

	inquirer.prompt([

  		{
    	type:'input' ,
    	message: "Type in the information you want to display",
    	name: "fullText"
  		},
  		{
    	type: 'input',
    	message: "Now type in which part of the information you want to be hidden",
    	name: "clozeText"
  		},

  	]).then(function(info) {

  		function ClozeCard(text, cloze) {
			this.text = text;
			this.cloze = cloze;
			this.full = function(){};
			this.partial = function(){};
			this.choose = function() {
				
				inquirer.prompt([
					{
				    type: "list",
				   	message: "what would you like to do ?",
				    choices: ["show full text", "show text with hidden info", "enter a new card"],
				    name: "choice"
				    },

				]).then(function(selection) {
					
					if (selection.choice === "Show full text"){
						console.log(newCloze.text);
						newCloze.choose();
					};
					
					if (selection.choice === "Show text with Answer Hidden"){
						var fullText = newCloze.fullText;
						var toHide =   newCloze.clozeText;
						var fullArray = fullText.split(' ');
						var hideArray = toHide.split(' ');
						var newArray =[];

						for (var i=0;i<fullArray.length;i++){

							if( fullArray[i] === hideArray[i]){
							newArray.push("     ");
							}else{
							newArray.push(fullArray[i])
							};
						
							newString =newArray.join(' ');
						
						};console.log(newString)
						newCloze.choose();
					};
					
					if (selection.choice === "enter a new card"){
						clozeFlash();
					};
				});
			};

		};

		var newCloze = new ClozeCard(info.fullText, info.clozeText)
		
		newCloze.choose();

	});

};



inquirer.prompt([

{
    type: "list",
    message: "Which kind of flashcards would you like to use?",
    choices: ["Basic Flashcards", "Cloze-Deleted Flashcards"],
    name: "game"
  },

]).then(function(action) {

	if(action.game === "Basic Flashcards"){
		basicFlash();
	}
	if(action.game === "Cloze-Deleted Flashcards"){
		clozeFlash();
	}
});