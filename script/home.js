$(document).ready(function(){
    
    updateTableHeaders();
//    randomAccentColour();
    
    
    $(window).scroll(function() {
        updateTableHeaders();
//        showMenu();
    });

});

function updateTableHeaders() {
   $(".persist-area").each(function() {

       var el             = $(this),
           offset         = el.offset(),
           scrollTop      = $(window).scrollTop(),
           sectionHeader  = $(".section-header", this),
           sectionHeaderWrapper = $(".section-header-wrapper", this),
           sectionHeaderWrapperOffset = sectionHeaderWrapper.offset(),
           sectionContent = $(".section-content", this),
           sectionContentOffset = sectionContent.offset(),
           
           htmlStyles     = window.getComputedStyle(document.querySelector("html")),
           headerHeight   = htmlStyles.getPropertyValue("--header-height"),
           headerHeight   = headerHeight.replace(/\D/g,''),
           
           stickyActiveTopOffset = htmlStyles.getPropertyValue("--sticky-active-top-offset"),
           stickyActiveTopOffset = stickyActiveTopOffset.replace(/\D/g,''),
           
           persistAreaHeight = - (el.outerHeight() - headerHeight);
           
       
       if ((scrollTop > sectionHeaderWrapperOffset.top - stickyActiveTopOffset))
       {
            sectionHeader.css({
                'bottom': 0,
            });
            sectionHeader.addClass("sticky");

            if ((scrollTop < offset.top + el.outerHeight() - sectionHeader.height() - stickyActiveTopOffset))
            {
                sectionHeader.css({
                    'transition-property': "all",
                });
                sectionHeader.removeClass("sticky-parked");
                sectionHeader.addClass("sticky-active");
            } else
            {
                sectionHeader.css({
                    'transition-property': "none",
                    'bottom': persistAreaHeight,
                });
                sectionHeader.removeClass("sticky-active");
                sectionHeader.addClass("sticky-parked");
            }
       } else
       {
            sectionHeader.removeClass("sticky-active");
            sectionHeader.removeClass("sticky");
       }

   });
}



