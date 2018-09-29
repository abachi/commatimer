#!/usr/bin/env node

var commatimer = require('commander'),
	Timer = require('./lib/timer'),
	chalk = require('chalk'),
	clear = require('clear'),
	figlet = require('figlet');

commatimer.version('0.1.0', '-v', '--version');

commatimer.command('focus [working] [resting]')
	.description('start counting down')
	.option('-w', '--working', 'working time in minutes, 25 minutes by defaults')
	.option('-r', '--resting', 'resting time in minutes, 5 minutes by defaults')
	.action(function(working, resting){
		var start_at = Date.now();
		var pomodoro = working * 60 * 1000;
		var resting = resting * 60 * 1000;
		var end_at = start_at + pomodoro;
		var timer = new Timer(pomodoro, resting);
		timer.startPomodoro();
	});

commatimer.parse(process.argv);
