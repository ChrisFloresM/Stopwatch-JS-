let timeElapsedMilis = 0;
let timerStarted = false;
let milisCounter = null;
let start = null;

const timerElement = document.querySelector('#timer');

initializeEventListeners();

/**
 * Sets the corresponding event listener to each functionality button
 * @function initializeEventListeners
 */
function initializeEventListeners() {
    document.querySelector("#start").addEventListener('click', startTimer);
    document.querySelector("#stop").addEventListener('click', stopTimer);
    document.querySelector("#reset").addEventListener('click', resetTimer);
    document.querySelector("#lap").addEventListener('click', countLap);
}

/* Function callbacks for event listeners */

/**
 * Callback for the "start" button.
 * Initializes the timer if, has not already started.
 * Set up the initial time, specially when the timer has been stopped, but not restarted.
 * @function startTimer
 */
function startTimer() {
    if (!timerStarted) {
        timerStarted = true;
        start = Date.now() - timeElapsedMilis;
        countMilis();
    }
}

/**
 * Callback for the "stop" button.
 * Calls the re-usable support function to stops the timer.
 * @function stopTimer
 */
function stopTimer() {
    clearTimer();
}

/**
 * Callback for the "reset" button.
 * Set the total elapsed time back to 0 and calls the re-usable support function to clear the timer.
 * Calls the re-usable function to update the display timer element.
 * @function stopTimer
 */
function resetTimer() {
    timeElapsedMilis = 0;
    clearTimer();
    updateTimer(timerElement);
    document.querySelector("#laps").innerHTML = "";
}

/**
 * Callback for the "lap" button.
 * Get the current timestamp and display it as a new li element
 * @function countLap
 */
function countLap() {
    const lapList = document.querySelector("#laps");
    let liElement = document.createElement("li");
    updateTimer(liElement);
    lapList.appendChild(liElement);
}

/* Support functions */

/**
 * Main timer function using a time interval, calculating the Date.now() miliseconds on each cycle.
 * Calls the re-usable function to update the display timer element.
 * @function countMilis
 */
function countMilis() {
    milisCounter = setInterval(() => {
        timeElapsedMilis = (Date.now() - start);
        updateTimer(timerElement);
    }, 10);
}

/**
 * If the timer is running, clears the interval and set the flag to false
 * @function clearTimer
 */
function clearTimer() {
    if (timerStarted) {
        clearInterval(milisCounter);
        timerStarted = false;
    }
}

/**
 * Sets the content of the Display timer element to the actual timer values
 * @param {HTMLElement} element - Element where the timer value will be displayed
 * @function clearTimer
 */
function updateTimer(element) {
    element.textContent = getFormattedTime();
}

/**
 * Calculates the actual timer values and returns those values on the right format to be displayed
 * @returns {String} returns the formatted string with the timer values as mm:ss:cscs
 * @function getFormattedTime
 */
function getFormattedTime() {
    const minutes = String(Math.floor(timeElapsedMilis / 60000)).padStart(2, "0");
    const seconds = String(Math.floor(timeElapsedMilis / 1000) % 60).padStart(2, "0");
    const centiSeconds = String(Math.floor(timeElapsedMilis / 10) % 100).padStart(2, '0');

    return `${minutes}:${seconds}:${centiSeconds}`;
}
