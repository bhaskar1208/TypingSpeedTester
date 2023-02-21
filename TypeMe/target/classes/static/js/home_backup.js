var randomString;
var splicedString;
var spacecount=0;
var wrongcount=0;
var flag;
var spacecount=0;
var wrongcount=0;
var wrongWord=[];
var correctWord=[];
var text="";
var val="";
var wpm=0;
var accuracy=0;
var caseOption=0;

$(document).ready(function(){
	caseOption=$("#coption").val();
	$("#timer").hide();
	$("#btntryagain2").hide();
	var get=$.get("getRandomString",{});
	get.done(function(data){
		var val=data.trim();
		data=data.trim();
		$("#rawTextData").html(data);
		randomString=data.split(" ");
		splicedString=val.split(" ");
	});
	get.fail(function(){
		swal("There was an error while getting the random string");
	});
	
	$(document).keydown(function(event) {
	   	//event.ctrlKey = check ctrl key is press or not  
	   	//event.which = check for F7  
	   	// event.which =check for v key  
   		if(event.keyCode==8){
			let text=$("#mainTextArea").val();
			let c=text.substring(text.length-1,text.length);
			if(c==" "){
				return false;
			}
		}
   		if (event.ctrlKey==true && (event.which == '118' || event.which == '86')){  
    		event.preventDefault();  
		}  
		if (event.keyCode==37 || event.keyCode==38 || event.keyCode==39 || event.keyCode==40 || event.keyCode == 123){
			return false;
		}
		if(event.ctrlKey && (event.keyCode === 85 || event.keyCode === 83 || event.keyCode ===65 )){
		   return false;
		}
		
		
		/*if(event.keyCode==32){
			let text=$("#mainTextArea").val();
			let c=text.substring(text.length-1,text.length);
			if(c==" "){
				return false;
			}else{
				
			}
		}*/
		
		
	});  
});

window.oncontextmenu=function(){
	return false;
}

$("#btntryagain,#btntryagain2").click(function(){
	location.reload(true);
});

$("#coption").change(function(){
	caseOption=$("#coption").val();
});
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {     
        var current_minutes = mins-1
        seconds--;
        $("#Mint").html("<button class='btn btn-info form-control'>"+current_minutes.toString() + " M </button>");
        
        if(seconds>=20)
        	$("#Sec").html("<button class='btn btn-info form-control'>" + (seconds < 10 ? "0" : "") + String(seconds)+" S </button>");
        else{
			if(seconds<20 && seconds>10)
        		$("#Sec").html("<button class='btn btn-info form-control text-warning'>" + (seconds < 10 ? "0" : "") + String(seconds)+" S </button>");
        	else{
				if(seconds%2==0)
        			$("#Sec").html("<button class='btn btn-info form-control text-danger'>" + (seconds < 10 ? "0" : "") + String(seconds)+" S </button>");
        		else
        			$("#Sec").html("<button class='btn btn-info form-control'>" + (seconds < 10 ? "0" : "") + String(seconds)+" S </button>");
        	}
       }
        	
        if(current_minutes==0 && seconds==0){
			//swal("Timeout");
			$("#btnModal").click();
			//alert("Total numbers of wrong type: "+wrongcount);
			//alert("Wrong words: "+wrongWord);
			//alert("Correct words: "+correctWord);
			if(val==1){
				wpm=correctWord.length;
			}else{
				wpm=correctWord.length/val;
			}
			//alert("WPM: "+wpm);
			accuracy=(correctWord.length/spacecount)*100;
			//alert("Accuracy is: "+accuracy.toFixed(2)+"%");
			
			$("#wpm").html(wpm);
			$("#accuracy").html(accuracy.toFixed(2)+"%");
			$("#wrongWords").html("<font color='red'>"+wrongWord+"</font>");
			$("#btntryagain").show();
		}
        
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            clearInterval(flag);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
        }
    }
    tick();
}



$("#mainTextArea").keyup(function(e){
	text=$("#mainTextArea").val();
	val=$("input[name='radio_time']:checked").val();
	//alert(text);
	if(val==undefined){
		swal("Please set the duration for your test");
		$("#mainTextArea").val("");
		$("#timer").hide();
		return false;
	}else if(text==""){
		swal("Please start typing to start your test");
		$("#mainTextArea").val("");
		$("#timer").hide();
		return false;
	}else{ 
		if(val==1){
			$("#countdowntext").html("You set time to "+val+" Minute.");
		}else{
			$("#countdowntext").html("You set time to "+val+" Minutes.");
		}
		if(!flag) {
			flag=setInterval(function() { 
			   	countdown(val);
			}, 1000); 
		}
	}
	$("#timer").show();
	
	if(e.keyCode==75){
		return false;
	}
	
	if(e.keyCode==32 && text!=""){	
		var now=parseInt(parseInt(spacecount)+1);
		$("#typedWord").html("You have entered <font color='white' size='10px'> <b>"+now+"</b></font> words");
		spacecount+=1;
		//alert(randomString);
		let origin=randomString[spacecount-1];
		let typed=text.split(" ")[spacecount-1];
		splicedString.splice(0,1);
		$("#rawTextData").html("");
		if(caseOption=="wocase"){
			if(origin.toUpperCase()!=typed.toUpperCase()){
			wrongcount+=1;
			wrongWord.push(origin);
			$("#rawTextData").html("<font color='red'>"+origin+"</font>&nbsp;"+splicedString.join(" "));
			}else{
				correctWord.push(typed);
				$("#rawTextData").html("<font color='green'>"+origin+"</font>&nbsp;"+splicedString.join(" "));
				//$("#rawTextData").html(splicedString.join(" "));
			}
		}else{
			if(origin!=typed){
			wrongcount+=1;
			wrongWord.push(origin);
			$("#rawTextData").html("<font color='red'>"+origin+"</font>&nbsp;"+splicedString.join(" "));
			}else{
				correctWord.push(typed);
				$("#rawTextData").html("<font color='green'>"+origin+"</font>&nbsp;"+splicedString.join(" "));
				//$("#rawTextData").html(splicedString.join(" "));
			}
		}
		
	}
});



function isValid(d,e){
	if(d.value==""){
		if(e.keyCode==32){
			e.preventDefault();
		}
	}
	if(e.keyCode==08 || e.keyCode==09 || e.keyCode==13 || e.keyCode==37 || e.keyCode==39 || e.keyCode==44 || e.keyCode==46){
		e.preventDefault();
		return false;
	}
}
