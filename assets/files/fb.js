console.log("ph_grayoff_ep2_sf");
//My own Document ready alternative
window.readyHandlers = [];
window.ready = function ready(handler) {
  window.readyHandlers.push(handler);
  handleState();
};

window.handleState = function handleState () {
  if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
    while(window.readyHandlers.length > 0) {
      (window.readyHandlers.shift())();
    }
  }
};
document.onreadystatechange = window.handleState;


ready(function () {
	//Report Post button Click
	var post_button = document.getElementById("report_post");
	post_button.addEventListener("click",function(e){
		document.getElementById("facebook_popup").style.display = 'block';
	},false);

	//Cancel button Click
	var cancel = document.getElementById("fb_cancel");
	cancel.addEventListener("click",function(e){
		document.getElementById("facebook_popup").style.display = 'none';
	},false);

	//Radio on Change
	check_for_radio='';
	var rad = document.getElementsByName("answer");
	for(var i = 0; i < rad.length; i++) {
		document.getElementsByName("answer")[i].addEventListener("change",function(e){
			var sub_button = document.getElementById("fb_submit");
			check_for_radio = 'checked';
			radio_value = this.value;
			if (sub_button.classList)
			  sub_button.classList.remove("blocked_button");
		},false);
	}

	//Ajax Method
	function SynchroAjax(url, passData) 
	{
		if (window.XMLHttpRequest) {              
			AJAX=new XMLHttpRequest();              
		} else {                                  
			AJAX=new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (AJAX) {
			AJAX.open("POST", url, false);
			AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			AJAX.send(passData);
		return AJAX.responseText;                                         
		} else {
			return false;
		}                                             
	}

	//Submit on Click
	var fb_submit = document.getElementById("fb_submit");
	fb_submit.addEventListener("click",function(e){
		if (check_for_radio=="checked")
		{
			thank_you =document.getElementById("get_content").innerHTML;
			fb_submit.style.display = 'none';
			fb_textarea = document.getElementById("fb_textarea").value;
			var params='folder=ph_grayoff_ep2_sf&action=ADD_COMMENT&poll_answer='+radio_value+'&textarea='+fb_textarea+'&rand='+Math.random();
			fb_response = SynchroAjax('../fb_report/fb_ajax.php', params);
			if(fb_response=="test")
			{
				//document.getElementById("fb_text_content").innerHTML = "<div class='fb_thanks'>Thank You!</div>";
				document.getElementById("fb_text_content").innerHTML = thank_you;
				document.getElementById("fb_submit").style.display = 'none';
				//document.getElementById("fb_cancel").textContent = "Close";
			}
		}
	},false);
});