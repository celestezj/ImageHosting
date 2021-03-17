'use strict';

function dyformatContent(content, container) {
	  var contentArray = content.split(' ');
	  var formattedContent = document.createElement('div');
	  //formattedContent.style.textAlign="center";
	  contentArray.map(function (word) {
		formattedContent.appendChild(dycreateWord(word));
	  });
	  //console.log(contentArray);

	  container.replaceChild(formattedContent, container.firstChild);
};

function dycreateWord(characters) {
	  var word = document.createElement('div');
	  var wordArray = characters.split('');
	  wordArray.map(function (char) {
		word.appendChild(dyformatCharacter(char));
	  });
	  //word.appendChild(formatCharacter('&nbsp;'));
	  return word;
}

function dyformatCharacter(text) {
	  var text = text === ' ' ? '&nbsp;' : text;
	  var character = document.createElement('span');
	  character.innerHTML = text;
	  return character;
}

function dykatongrender(){
	var dykatongallcontents=document.getElementsByClassName("dykatongcontent");
	for(var i=0; i<dykatongallcontents.length; i++){
		var dykatongcontent=dykatongallcontents[i].innerText;
		dyformatContent(dykatongcontent, dykatongallcontents[i]);
	}
}