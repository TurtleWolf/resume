function typeWriter(l,s,a,i){
  var track = "";
  var len = s.length;
  var n = 0;
  var aud = new Audio(a);
  $(l).text("");
  window.si = setInterval(function(){
    if(!aud.paused){
      aud.pause();
      aud.currentTime = 0;
    }
    var res = track + s.charAt(n);
    $(l).text(res);
    if(s.charAt(n)!==" "){
      aud.play();
    }
    track = res;
    if(n===len-1){
      clearInterval(si);
    }
    n = n + 1;
  },i);
}


$.event.special.hoverintent = {
  setup: function() {
    $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
  },
  teardown: function() {
    $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
  },
  handler: function( event ) {
    var currentX, currentY, timeout,
    args = arguments,
    target = $( event.target ),
    previousX = event.pageX,
    previousY = event.pageY;

    function track( event ) {
      currentX = event.pageX;
      currentY = event.pageY;
    };

    function clear() {
      target
      .unbind( "mousemove", track )
      .unbind( "mouseout", clear );
      clearTimeout( timeout );
    }

    function handler() {
      var prop,
      orig = event;

      if ( ( Math.abs( previousX - currentX ) + Math.abs( previousY - currentY ) ) < 7 ) {
        clear();

        event = $.Event( "hoverintent" );
        for ( prop in orig ) {
          if ( !( prop in event ) ) {
            event[ prop ] = orig[ prop ];
          }
        }
        // Prevent accessing the original event since the new event
        // is fired asynchronously and the old event is no longer
        // usable (#6028)
        delete event.originalEvent;
        target.trigger( event );
      } else {
        previousX = currentX;
        previousY = currentY;
        timeout = setTimeout( handler, 100 );
      }
    }

    timeout = setTimeout( handler, 100 );
    target.bind({
      mousemove: track,
      mouseout: clear
    });
  }
};

$( "#accordion" ).accordion({
    heightStyle: "content",
	collapsible: true,
	active: 1,
  event: "click hoverintent"
});
var text = "Thank you for your interest in my work. I am available for hire, but I do prefer to work from home.";
typeWriter("#myText", text,"example.ogg",250);
$("h3").on("click hoverintent", function(){
  clearInterval(si);
  $("#myText").text(text);
});