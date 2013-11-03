var chat = {
	start: function() {
		var chatRef = window.open('http://websocketchat-c9-erreh.c9.io/androidChat', '_blank', 'location=yes');
		chatRef.executeSript({code: "phoneNumber = $phoneNumber.val(); ref = chatRef;"});
		chatRef.show();
	}
};