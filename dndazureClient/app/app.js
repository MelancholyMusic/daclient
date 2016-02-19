'use strict';

var app = angular.module('chatModule', []);
app.value('backendServerUrl', 'http://localhost:54008/');

$(document)
	.ready(function() {

	// fix main menu to page on passing
	$('.main.menu').visibility({
		type: 'fixed'
	});
	$('.overlay').visibility({
		type: 'fixed',
		offset: 80
	});

	// show dropdown on hover
	$('.main.menu  .ui.dropdown').dropdown({
		on: 'hover'
	});
	})
;
