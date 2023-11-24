// background.js

function setAlarm(interval) {
    chrome.alarms.create('myAlarm', { periodInMinutes: parseInt(interval) });
}
  
// Set default alarm
setAlarm(1);
  
// Listen for changes in storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        if (key === 'checkingInterval') {
            var newInterval = changes[key].newValue;
            setAlarm(newInterval);
        }
    }
});

// Add a listener for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "myAlarm") {
        // Retrieve the state of the checkbox
        chrome.storage.local.get("discardCheckbox", function(data) {
            if (data.discardCheckbox) { // Check if the checkbox is checked
                console.log("Alarm triggered and checkbox is checked");
                chrome.tabs.query({
                    discarded: false, // Non-discarded tabs
                    active: false     // Not the one showing/focused on
                }, function(tabs) {
                    for(let i = 0; i < tabs.length; i++) {
                        chrome.tabs.discard(tabs[i].id);
                    }
                });
            } else {
                console.log("Alarm triggered but checkbox is not checked");
            }
        });
    }
});
