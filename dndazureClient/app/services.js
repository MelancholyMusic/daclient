'use strict';

app.factory('chatHubProxy', ['$rootScope', 'backendServerUrl',
	function($rootScope, backendServerUrl)
	{
		console.log('Attempting to connect backendServerUrl=' + backendServerUrl + ' hubName=ChatHub');
		var connection = $.hubConnection(backendServerUrl);
		var proxy = connection.createHubProxy('ChatHub');

		connection.start()
			.done(function(){ console.log('Now connected, connection ID=' + connection.id); })
			.fail(function(){ console.log('Could not connect!'); });

		return proxy;
	}
]);