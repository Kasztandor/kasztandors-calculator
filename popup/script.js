window.onload = function(){
	var buttons = document.getElementsByClassName("button");
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].addEventListener("click", extendingWithUsingButtonsInHTML);
	}
	document.getElementById("field").addEventListener("input", checkingAndCountingMainFunction);
	document.getElementById("field").addEventListener("keyup", function(event){
		if (event.keyCode === 13){
			document.getElementById("field").value+="=";
			checkingAndCountingMainFunction();
		}
	});
}
function changeSubtractionToAddingNegativeNumbers(x){
	var flag = true
	while(flag){
		flag = false
		var index = x.findIndex(el => el=="-");
		if (index!=-1){
			flag=true
			x[index+1]=x[index+1]*-1;
			if (!isNaN(x[index-1]) || x[index-1]==")"){
				x[index]="+";
			}
			else{
				x.splice(index,1);
			}
		}
	}
	return x;
}
function noBracketsEquationCounter(x){
	var flag = true
	while(flag){
		flag = false
		var index = x.findIndex(el => el == "*" || el == "/");
		if (index!=-1){
			flag=true
			if (x[index]=="*"){
				x[index-1]=x[index-1]*x[index+1];
			}
			else{
				x[index-1]=x[index-1]/x[index+1];
			}
			x.splice(index,2);
		}
	}
	var flag = true
	while(flag){
		flag = false
		var index = x.findIndex(el => el == "+");
		if (index!=-1){
			flag=true
			x[index-1]=x[index-1]*1+x[index+1]*1;
			x.splice(index,2);
		}
	}
	return x;
}
//sendingBracketsToNoBracketsEquationCounterAndCountingIt(["2","+","(","2","+","2",")"])
function sendingBracketsToNoBracketsEquationCounterAndCountingIt(x){
	var flag = true
	while (flag){
		console.log(x)
		flag = false
		if (x.findIndex(el => el == "(")!=-1 && x.findIndex(el => el == ")")!=-1){
			flag = true
			var openBracketIndex = -1;
			var closeBracketIndex = -1;
			for (var i=0; i<x.length; i++){
				if (x[i]=="("){
					openBracketIndex = i;
				}
				else if (x[i]==")"){
					closeBracketIndex = i;
					break;
				}
			}
			console.log(openBracketIndex+" "+closeBracketIndex)

			x[openBracketIndex] =  noBracketsEquationCounter(x.splice((openBracketIndex+1),(closeBracketIndex-openBracketIndex-1)))[0];
			x.splice(openBracketIndex+1,1);
		}
		console.log(flag)
	}
	return noBracketsEquationCounter(x);
}
function checkingAndCountingMainFunction(){
	var string = document.getElementById("field").value;
	string = string.replace(/[\-][\-\+\/\*]/g, '-')
	string = string.replace(/[\+][\-\+\/\*]/g, '+')
	string = string.replace(/[\/][\-\+\/\*]/g, '/')
	string = string.replace(/[\*][\-\+\/\*]/g, '*')
	var shouldICountItRightNow = string.slice(-1)=="=";
	var arr = string.match(/([0-9]+[.][0-9]+|[0-9]+|[\-\+\/\*\.\(\)])/g);

	if (arr===null || string.slice(-1)=="C"){
		document.getElementById("field").value="";
	}
	else if (arr.join("")!=string){
		document.getElementById("field").value=arr.join("");
	}
	if(arr!==null && shouldICountItRightNow){
		arr = sendingBracketsToNoBracketsEquationCounterAndCountingIt(changeSubtractionToAddingNegativeNumbers(arr));
		document.getElementById("field").value = arr;
	}
}
function extendingWithUsingButtonsInHTML(evt){
	document.getElementById("field").value+=evt.currentTarget.innerHTML;
	checkingAndCountingMainFunction();
}