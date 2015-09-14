$(document).ready(function(){

/* Smooth Scroll */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});



/* add class and name to articles */
$('.main-section article').each(function(e){
var i = e+1; 
$(this).addClass('topic-'+i);
$(this).attr('name', 't-'+i);

// adding names to sub-sections
$(this).find('h2').each(function(s){
$(this).attr('name', 't-'+i+'-'+s)
});


});


/* table of contents generator */
$('article.topic').each(function(e){

// Add the Parents
var parTitle = $(this).children('h1').text();
var parHref = '#'+$(this).attr('name');
var parF = '<li class="'+($(this).attr('name')+'_tbCnt')+'"><a href="'+parHref+'">'+parTitle+'</a></li>';
$('.table-contents').append(parF);


// add the children 
if ($(this).children('h2').length > 0) {
var sel = '.'+($(this).attr('name')+'_tbCnt');
$(sel).append('<ol class="sb-section"></ol>');

$(this).children('h2').each(function(s){
var sbTitle = $(this).text();
var sbHref = $(this).attr('name');
var sbF = '<li class="'+($(this).attr('name')+'_tbSB')+'"><a href="'+('#'+sbHref)+'">'+sbTitle+'</a></li>';

$(sel).children('ol').append(sbF);

});

console.log(parF);
} // end of if statement
});


// Eye candy
$(window).on('scroll', function(){
$('.template-pic').fadeIn(500);
});


/* To Top Button */
$(document).scroll(function(){
var t = $(window).scrollTop();

if (t > 148) {
$('.to-top').fadeIn();
}

else {
$('.to-top').fadeOut();
}

});


if (sessionStorage.getItem('adBoxHIDDEN') == 'true') {
    $('.advertisement-godaddy').hide();
}

/* Advertisement Close function */
$('.advertisement-godaddy .close').on('click', function() {
    $(this).parent().fadeOut(400);
	sessionStorage.setItem('adBoxHIDDEN', 'true');
});


/* Customizing Ads based on users country */
jQuery.getJSON('http://freegeoip.net/json/', function(location) {
     var country = location.country_code;
	 var inAD = '<a target="_blank" rel="nofollow" href="http://affiliate.godaddy.com/redirect/4DF574EADFC86F53B7BACDF8EAE26C49C186D74EB33E9CC7207DF6309597F9946C9B4024C6F10E88BB38E48A980F48C532B3167E2DE205CAD7E4B90397F5361D"><img src="http://affiliate.godaddy.com/ads/4DF574EADFC86F53B7BACDF8EAE26C49C186D74EB33E9CC7207DF6309597F9946C9B4024C6F10E88BB38E48A980F48C532B3167E2DE205CAD7E4B90397F5361D" border="0" width="468"  height="60" alt="R. 163 .Coms at GoDaddy.*"/></a>'
	 if (country == "IN") {
	     $('.advertisement-godaddy .img-ad').html(inAD);
	 }
});





}); // End