/*******************************************************************VARIABLE DECLARATION*******************************************************************/
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
var lang="";
/******************************************************************VARIABLE DECLARATION END******************************************************************/

/*****************************************************************Function to get Random String***************************************************************/
function getRandomString(lang){
	var get=$.get("getRandomString",{lang:lang});
	get.done(function(data){
		let val=data.trim();
		data=data.trim();
		var rawData=data.split(" ");
		let firstword=rawData[0];
		rawData.splice(0,1);
		$("#rawTextData").html("<font size='6'><font color='yellow' size='6px'><b><i>"+firstword+"</i></b></font>&nbsp;"+rawData.join(" ")+"</font>");
		randomString=data.split(" ");
		splicedString=val.split(" ");
	});
	get.fail(function(){
		swal("There was an error while getting the random string");
	});
}
/***************************************************************Function to get Random String END*************************************************************/


/******************************************************************DOCUMENT READY FUNCTION******************************************************************/
//On document ready
$(document).ready(function(){
	caseOption=$("#coption").val();
	lang=$("#language").val();
	$("#timer").hide();
	$("#btntryagain2").hide();
	$("#mainTextArea").focus();
	getRandomString(lang);
});

/****************************************************************DOCUMENT READY FUNCTION END*****************************************************************/

$("#language").change(function(){
	lang=this.value;
	getRandomString(lang);
	$("#mainTextArea").focus();
});

