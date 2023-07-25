

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  let ampm = '';

  // Convert hours to 12-hour format and determine AM or PM
  if (hours >= 12) {
    ampm = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  } else {
    ampm = 'AM';
    if (hours === 0) {
      hours = 12;
    }
  }

  const timeString = `${hours.toString().padStart(2,'0')}:${minutes}:${seconds} ${ampm}`;
  clockDisplay.textContent = timeString;

  const alarmRows = document.querySelectorAll('.alarm-row');
  alarmRows.forEach((row) => {
    const toggleSwitch = row.querySelector('.toggle-switch input');
    if (row.textContent.trim() === timeString && toggleSwitch.checked) {
      alert('Alarm time matches the current time!');
    }
  });
}

setInterval(updateTime, 1000);


function stopAlarmSound() {
  const alarmSound = document.getElementById('alarmSound');
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSound.loop = false; // Disable the loop
  alarmActive = false;
}


//Function to create alarm row
function createAlarmRow(hour, minute, seconds, ampm) {
  const alarmRow = document.createElement('div');
  alarmRow.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

  const deleteButton = document.createElement('a'); 
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa', 'fa-trash'); // Font Awesome icon
  deleteButton.appendChild(deleteIcon);
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function () {
    alarmRow.remove();
  });

  const horizontalRow = document.createElement('hr');

  // Create the label element for the user switch
  // Create the label element
  const labelElement = document.createElement("label");
  labelElement.classList.add("toggle-switch");

  // Create the input element with type="checkbox"
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";

  // Create the span element with class="slider"
  const spanElement = document.createElement("span");
  spanElement.classList.add("slider");

  // Append the input and span elements inside the label element
  labelElement.appendChild(inputElement);
  labelElement.appendChild(spanElement);



  // Append the label (user switch) instead of the "Enable" button
  alarmRow.appendChild(deleteButton);
  alarmRow.appendChild(labelElement);
  alarmRow.appendChild(horizontalRow);

  alarmRow.classList.add('alarm-row');
  return alarmRow;
}




// Function to set the alarm
function setAlarm() {
  const hourInput = document.getElementById('hourInput');
  const minuteInput = document.getElementById('minuteInput');
  const secondsInput = document.getElementById('secondsInput');
  const ampmInput = document.getElementById('ampmInput');
  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const seconds = parseInt(secondsInput.value);
  const ampm = ampmInput.value;

  // Validation to ensure the inputs are valid
  if (isNaN(hour) || hour < 0 || hour > 23 || isNaN(minute) || minute < 0 || minute > 59 || isNaN(seconds)||seconds < 0 || seconds > 59) {
    alert('Invalid time input. Please enter valid hours (0-23), minutes (0-59) and seconds(0-59).');
    return;
  }

  // Create a new row for the selected time and append it below the "Set Alarm" button
  const alarmRow = createAlarmRow(hour, minute, seconds, ampm);
  const setButtonDiv = document.querySelector('.setButton');
  setButtonDiv.insertAdjacentElement('afterend', alarmRow);
}

// Event listener for the "Set Alarm" button
const setAlarmButton = document.getElementById('set');
setAlarmButton.addEventListener('click', setAlarm);


