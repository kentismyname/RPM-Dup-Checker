const SHEET_ID = '1AnoW2TgE_17zJLG_i-vBLwgMtBlq6BANR1UxxHNZm1M'; // Replace with your Google Sheet ID
const API_KEY = 'AIzaSyD5la1glnTC47uj40mGupnVn-iKRIBAJ-g'; // Replace with your Google Sheets API key
const RANGE = 'Sheet1!A:Z'; // Adjust the range as needed

function checkForDuplicates() {
    const query = document.getElementById('searchBar').value.trim();
    const resultsDiv = document.getElementById('results');

    if (query === '') {
        resultsDiv.innerHTML = '';
        return;
    }

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const values = data.values || [];
            const results = [];

            values.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    // Check for an exact match
                    if (cell.toString().toLowerCase() === query.toLowerCase()) {
                        results.push(`Row: ${rowIndex + 1}, Column: ${colIndex + 1}, Value: ${cell}`);
                    }
                });
            });

            displayResults(results);
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = 'Error retrieving data.';
            resultsDiv.className = 'error';
        });
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');

    if (results.length > 0) {
        resultsDiv.innerHTML = 'DUPLICATE!';
        resultsDiv.className = 'duplicate';
    } else {
        resultsDiv.innerHTML = 'GOOD';
        resultsDiv.className = 'good';
    }
}