/***********************************************************************COUNTER FUNCTION*********************************************************************/
//Counter code start
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {     
        var current_minutes = mins-1
        seconds--;
        $("#Mint").html("<button class='btn btn-info form-control'><b>"+current_minutes.toString() + " Minute </b></button>");
        
        if(seconds>=20)
        	$("#Sec").html("<button class='btn btn-info form-control'><b>" + (seconds < 10 ? "0" : "") + String(seconds)+" Seconds </b></button>");
        else{
			if(seconds<20 && seconds>10)
        		$("#Sec").html("<button class='btn btn-info form-control text-warning'><b>" + (seconds < 10 ? "0" : "") + String(seconds)+" Seconds </b></button>");
        	else{
				if(seconds%2==0)
        			$("#Sec").html("<button class='btn btn-info form-control text-danger'><b>" + (seconds < 10 ? "0" : "") + String(seconds)+" Seconds </b></button>");
        		else
        			$("#Sec").html("<button class='btn btn-info form-control'><b>" + (seconds < 10 ? "0" : "") + String(seconds)+" Seconds </b></button>");
        	}
       }
        
        
        //Timeout function
        //Show result
        if(current_minutes==0 && seconds==0){
			$("#btnModal").click();
			if(val==1){
				wpm=correctWord.length;
			}else{
				wpm=correctWord.length/val;
			}
			//alert("WPM: "+wpm);
			accuracy=correctWord.length!=0 && spacecount!=0 ? (correctWord.length/spacecount)*100 : 0;
			//alert("Accuracy is: "+accuracy.toFixed(2)+"%");
			
			$("#wpm").html(wpm);
			$("#accuracy").html(accuracy.toFixed(2)+"%");
			$("#wrongWords").html("<font color='red'>"+wrongWord+"</font>");
			$("#btntryagain").show();
			$("#btntryagain2").show();
			
			var xValues = ["Total Words", "Correct Words", "Wrong Words", "Word Per Minute"];
			var total=parseInt(parseInt(spacecount)+1);
			var yValues = [total, correctWord.length, wrongWord.length, wpm];
			//var yValues = [23, 18, 5, 21, 88];
			var barColors = ["blue", "green","red","orange","brown"];
			
			new Chart("barChart", {
			  type: "bar",
			  data: {
			    labels: xValues,
			    datasets: [{
			      backgroundColor: barColors,
			      data: yValues
			    }]
			  },
			  options: {
			    legend: {display: false},
			    title: {
			      display: true,
			      text: "Your type history in bar chart"
			    }
			  }
			});
			
			new Chart("pieChart", {
			  type: "pie",
			  data: {
			    labels: xValues,
			    datasets: [{
			      backgroundColor: barColors,
			      data: yValues
			    }]
			  },
			  options: {
			    title: {
			      display: true,
			      text: "Your type history in pie chart"
			    }
			  }
			});
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
//Counter code end
/******************************************************************COUNTER FUNCTION END******************************************************************/


/********************************************************************SPACE KEY FUNCTION******************************************************************/
function spacePressed(){
	var now=parseInt(parseInt(spacecount)+1);
	var msg="";
	$("#typedWord").html("You have entered <font color='white' size='10px'> <b>"+now+"</b></font> words");
	spacecount+=1;
	//alert(randomString);
	let origin=randomString[spacecount-1];
	let typed=text.split(" ")[spacecount-1];
	$("#rawTextData").html("");
	if(caseOption=="wocase"){
		if(origin.toUpperCase()!=typed.toUpperCase()){
			wrongcount+=1;
			wrongWord.push(origin);
			msg="<font size='6'><font color='red'><span style='text-decoration: line-through;'>"+origin+"</span></font>&nbsp";
		}else{
			correctWord.push(typed);
			msg="<font size='6'><font color='green'>"+origin+"</font>&nbsp;";
		}
	}else{
		if(origin!=typed){
			wrongcount+=1;
			wrongWord.push(origin);
			msg="<font size='6'>font color='red'><span style='text-decoration: line-through;'>"+origin+"</span></font>&nbsp";
		}else{
			correctWord.push(typed);
			msg="<font size='6'><font color='green'>"+origin+"</font>&nbsp;";
		}
	}
	splicedString.splice(0,1);
	var nextWord=splicedString[0];
	splicedString.splice(0,1);
	msg+="<font color='yellow' size='6px'><b><i>"+nextWord+"</i></b></font>&nbsp;"+splicedString.join(" ")+"</font>";
	$("#rawTextData").html(msg);
	splicedString.splice(0, 0, nextWord);
}
/******************************************************************SPACE KEY FUNCTION END*****************************************************************/

//Disabling context menu(Right click)
window.oncontextmenu=function(){
	//return false;
}
//On try again click reload page
$("#btntryagain,#btntryagain2").click(function(){
	location.reload(true);
});

//On option change change copare value
$("#coption").change(function(){
	caseOption=$("#coption").val();
});

/**************************************************************DOCUMENT KEY DOWN FUNCTION******************************************************************/
//On key press 
$(document).keydown(function(event) {	
	//Disabling backspace after space pressed
	if(event.keyCode==8){
		let text=$("#mainTextArea").val();
		let c=text.substring(text.length-1,text.length);
		if(c==" "){
			let fl=$("#mainTextArea").is(":focus");
			if(fl){
				return false;
			}
		}
	}
	//Disabling paste(ctrl+v 86)
	if (event.ctrlKey==true && (event.which == '118' || event.which == '86')){  
		event.preventDefault();  
	}  
	
	//Disabling tab-9,enter-13, left-37,up-38,right-39,down-40 mouse cursor, delete-46 key
	if (event.keyCode==9 || event.keyCode==13 || event.keyCode==37 || event.keyCode==38 || event.keyCode==39 || event.keyCode==40 || event.keyCode==46){
		return false;
	}
	
	//Disabling  select all (Ctrl+a)- 65, source code(ctrl+u)-85
	if(event.ctrlKey && (event.keyCode === 85 || event.keyCode === 83 || event.keyCode ===65 )){
	   return false;
	}
	
	//If spacebar key pressed
	if(event.keyCode==32){
		let text=$("#mainTextArea").val();
		let c=text.substring(text.length-1,text.length);
		if(c==" " && text==""){
			return false;
		}
	}
});  
/*************************************************************DOCUMENT KEY DOWN FUNCTION END****************************************************************/

/*****************************************************************DOCUMENT KEY UP FUNCTION******************************************************************/
$(document).keyup(function(event){
	/*let txt=$("#mainTextArea").val().trim();
	var lastChar=txt.substring(txt.length-1,txt.length);
	let frstChar=splicedString[0].substring(0,1);
	if(lastChar!=frstChar){
		let fword=splicedString[0];
		let ind=fword.indexOf(frstChar);
		alert(ind);
		splicedString.splice(0, 1, "wrong");
		$("#rawTextData").html(splicedString.join(" "));
	}*/
	
	if(event.keyCode==32){
		if($("#mainTextArea").val()!=""){
			if($("#mainTextArea").is(":focus")){
				spacePressed();
			}
		}
	}
});

/*************************************************************DOCUMENT KEY UP FUNCTION END******************************************************************/


/**************************************************************TYPE AREA KEY UP FUNCTION********************************************************************/
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
		//swal("Please start typing to start your test");
		$("#msg").html("<center><p class='bg-danger text-white mt-2 mb-2' style='border-radius:10px;'>Please start typing to start your test</p></center>");
		$("#mainTextArea").val("").focus();
		$("#timer").hide();
		return false;
	}else{
		$("#msg").html(""); 
		if(val==1){
			$("#countdowntext").html("Your test will over within "+val+" Minute.");
		}else{
			$("#countdowntext").html("Your test will over within "+val+" Minutes.");
		}
		if(!flag) {
			flag=setInterval(function() { 
			   	countdown(val);
			}, 1000); 
		}
	}
	$("#timer").show();
});
/**************************************************************TYPE AREA KEY UP FUNCTION END**************************************************************/

/************************************************************Function to zoom while click inside text box*************************************************/
$("#mainTextArea").click(function(){
	if($("#mainTextArea").css("font-size")=="30px"){
		$("#mainTextArea").css("font-size", "32px");
		$("#mainTextArea").css("cursor","zoom-out");
	}else{
		$("#mainTextArea").css("font-size", "30px");
		$("#mainTextArea").css("cursor","zoom-in");
	}
});

/**********************************************************Function to zoom while click inside text box end***********************************************/

$("#btnCertificate").click(function(){
	//alert(wpm+" "+accuracy);
	var name=$("#name").val();
	var address=$("#address").val();
	if(name==""){
		$("#name").focus();
		return false;
	}
	if(address==""){
		$("#address").focus();
		return false;
	}
	alert(lang);
	var url=window.location.href+"createPDF?name="+name+"&address="+address+"&wpm="+wpm+"&accuracy="+accuracy.toFixed(2)+"&lang="+lang;
	window.open(url,"_blank");
});




