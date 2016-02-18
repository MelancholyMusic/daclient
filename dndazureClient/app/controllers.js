'use strict';

app.controller('ChatController', ['$scope', function($scope, ChatHubProxy)
	{
	    var displayName = prompt('Enter your name:', '');
		console.log('Attempting to connect backendServerUrl=dndazureapi.azurewebsites.net hubName=ChatHub');
		var connection = $.hubConnection('http://dndazureapi.azurewebsites.net/');
		var chatHubProxy = connection.createHubProxy('ChatHub');

		chatHubProxy.on('addNewMessageToPage', function(name, message)
		{
			console.log('addNewMessageToPage: name=' + name + ' message=' + message);
			var encodedName = $('<div />').text(name).html();
			var encodedMsg = $('<div />').text(message).html();
			$('#discussion').append('<li><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
		});

		connection.start()
			.done(function() { console.log('Now connected, connection ID=' + connection.id); })
			.fail(function() { console.log('Could not connect!'); });

		$('#sendmessage').click(function()
		{
			console.log('Calling Send on chatHub name=' + displayName + ' message=' + $('#message').val());
			chatHubProxy.invoke('Send', displayName, $('#message').val())
				.done(function() { console.log('Invocation of Send succeeded'); })
				.fail(function(error) { console.log('Invocation of Send failed. ' + error) });

			$('#message').val('').focus();
		});
	}
]);
