let time = moment();
let startTime, endTime, remindTime;
const sound = new Audio('alarm.mp3');

const updateTime = () => {
  time = moment();
  $('#ctime').html(time.format('h:m:s'));
;}

$(document).ready(() => {
  updateTime();
  setInterval(updateTime, 1000);
  $('#start').one('click', () => {
    endTime = time.add(90, 'minutes');
    startTime = moment();
    setInterval(() => {
      $('#time').html(endTime.diff(time, 'minutes'));
      if (remindTime) {
        const diff = remindTime.diff(time, 'seconds');
        if (diff < 1) {
          startTime = moment();
          remindTime = undefined;
          sound.play();
        }
        $('#rtime').html(remindTime.diff(time, 'minutes'));
      }
    }, 1000);
  });
  $('#rconfirm').click(() => {
    const rvalue = parseInt($('#rvalue').val());
    if (isNaN(rvalue)) return;
    remindTime = startTime.clone().add(rvalue, 'minutes');
  });
});
