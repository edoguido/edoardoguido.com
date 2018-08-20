$(document).scroll(function() {
    showMenu()
})

function showMenu() {
   var menu           = $(".menu"),
       offset         = menu.offset(),
       scrollTop      = $(window).scrollTop(),
       headerLine     = $("#header-line");

    if (scrollTop > headerLine.offset().top) {
        menu.addClass("show");
    }
    else menu.removeClass("show");
}