
export function formatNotesArray(notes) {
    notes.sort(function(a, b) {
        return a.col - b.col;
    })
    console.log(notes);
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notes)
    }    
    console.log(reqOptions.body);
    fetch('/predict', reqOptions)
    .then(response => response.json()) // returns a promise
    .then(result => {
        console.log(result);
    })
    
}
