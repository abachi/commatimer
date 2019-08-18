#!/usr/bin/env node

var commatimer = require('commander'),
	Timer = require('./lib/timer');

commatimer.version('0.1.0', '-v', '--version');

commatimer.command('focus [working] [resting] [pomodoros]')
	.description('start counting down')
	.option('-w', '--working', 'working time in minutes, 25 minutes by defaults')
	.option('-r', '--resting', 'resting time in minutes, 5 minutes by defaults')
	.option('-p', '--pomodoros', 'continue looping the focusing and resting process -p times')
	.action(function(working, resting, pomodoros){

		var focusing = working * 60 * 1000;
		var resting = resting * 60 * 1000;
		var timer = new Timer(focusing, resting, pomodoros);
		timer.startPomodoro();
		
	});

commatimer.parse(process.argv);
