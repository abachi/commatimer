var chalk = require('chalk'),
	figlet = require('figlet')
	clear = require('clear');

class Timer{
	constructor(working, resting){
		this._working = working || 25 * 60 * 1000;
		this._resting = resting ||  5 * 60 * 1000;
	}

	static msToHuman(ms){
		var hours, minutes, seconds;
		seconds = Math.floor(ms / 1000);
		minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
		hours = Math.floor(minutes / 60) % 24;
		minutes = minutes % 60;
		return {hours: hours, minutes: minutes, seconds: seconds};
	}

	static humanFormat(ms){
		var hf = Timer.msToHuman(ms);
		if(hf.hours<10)
			hf.hours = '0'+hf.hours;
		if(hf.minutes<10)
			hf.minutes = '0'+hf.minutes;
		if(hf.seconds<10)
			hf.seconds = '0'+hf.seconds;
		return hf.hours + ':' + hf.minutes + ':' + hf.seconds; 
	}

	startPomodoro(){
		var self = this;
		var start_at = Date.now();
		var end_at = start_at + self._working;
		var working = self._working;
		var resting = self._resting;
		var working_id = setInterval(function(){
			clear();
			console.log(chalk.blue.bgRed("\n=============== Working Time! ==============="));
			self._working -= 1000;
			process.stdout.write(chalk.blue(figlet.textSync(Timer.humanFormat(self._working))));
			if(Date.now() > end_at){
				var resting_start_at = Date.now();
				var resting_end_at = resting_start_at + self._resting; // ms
				var resting_id = setInterval(function(){
					clear();
					console.log(chalk.green.bgRed("\n=============== Resting Time! ==============="));
					process.stdout.clearLine();
					process.stdout.cursorTo(0);
					self._resting -= 1000;
					process.stdout.write(chalk.green(figlet.textSync(Timer.humanFormat(self._resting))));
					if(Date.now() > resting_end_at){
						console.log(chalk.bgGreen.bold("\n============ Every thing is done ============"));
						clearInterval(resting_id);
					}
				}, 1000);

				clearInterval(working_id); 
			}

		}, 1000);
		return working_id;
	}
}

module.exports = Timer;