window.onload = function(){
	var buttons = document.getElementsByClassName("button");
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].addEventListener("click", extend);
	}
	document.getElementById("field").addEventListener("input", check);
}
function check(){
	var string = document.getElementById("field").value;
	var shouldICountItRightNow = string.slice(-1)=="=";
	var arr = string.match(/([0-9]+[.][0-9]+|[0-9]+|[\-\+\/\*\.])/g);

	if (arr===null){
		document.getElementById("field").value="";
	}
	else if (arr.join("")!=string){
		document.getElementById("field").value=arr.join("");
	}
	if(arr!==null && shouldICountItRightNow){
		var counting = arr;
		var flag = true
		while(flag){
			flag = false
			var index = counting.findIndex(element => element == "*" || element == "/");
			if (index!=-1){
				flag=true
				if (counting[index]=="*"){
					counting[index-1]=counting[index-1]*counting[index+1];
				}
				else{
					counting[index-1]=counting[index-1]/counting[index+1];
				}
				counting.splice(index,2);
			}
		}
		var flag = true
		while(flag){
			flag = false
			var index = counting.findIndex(element => element == "+" || element == "-");
			if (index!=-1){
				flag=true
				if (counting[index]=="+"){
					counting[index-1]=counting[index-1]*1+counting[index+1]*1;
				}
				else{
					counting[index-1]=counting[index-1]-counting[index+1];
				}
				counting.splice(index,2);
			}
		}

		var counted = counting;
		document.getElementById("field").value = counted;
	}
}
function extend(evt){
	document.getElementById("field").value+=evt.currentTarget.innerHTML;
	check();
}