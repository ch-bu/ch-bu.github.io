// Enable dragging
dragula([document.getElementById('dragable')]);

// Save results
var a = document.createElement('a');
a.download    = "backup.json";
a.textContent = "Download backup.json";
document.getElementById('button').appendChild(a);

// Init data
localStorage.setItem('results', '[]');

// Click
$('a').click(function() {
    // Get data from forms and divs

    // Update data
    var oldStorage = JSON.parse(localStorage.results);
    var res = {'gender': 'male'};
    oldStorage.push(res);

    // Update local storage
    localStorage.setItem('results', JSON.stringify(oldStorage));

    // Save blob
    var blob = new Blob([localStorage.results], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    a.href        = url;
});

