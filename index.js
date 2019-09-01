let currentTime = moment();
let startTime, remindTime, endTime
let rtimeLeft = 0;
let timeLeft = 60 * 90;
let stopped = true;
let reminderActive = false;
const sound = new Audio('alarm.mp3');

const formatTime = time => {
  const t = moment.duration(time);
  if (t.asSeconds() < 60) return `${Math.floor(t.asSeconds())} seconds`;
  return `${Math.round(t.asMinutes())} minutes`;
}

const updateTime = () => {
  currentTime = moment();
  if (sound.ended) $('#sstop').hide();
  $('#ctime').html(currentTime.format('h:mm:ss'));
  if (stopped) return;
  $('#time').html(formatTime(endTime.diff(currentTime)));
  if (endTime.diff(currentTime, 'seconds') < 1) {
    stopped = true;
    $('#sstop').show();
    return sound.play();
  }
  if (remindTime) {
    $('#rtime').html(formatTime(remindTime.diff(currentTime)));
    if (remindTime.diff(currentTime, 'seconds') < 1 && reminderActive) {
      startTime = moment();
      remindTime = undefined;
      reminderActive = false;
      $('#sstop').show();
      return sound.play(); 
    } 
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
      timeLeft = endTime.diff(currentTime, 'seconds');
      if (reminderActive) rtimeLeft = remindTime.diff(currentTime, 'seconds');
    }
    else {
      $('#start').html('stop');
      currentTime = moment();
      endTime = currentTime.clone().add(timeLeft, 'seconds');
      if (reminderActive && rtimeLeft) remindTime = currentTime.clone().add(rtimeLeft, 'seconds');
    }
  });
  $('#rconfirm').click(() => { 
    const rvalue = parseInt($('#rvalue').val());
    if (isNaN(rvalue)) return;
    remindTime = startTime.clone().add(rvalue, 'minutes');
    reminderActive = true;
  });
  $('#sstop').click(() => {
    sound.pause();
    $('#sstop').hide();
    sound.currentTime = 0;
  });
});
