var Timer = require('../lib/timer');

test('Timer exists', function(){
	expect(typeof new Timer()).toBe('object');
});

test('Timer.msToHuman should convert milliseconds to human time object', function(){
	var result = Timer.msToHuman(5000);
	expect(result.hours).toBe(0);
	expect(result.minutes).toBe(0);
	expect(result.seconds).toBe(5);

	var result = Timer.msToHuman(5425000);
	expect(result.hours).toBe(1);
	expect(result.minutes).toBe(30);
	expect(result.seconds).toBe(25);
});

test('Timer.humanFormat should return h:m:s format string', function(){
	 // 01:30:25 => 3600000 + 1800000 + 25000
	expect(Timer.humanFormat(5425000)).toBe('01:30:25');
	expect(Timer.humanFormat(5000)).toBe('00:00:05');
});

test('Timer.startPomodoro(period) should start counting down from "period"', function(){
	var t = new Timer(5425000);
	var start_id = t.startPomodoro();
	expect(start_id).toBeGreaterThan(0);
});

test('Timer.isWorkingTimeDone(end_at) should return whatever working time is finished' , function(){
	expect(Timer.isWorkingTimeDone(Date.now() + 5000)).toBe(false);
	expect(Timer.isWorkingTimeDone(Date.now() - 5000)).toBe(true);
});
