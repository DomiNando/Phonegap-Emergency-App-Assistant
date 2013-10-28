// App pages
var $login = $("#login");
var $main = $("#mainPage");
var $call = $("#call");
var $otherServices = $("#otherServices");
var $chat = $("#chat");
var $chooseChat = $("#chooseChat");
var $startChat = $("#startChat");
var $chatNextButton = $("#next");
var $chatPage= $("#chatScreen");
var $hospitalPage = $("#hospitals");


// Elements
var $back = $(".back");
var $done = $("#done");
var $phoneNumber = $("#userPhoneNumber");
var $sections = $("section");
var $call911 = $("#call911");
var $police = $("#police");
var $firefighters = $("#firefighters");
var $ambulance = $("#ambulance");
var $hospitals = $("#hospitalsButton");
var $other = $("#other");
var $towingServices = $("#towingButton");
var $chatButton = $("#chatButton");
var $chatPolice = $("#chatPolice");
var $chatFirefighters = $("#chatFirefighters");
var $chatAmbulance = $("#chatAmbulance");
var $callNext = $("#callNext");
var $hangUp = $("#hangUp");
var $previous = $("#previous");
var counter = 0;
var arrayStack = new Array();
var usersArray = new Array();
var receiver = usersArray[0];


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
				//salvar numero en memoria interna!!!
						console.log($termsAccepted);
						emergencyApp.init();
					}
				}
			});
		}
	},

	mainPage: function () {

		$other.click(function () {
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
			$sections.hide();
			arrayStack.push($chooseChat);
			$chat.fadeIn("fast");
		});
		
		$startChat.click(function(){
			$sections.hide();
			$chatPage.fadeIn("fast");
			//chat(receiver);
		});
		
		$chatNextButton.click(function(){
			$sections.hide();
			if(counter < usersArray.length-1)
			{
				counter = counter + 1;
				arrayStack.push($chatPage);
				receiver = usersArray[counter];
				$chatPage.fadeIn("fast");
			} else {
				arrayStack = [];
				$sections.hide();
				$main.fadeIn("fast");
			}
		});
		
		$callNext.click(function(){
			$sections.hide();
			if(counter < usersArray.length-1)
			{
				counter = counter + 1;
				arrayStack.push($call);
				receiver = usersArray[counter];
				$call.fadeIn("fast");
				//call(receiver); codigo de la llamada que recibe al receptor de la misma
			} else {
				arrayStack = [];
				$sections.hide();
				$main.fadeIn("fast");
			}
		});
		
		$hangUp.click(function(){
			//callEnd(); codigo de terminar llamada
			/*CODIGO DE MODAL WINDOW QUE PREGUNTE A USUARIO SI QUIERE ENVIAR COORDENADAS!
			Si contestacion es si, se envian, si no, no hace nada*/
			//codigo phonegap de buscar geolocation del user
			//codigo para enviar ese geolocation
			arrayStack = [];
			$sections.hide();
			$main.fadeIn("fast");
		});
		
		$previous.click(function(){
		$sections.hide();
		arrayStack.pop(arrayStack.length-1).fadeIn("fast");
		});

	}
};

emergencyApp.init();