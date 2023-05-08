let stimulusTimeout;
let intervalId;
let startTime;
let reactionTime;
let reactionTimes = [];
let stimulusShown = false;
let testStarted = false;
let csvData = "";
const stimulus = document.getElementById('stimulus');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    start_stimulus();
    setTimeout(stop_stimulus, 30000);//time limit set to 30 seconds
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
function stop_stimulus() {
    clearTimeout(stimulusTimeout);
    clearInterval(intervalId);
    startButton.style.display = 'block';
    stimulusShown = false;
    testStarted = false;
    //user?
    //reaction times
    csvData += reactionTimes.map(time => time.toString()).join(' ') + ',';
    reactionTimes = [];
    //farts and other stuff
    csvData += '\n';
}
document.addEventListener('click', function () {
    if (testStarted) {
        if (stimulusShown) {
            // clearTimeout(stimulusTimeout);
            clearInterval(intervalId);
            reactionTime = Date.now() - startTime;
            reactionTimes.push(reactionTime);
            //alert(`Your reaction time was ${reactionTime} ms.`);
            stimulusShown = false;
            stimulus.innerHTML = reactionTime; // Clear the stimulus display
            start_stimulus();
        }
    }
});
function downloadCSV() {
    const encodedData = encodeURIComponent(csvData);
    const dataURI = 'data:text/csv;charset=utf-8,' + encodedData;
    const link = document.createElement('a');
    link.setAttribute('href', dataURI);
    link.setAttribute('download', 'reaction_times.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}