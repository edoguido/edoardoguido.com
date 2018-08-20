<link rel="shortcut icon" type="image/ico" href="favicon.ico"/>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="favicon.ico">
<link rel="mask-icon" href="favicon.svg" color="#6010f2">

<script src="jquery-3.2.1.min.js"></script>
<script>

  var loaded = false;

  $('.hyt').click(function() {
    var el = $(this);
    var amigo = $(this).parent().next();
    var prj = el.attr('data-id');
    var millis = 500;

    amigo.toggleClass('active');
    amigo.load("p-" + prj + "/" + prj + ".html");
    
    return false;
  });

</script>
