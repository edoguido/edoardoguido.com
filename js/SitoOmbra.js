var scrollFriction = 15;

$(document).ready(function () {

    //scroll orizzontale slider progetti
    $(".slider").mousewheel(function (event, delta) {

        this.scrollLeft -= (delta * scrollFriction);

        event.preventDefault();
    });

    $("#one").hide();
    $("#two").hide();
    $("#three").hide();
    $("#four").hide();
    $("#five").hide();
    $("#six").hide();
    $("#seven").hide();
    $("#eight").hide();

    //blocca scroll della pagina quando entro nello slider progetti
    $(".slider").mouseenter(function () {
        $("body").removeClass("disable-scroll");
    })
    $(".slider").mouseleave(function () {
        $("body").addClass("disable-scroll");
    })

    //1ProjectOnmouseOver
    $("#prjct1").mouseenter(function () {
        $("#zero").hide();
        $("#two").hide();
        $("#three").hide();
        $("#four").hide();
        $("#five").hide();
        $("#six").hide();
        $("#seven").hide();
        $("#eight").hide();
        $("#one").show();
    });
    //2ProjectOnmouseOver
    $("#prjct2").mouseenter(function () {
        $("#zero").hide();
        $("#one").hide();
        $("#three").hide();
        $("#four").hide();
        $("#five").hide();
        $("#six").hide();
        $("#seven").hide();
        $("#eight").hide();
        $("#two").show();
    }); //3ProjectOnmouseOver
    $("#prjct3").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#one").hide()
        $("#four").hide()
        $("#five").hide()
        $("#six").hide()
        $("#seven").hide()
        $("#eight").hide()
        $("#three").show()
    }) //4ProjectOnmouseOver
    $("#prjct4").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#three").hide()
        $("#one").hide()
        $("#five").hide()
        $("#six").hide()
        $("#seven").hide()
        $("#eight").hide()
        $("#four").show()
    }) //5ProjectOnmouseOver
    $("#prjct5").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#three").hide()
        $("#four").hide()
        $("#one").hide()
        $("#six").hide()
        $("#seven").hide()
        $("#eight").hide()
        $("#five").show()
    }) //6ProjectOnmouseOver
    $("#prjct6").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#three").hide()
        $("#four").hide()
        $("#five").hide()
        $("#one").hide()
        $("#seven").hide()
        $("#eight").hide()
        $("#six").show()
    }) //7ProjectOnmouseOver
    $("#prjct7").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#three").hide()
        $("#four").hide()
        $("#five").hide()
        $("#six").hide()
        $("#one").hide()
        $("#eight").hide()
        $("#seven").show()
    }) //8ProjectOnmouseOver
    $("#prjct8").mouseenter(function () {
        $("#zero").hide()
        $("#two").hide()
        $("#three").hide()
        $("#four").hide()
        $("#five").hide()
        $("#six").hide()
        $("#seven").hide()
        $("#one").hide()
        $("#eight").show()
    })
})
