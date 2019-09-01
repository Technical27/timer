let time = moment();
let startTime, remindTime, endTime;
let timeLeft = 90 * 60;
let stopped = true;
const sound = new Audio('alarm.mp3');

const updateTime = () => {
  time = moment();
  $('#ctime').html(time.format('h:mm:ss'));
  if (stopped) return;
  const diff = endTime.diff(time, 'seconds')
  if (diff < 1) {
    stopped = true;
    return sound.play();
  }
  $('#time').html(diff);
  if (remindTime) {
    const rdiff = remindTime.diff(time, 'seconds');
    if (rdiff < 1) {
      startTime = moment();
      remindTime = undefined;
      sound.play();
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
    }
    else {
      $('#start').html('stop');
      time = moment();
      endTime = time.clone().add(timeLeft, 'seconds');
    }
  });
  $('#rconfirm').click(() => {
    const rvalue = parseInt($('#rvalue').val());
    if (isNaN(rvalue)) return;
    remindTime = startTime.clone().add(rvalue, 'minutes');
  });
});
