
export function sendNotesArray(notes, onDataRead) {
    notes.sort(function(a, b) {
        return a.col - b.col;
    })
    console.log(notes); 
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(notes)
    }    
    console.log(reqOptions.body);
    fetch('/api', reqOptions)
    .then(response => response.json()) // returns a promise
    .then(result => {
        console.log(result);
        onDataRead(result);
    })
    
}
