'use strict';

app.controller('ChatController', ['$scope', function($scope, ChatHubProxy)
	{
		console.log('Attempting to connect backendServerUrl=dndazureapi.azurewebsites.net hubName=ChatHub');
		var connection = $.hubConnection('http://dndazureapi.azurewebsites.net/');
		var chatHubProxy = connection.createHubProxy('ChatHub');
		var displayName = 'temp';
		
		chatHubProxy.on('addNewMessageToPage', function(name, message)
		{
			console.log('addNewMessageToPage: name=' + name + ' message=' + message);
			var date = new Date();
			var hours = date.getHours();
			var ampm = 'AM'
			if(hours > 12)
			{
				ampm = 'PM';
				hours -= 12;
			}

			$('#discussion').append('<div class="comment"><div class="content"><a class="author">' + name + '</a><div class="metadata"><span class="date">' + hours + ':' + date.getMinutes() + ampm + '</span></div><div class="text">' + message + '</div></div></div>');
		});

		connection.start()
			.done(function() { console.log('Now connected, connection ID=' + connection.id); })
			.fail(function() { console.log('Could not connect!'); });

		$('#sendmessage').click(function()
		{
			console.log('Calling Send on chatHub name=' + $('#displayname').val() + ' message=' + $('#message').val());
			chatHubProxy.invoke('Send', $('#displayname').val(), $('#message').val())
				.done(function() { console.log('Invocation of Send succeeded'); })
				.fail(function(error) { console.log('Invocation of Send failed. ' + error) });

			$('#message').val('').focus();
		});
	}
]);
