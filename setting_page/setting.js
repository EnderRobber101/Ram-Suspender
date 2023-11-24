// settings.js

document.getElementById("save").addEventListener("click", function() {
  var interval = document.getElementById("interval").value;
  chrome.storage.local.set({ "checkingInterval": interval }, function() {
    console.log("Interval is set to " + interval);
  });
});

document.getElementById("discardCheckbox").addEventListener("change", function() {
  chrome.storage.local.set({ "discardCheckbox": this.checked });
});