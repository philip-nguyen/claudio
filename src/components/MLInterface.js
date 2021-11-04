let {spawn} = require('child_process');

export function formatNotesArray(notes) {
    for(let i = 0; i < notes.length; i++) {
        console.log(i, notes[i]);
    }
    
}

/*

export function runMl(notes) {
    let options = {
        mode: 'json',
        args: notes
    }

    PythonShell.run('../ml_module/mlify.py', options, function (err, results) {
        if (err) throw err;
        console.log('results', results);
    });
}
*/