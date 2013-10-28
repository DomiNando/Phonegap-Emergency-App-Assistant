// App pages
var $login = $("#login");
var $main = $("#mainPage");
var $call = $("#call");
var $otherServices = $("#otherServices");
var $chat = $("#chat");
var $chooseChat = $("#chooseChat");

// Elements
var $back = $(".back");
var $previous = $main;
var $done = $("#done");
var $phoneNumber = $("#userPhoneNumber");
var $sections = $("section");
var $call911 = $("#call911");
var $police = $("#police");
var $firefighters = $("#firefighters");
var $ambulance = $("#ambulance");
var $hospitals = $("#hospitalsButton");
var $other = $("#other");
var $otherServices = $("#otherServices");
var $hospitalPage = $("#hospitals");
var $towingServices = $("#towingButton");
var $chatButton = $("#chatButton");
var $chatPolice = $("#chatPolice");
var $chatFirefighters = $("#chatFirefighters");
var $chatAmbulance = $("#chatAmbulance");
var arrayStack = new Array();

// configuration
var isConfigured = false;


var emergencyApp = {

	init: function () {

		if (isConfigured) {  //el usuario entro un numero de telefono y acepto los terminos de servicio
			emergencyApp.createEvents();  //la aplicacion espera porque los botones se aprieten
			$login.hide();  //esconde la pagina de login
			$main.fadeIn("fast", emergencyApp.mainPage());  //la pagina de los botones call aparece

		} else {
			$login.show();
			$done.click(function () {
				var $termsAccepted = $("#termsAccepted").is(":checked");
				console.log($termsAccepted);
				
				if ($termsAccepted && $phoneNumber.val().length == 10) {
					var numero = parseInt($phoneNumber.val(), 10);
					if (!isNaN(numero)){
				//if ($termsAccepted) {
						isConfigured = true;
						emergencyApp.init();
					}
				}
			});
		}
	},

	mainPage: function () {

		$other.click(function () {
			$previous = $main;
			$sections.hide();
			arrayStack.push($main);
			$otherServices.fadeIn("fast");
		});
	},

	createEvents: function () {

		$back.click(function () {
			$sections.hide();
			arrayStack.pop(arrayStack.length-1).fadeIn("fast");
		});

		$police.click(function() {
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
			
		});

		$firefighters.click(function(){
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
		});

		$ambulance.click(function(){
			$previous = $main;
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
		});

		$call911.click(function(){
			arrayStack =[];
			//mecanismo de llamada de Phonegap
		});

		$hospitals.click(function() {
			$sections.hide();
			arrayStack.push($otherServices);
			$hospitalPage.fadeIn("fast");
		});

		$towingServices.click(function(){
			$sections.hide();
			arrayStack.push($otherServices);
			//mecanismo de llamada de Phonegap
			$call.fadeIn("fast");
		});

		$chatButton.click(function(){
			$sections.hide();
			arrayStack.push($otherServices);
			$chooseChat.fadeIn("fast");
		});
		
		$chatPolice.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			$chat.fadeIn("fast");
		});
		
		$chatFirefighters.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			$chat.fadeIn("fast");
		});
		
		$chatAmbulance.click(function(){
			$section.hide();
			arrayStack.push($chooseChat);
			$chat.fadeIn("fast");
		});

	}
};

emergencyApp.init();
