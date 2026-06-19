import { state, saveStateToStorage } from './state.js';

/**
 * Packs up current application records and settings, exporting them as a JSON file.
 */
export function exportDataAsJSON() {
    if (state.expenses.length === 0) {
        alert("There are no expense records to export yet!");
        return;
    }

    const backupPackage = {
        expenses: state.expenses,
        settings: state.settings
    };

    const jsonString = JSON.stringify(backupPackage, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const downloadUrl = URL.createObjectURL(blob);
    
    const hiddenAnchor = document.createElement("a");
    hiddenAnchor.href = downloadUrl;
    hiddenAnchor.download = `expense_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(hiddenAnchor);
    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);
    URL.revokeObjectURL(downloadUrl);
}

/**
 * Reads an uploaded file, parses the JSON structure, and updates the application state.
 */
export function importDataFromJSON(fileEvent, onSuccessCallback) {
    const uploadedFile = fileEvent.target.files[0];
    if (!uploadedFile) return;

    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        try {
            const parsedData = JSON.parse(event.target.result);

            if (!parsedData.expenses || !Array.isArray(parsedData.expenses)) {
                throw new Error("Invalid structure: missing expenses array.");
            }

            // Restore records back to global application state
            state.expenses = parsedData.expenses;
            if (parsedData.settings) {
                state.settings = { ...state.settings, ...parsedData.settings };
            }

            saveStateToStorage();
            alert(`Success! Standardized data packet recovered. ${parsedData.expenses.length} records updated.`);
            
            if (typeof onSuccessCallback === "function") {
                onSuccessCallback();
            }
        } catch (error) {
            alert("Failed to parse file. Please verify it is a valid JSON backup file.");
            console.error(error);
        }
    };

    fileReader.readAsText(uploadedFile);
}