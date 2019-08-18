var chalk = require('chalk'),
	figlet = require('figlet')
	clear = require('clear');

class Timer{
	constructor(working, resting, pomodoros){
		this._working = working || 25 * 60 * 1000;
		this._resting = resting ||  5 * 60 * 1000;
		this._pomodoros = pomodoros || 1;
		this._currentPomodoro = 1;
		this.origin = {
			working: this._working,
			resting: this._resting
		};
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
		var humanTime = Timer.msToHuman(ms);
		for(var key in humanTime){
			if(humanTime[key] < 10){
				humanTime[key] = '0'+humanTime[key];
			}
		}
		return humanTime.hours + ':' + humanTime.minutes + ':' + humanTime.seconds; 
	}

	static isWorkingTimeDone(end_at){
		return Date.now() > end_at;
	}

	cleanScreen(){
		clear();
		console.log(chalk.white.bgGreen.bold("\n=============== Resting Time! ==============="));
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
	}

	startResting(working_id){		
		var self = this,
			resting_start_at = Date.now(),
			resting_end_at = resting_start_at + self._resting;
		var resting_id = setInterval(function(){
			self.cleanScreen();
			self._resting -= 1000;
			process.stdout.write(chalk.green(figlet.textSync(Timer.humanFormat(self._resting))));
			if(Date.now() > resting_end_at){
				clearInterval(working_id);
				clearInterval(resting_id);
				if(self._currentPomodoro > self._pomodoros){
					console.log(chalk.bgGreen.bold("\n============ Every thing is done ============"));
				}else{
					self._working = self.origin.working;
					self._resting = self.origin.resting;
					self.startPomodoro();
				}
			}
		}, 1000);
	}
	
	startPomodoro(){
		var self = this,
			work_start_at = Date.now(),
			work_end_at = work_start_at + self._working;

		var working_id = setInterval(function(){
			clear();
			console.log(chalk.white.bgRed.bold("\n=============== Time To Focus " + self._currentPomodoro + "/" + self._pomodoros + " ==============="));
			self._working -= 1000;
			process.stdout.write(chalk.white(figlet.textSync(Timer.humanFormat(self._working))));
			if(Timer.isWorkingTimeDone(work_end_at)){
				self._currentPomodoro += 1;
				clearInterval(working_id);
				self.startResting(working_id);
			}

		}, 1000);
	}
}

module.exports = Timer;