// Enable dragging
dragula([document.getElementById('dragable')]);

// http://jsbin.com/oyaxa/403/edit?html,js,output
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


// Init local storage
if (localStorage.getItem('results') === null) {
  localStorage.setItem('results', '[]');
}   


// User clicks image
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
    var res = {'gender': gender, 'job': job, 'edLevel': edLevel, 
               'date': Date(), 'images': images};
    console.log(res);
    oldStorage.push(res);

    // Update local storage
    localStorage.setItem('results', JSON.stringify(oldStorage));

    // Save va
    var blob = new Blob([localStorage.results], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    a.href = url;

    // Randomize images
    $("#dragdrop").randomize("#dragable", "div");
});

// Closure for the drag drop number functionality
function higlightOverlay() {
  $('#dragable').find('img').each(function(index, el){
      var parent = $(el).parent();
      var overlay = parent.find('.overlay');
      var textDiv = parent.find('.text');

      textDiv.text(index + 1);

      overlay.css('opacity', '0.8');
      
      setTimeout(function(){ 
        overlay.css('opacity', '0');
      }, 3000);
  });
}

// Show overlay when user changes the image
$('.image-container').mousedown(function() {
    higlightOverlay();
});

// Show overlay when user changes the image
$('.image-container').touchstart(function() {
    higlightOverlay();
});



