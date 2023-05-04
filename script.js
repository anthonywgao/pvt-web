let stimulusTimeout;
let intervalId;
let startTime;
let reactionTime;
let stimulusShown = false;
let testStarted = false;
const stimulus = document.getElementById('stimulus');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    start_stimulus();
});
function start_stimulus() {
    stimulusShown = false;
    setTimeout(function () {
        stimulus.innerHTML = '0';
        stimulus.style.display = 'none';
    }, 1000);
    const delay = Math.floor(Math.random() * 8000) + 2000; // Generate a random delay between 2 and 10 seconds in milliseconds
    stimulusTimeout = setTimeout(function () {
        testStarted = true;
        stimulusShown = true;
        stimulus.style.display = 'block';
        startTime = Date.now();
        intervalId = setInterval(function () {
            const elapsedTime = Date.now() - startTime;
            stimulus.innerHTML = elapsedTime;
        }, 1); // Update the elapsed time every 1 millisecond
    }, delay);
}
document.addEventListener('click', function () {
    if (testStarted) {
        if (stimulusShown) {
            // clearTimeout(stimulusTimeout);
            clearInterval(intervalId);
            reactionTime = Date.now() - startTime;
            //alert(`Your reaction time was ${reactionTime} ms.`);
            stimulusShown = false;
            stimulus.innerHTML = reactionTime; // Clear the stimulus display
            start_stimulus();
        }
    }
});