$(document).ready(function(){

  // hide our element on page load
  $('#landing-projects-animate').css('opacity', 0);
  $('#landing-blog').css('opacity', 0);

  $('#landing-projects-animate').waypoint(function() {
      $('#landing-projects-animate').addClass('fadeInLeft');
  }, { offset: '60%' });

  $('#landing-blog').waypoint(function() {
      $('#landing-blog').addClass('fadeInRight');
  }, { offset: '60%' });
});
