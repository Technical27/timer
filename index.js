let time = moment();
let startTime, remindTime, endTime
let rtimeLeft = 0;
let timeLeft = 90 * 60;
let stopped = true;
let reminderActive = false;
const sound = new Audio('alarm.mp3');

const updateTime = () => {
  time = moment();
  $('#ctime').html(time.format('h:mm:ss'));
  if (stopped) return;
  if (endTime.diff(time, 'seconds') < 1) {
    stopped = true;
    return sound.play();
  }
  $('#time').html(endTime.diff(time, 'minutes'));
  if (remindTime) {
    if (remindTime.diff(time, 'seconds') < 1 && reminderActive) {
      startTime = moment();
      remindTime = undefined;
      reminderActive = false;
      return sound.play();
    }
    $('#rtime').html(remindTime.diff(time, 'minutes'));
  }
};

$(document).ready(() => {
  startTime = moment();
  updateTime();
  setInterval(updateTime, 1000);
  $('#start').click(() => {
    stopped = !stopped;
    if (stopped) {
      $('#start').html('start');
      timeLeft = endTime.diff(time, 'seconds');
      if (reminderActive) rtimeLeft = remindTime.diff(time, 'seconds');
    }
    else {
      $('#start').html('stop');
      time = moment();
      endTime = time.clone().add(timeLeft, 'seconds');
      if (reminderActive && rtimeLeft) remindTime = time.clone().add(rtimeLeft, 'seconds');
    }
  });
  $('#rconfirm').click(() => { 
    const rvalue = parseInt($('#rvalue').val());
    if (isNaN(rvalue)) return;
    remindTime = startTime.clone().add(rvalue, 'minutes');
    reminderActive = true;
  });
});
