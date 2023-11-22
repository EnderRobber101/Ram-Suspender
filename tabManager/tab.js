


document.addEventListener("DOMContentLoaded", function () 
{
    function refreshContent() 
    {
        var tabsContainer = document.getElementById("tabsContainer");
        // Clear the existing content
        tabsContainer.innerHTML = "";

        //Add table
        var table = document.createElement("table");
        table.id = "taskTable";
        tabsContainer.appendChild(table);
        //Table description
        let descriptionRow = document.createElement("tr");
        descriptionRow.className = "description";
        //taskDis
        let taskDis = document.createElement("th");
        taskDis.className = "taskDis";
        taskDis.textContent = "Tab Name";
        descriptionRow.append(taskDis);
        //RamDis
        let ramDis = document.createElement("th");
        ramDis.className = "ramDis";
        ramDis.textContent = "Mem Usage";
        descriptionRow.append(ramDis);
        
        
        chrome.tabs.query({}, function(tabs) {
            //* Loop through the array and create a flex column for each item
            for(let i = 0; i < tabs.length; i++)
            {
                let tab = tabs[i];
                /*
                //Add processes to permission in manifest.json
                // Get process ID for each tab
                chrome.processes.getProcessIdForTab(tab.id, function(processId) {
                    // Get process info for the process ID
                    chrome.processes.getProcessInfo(processId, false, function(processes) {
                        var process = processes[processId];
                        */
                        //*HTMl Adding
                        
                        //Row group
                        let row = document.createElement("tr");
                        row.className = "row";
                        
                        
                        //Task name
                        let taskName = document.createElement("th");
                        taskName.className = "taskName";
                        taskName.textContent = tab.title;
                        row.append(taskName);
                        
                        //Ram usage
                        let ramUsage = document.createElement("th");
                        ramUsage.className = "ramUsage";
                        //tmp
                        ramUsage.textContent = "N/A For Now";
                        /*
                        //If applicable
                        if (process) {
                            ramUsage.textContent = process.privateMemory;
                        } 
                        else { ramUsage.textContent = "N/A"; }
                        */
                        row.append(ramUsage);
                        
                        //Snooze button
                        let closeButtonWindow = document.createElement("th");
                        let closeButton = document.createElement("button");
                        closeButton.className = "snoozeButton";
                        closeButton.id = "snoozeButton" + i;
                        closeButton.textContent = "Close";
                        //Add script to button
                        closeButton.addEventListener("click", function() {
                            // Your script logic here
                            console.log("Snooze Button clicked!");
                            chrome.tabs.discard(tab.id);
                            document.getElementById("snoozeButton" + i).style.backgroundColor = green;
                        });
                        
                        closeButtonWindow.append(closeButton);
                        row.append(closeButtonWindow);
                        
                        
                        
                        
                        table.appendChild(row);
                        /*
                    });
                });
                */
            }
        });
    }
    
    function listTabs() {
    // Query all tabs
            chrome.tabs.query({}, function(tabs) {
            // Iterate through the tabs array
            tabs.forEach(function(tab) {
            // Log the tab ID and title (or any other tab properties you need)
            console.log('Tab ID:', tab.id, 'Title:', tab.title);
            });
        });
    }
    function listTabsAndMemoryUsage() {
        // Query all tabs
        chrome.tabs.query({}, function(tabs) {
            // Iterate through the tabs array using a for loop
            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs[i];
                // Get process ID for each tab
                chrome.processes.getProcessIdForTab(tab.id, function(processId) {
                    // Get process info for the process ID
                    chrome.processes.getProcessInfo(processId, false, function(processes) {
                        var process = processes[processId];
                        // Check if process information is available
                        if (process) { console.log('Tab ID:', tab.id, 'Title:', tab.title, 'Memory Usage:', process.privateMemory); } 
                        else { console.log('Tab ID:', tab.id, 'Title:', tab.title, 'Memory Usage: Information not available'); }
                    });
                });
            }
        });
    }    
            
    
    
    
    
    // Initial content setup
    refreshContent();

    // Button click event to refresh content
    console.log("Attaching event listener to:", refreshButton);
    var refreshButton = document.getElementById("refreshButton");
    refreshButton.addEventListener("click", function () {
        refreshContent();
        //listTabsAndMemoryUsage();
    });
});
