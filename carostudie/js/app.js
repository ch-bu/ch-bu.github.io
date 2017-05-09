// Enable dragging
dragula([document.getElementById('dragable')]);

//http://jsbin.com/oyaxa/403/edit?html,js,output
(function($) {
  
  $.fn.randomize = function(tree, childElem) {
    return this.each(function() {
      var $this = $(this);
      if (tree) $this = $(this).find(tree);
      var unsortedElems = $this.children(childElem);
      var elems = unsortedElems.clone();
      
      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      for(var i=0; i < elems.length; i++)
        unsortedElems.eq(i).replaceWith(elems[i]);
    });    
  };

})(jQuery);

// Randomize images
$("#dragdrop").randomize("#dragable", "div");

// Save results
var a = document.createElement('a');
a.download    = "backup.json";
a.textContent = "Download backup.json";
document.getElementById('button').appendChild(a);


// Click
$('a').click(function() {
    // Get data from forms and divs
    var gender = $('.form-check-gender:checked').val();
    var job = $('.form-check-education:checked').val();
    var edLevel = $('.form-check-ed-level:checked').val();

    // Loop over images
    var images = [];
    var incrementer = 1;
    $('#dragable').find('img').each(function(){
        images.push({id: incrementer, image: $(this).attr('id')});
        incrementer++;
    });

    // Update data
    // Init data
    var results = localStorage.getItem('results');
    var oldStorage = JSON.parse(results);
    var res = {'gender': 'male', 'job': job, 'edLevel': edLevel, 
               'date': Date(), 'images': images};
    oldStorage.push(res);

    // Update local storage
    localStorage.setItem('results', JSON.stringify(oldStorage));

    // Save blob
    var blob = new Blob([localStorage.results], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    a.href = url;

    // Randomize images
    $("#dragdrop").randomize("#dragable", "div");
});

