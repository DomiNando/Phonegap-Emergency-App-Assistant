var emergencyApp = {

	init: function () {

		if (isConfigured) {  //el usuario entro un numero de telefono y acepto los terminos de servicio
			emergencyApp.createEvents();  //la aplicacion espera porque los botones se aprieten
			$login.hide();  //esconde la pagina de login
			$main.fadeIn("fast", emergencyApp.mainPage());  //la pagina de los botones call aparece

		} else {
			$registrationPage.hide();
			$login.show();
			
			$registerButton.click(function () {
				$sections.hide();
				$registrationPage.fadeIn("fast");
				emergencyApp.registrationPage();
			});
			
			$done.click(function () {
				var $termsAccepted = $("#termsAccepted").is(":checked");
				console.log($termsAccepted);
				
				if ($termsAccepted && $phoneNumber.val().length == 10 && $userPassword.val() == $password.val() ) {
					var numero = parseInt($phoneNumber.val(), 10);
					var numNoDecimal= parseInt(numero); //si termsAccepted esta marcado, el largo del numero de telefono es 10, y el password de usuario es igual al password guardado...
					if (!isNaN(numero) && numero === numNoDecimal && numero > 0){  //esto se cumple solo si el numero de telefono es un numero y no es decimal y es positivo
				//if ($termsAccepted) {
						isConfigured = true;
				//salvar numero en memoria interna!!!
						console.log($termsAccepted);
						emergencyApp.init();  //recursion para comenzar Configurado
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
	
	registrationPage: function() {
		$register.click(function () {
		if ( $userName.val() !== null || $password.val() !== null || $confirmPassword.val() !== null || $name.val() !== null) {
			if( $password.val() == $confirmPassword.val()) {
			//Los valores de los fields del usuario se pueden sacar de estas variables JQuery hacia el DB?
			//Si no, entonces se pueden salvar como variables globales y se exportan al DB
			$sections.hide();
			$login.show();
			}
		}
		});
	},
	
	chatTime: function(category) {

		// navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
		// var onSuccess = function(position) {
		},

	createEvents: function () {
	
		$registerButton.click(function () {
			$sections.hide();
			$registrationPage.fadeIn("fast");
		});

		$back.click(function () {
			$sections.hide();
			arrayStack.pop(arrayStack.length-1).fadeIn("fast");
		});

		$police.click(function() {
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
			//call(usersArray[counter]);
		});

		$firefighters.click(function(){
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
			//call(usersArray[counter]);
		});

		$ambulance.click(function(){
			$sections.hide();
			//mecanismo de fila
			$call.fadeIn("fast");
			arrayStack.push($main);
			//call(usersArray[counter]);
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
			emergencyApp.chatTime("police");
			$chat.fadeIn("fast");
		});
		
		$chatFirefighters.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			emergencyApp.chatTime("firefighters");
			$chat.fadeIn("fast");
		});
		
		$chatAmbulance.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			emergencyApp.chatTime("ambulance");
			$chat.fadeIn("fast");
		});
		
		$startChat.click(function(){
			$sections.hide();
			$chatPage.fadeIn("fast");
			//chat(usersArray[counter]);
			chat.start();
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
				counter = 0;
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
				counter = 0;
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
			var r=confirm("Would you like to send your GPS Coordinates to the emergency response service?");
			if (r==true) {
				//codigo para enviar GPS coordinates a servicio
				$sections.hide();
				$main.fadeIn("fast");
			} else {
				$sections.hide();
				$main.fadeIn("fast");
			}
		});
		
		$previous.click(function(){
		$sections.hide();
		arrayStack.pop(arrayStack.length-1).fadeIn("fast");
		});
		

	}
};