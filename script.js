//Validate any form from 'FormId'
function validateForm(formid){
	var inputs = document.getElementById(formid).elements;
	var ipcheck = [];
    //Extract Each Element Value
	var result = true;
    for (var i = 0; i < inputs.length; i++) { 
		
		//Check all the required field in form
	   if(inputs[i].getAttribute("data-required") && inputs[i].value == '' && !inputs[i].disabled){
		   result = false;
	   }
	   
	   //Check ip allow only ipv4, ipv6 and fqdn in form
	   if(inputs[i].getAttribute("check-ip") && inputs[i].value != '' && !inputs[i].disabled){
		   id = inputs[i].id;
		   msg = inputs[i].title;
		   iptype = inputs[i].getAttribute("check-ip").trim();
		   ipcheck.push(checkip(id,msg,iptype));
	   }
	   
		//Check the checkbox required option in form
	    if(inputs[i].getAttribute("check-checkbox") && !inputs[i].disabled){
			checkclass = inputs[i].getAttribute("check-checkbox").trim();
			if(!isCheckedclass(checkclass)){
				result = false;
			}
		}
		
		//Check field to enter valid string
		if(inputs[i].getAttribute("check-string") && !inputs[i].disabled){
			messageclass= inputs[i].getAttribute("check-string").trim();
			if(/[^a-zA-Z0-9-]/.test(inputs[i].value)) {  //Allow alphanumeric with dash "-"
				ShowSection(messageclass);
				inputs[i].classList.add("errorsbox");
				result = false;
			}else{
				hideSection(messageclass);
				inputs[i].classList.remove("errorsbox");
			}
		}
	   
    }
	
	//Show Message to fill all the required field.
	if(result == false){
		ShowSection('display_error_section');
	}else{
		hideSection('display_error_section');
	}
	
	//Allow local/localhost only for embbeded
	if(document.getElementById("ServerType")){
		servertype = document.getElementById("ServerType").value;
		if(servertype != 1){
			var serveurname = document.getElementsByName("serveur")[0].value;
			var ipvalue = document.getElementsByName("aip")[0].value;
			if(serveurname == 'local' ||  ipvalue == 'localhost'){
				alert('Please Check name/IP');
				result = false;
			}else{
			}
		}
	}
	
	//Check all Ip field
	if(ipcheck){
		for (k = 0; k < ipcheck.length; k++) {
				if(ipcheck[k] == false){
					result = false;
				}
		}
	}
	
	return result;
}
