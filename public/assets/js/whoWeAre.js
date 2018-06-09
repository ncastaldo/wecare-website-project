let sidebar;
let sticky;

$(document).ready(function(){

    sidebar = $(".sidebar");


    sticky = sidebar.offset().top - 17;

    window.onscroll = function() {
        stickIt();
        activateNavItem();
    };

    window.onresize = function() {
        stickIt();
    };

});


function stickIt() {
    let w = sidebar.parent().width();
    if (window.pageYOffset >= sticky && window.matchMedia("(min-width: 768px)").matches) {
        sidebar.addClass("sticky pt-3");
    } else {
        sidebar.removeClass("sticky pt-3");
        sidebar.width("100%");
    }
    sidebar.width(w);
}



function activateNavItem(event){

    let scrollPos = $(document).scrollTop();
    scrollPos -= $(".content-wwa").offset().top / 2;
    $('.sidebar .nav-link').each(function () {
        let currLink = $(this);
        let refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.sidebar .nav-link').removeClass("active");
            currLink.addClass("active");
        }
    });
}