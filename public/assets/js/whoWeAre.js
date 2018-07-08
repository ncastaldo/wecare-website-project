let sidebar;
let sticky;

$(document).ready(function(){

    window.onresize = function() {
        stickIt();
    };

    return $.ajax({
        method: "GET",
        dataType: "json",
        url: "/rest/whoWeAre", //SERVER URL
        error: function (request, error) {
            console.log(request, error);
        },
        success: function(data){
            loadJsonWhoWeAreIntoHtml(data);
            handleSidebar()
        }
    });

});

function handleSidebar(){
    
    sidebar = $(".sidebar");

    sticky = sidebar.offset().top - 17;

    window.onscroll = function() {
        stickIt();
        activateNavItem();
    };

    $(sidebar).attrchange({
        trackValues: true, // set to true so that the event object is updated with old & new values
        callback: function(e) {
            if(e.attributeName == "display") {
                stickIt();
                activateNavItem();
            }
        }

    });
}


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

function loadJsonWhoWeAreIntoHtml(whoWeAre){

    console.log(whoWeAre);

    let el = "";
    let sidebarEl = "";

    for (let i = 0; i < whoWeAre.length; i++) {

        let wwa = whoWeAre[i];

        el += '<div class="pb-2 mb-4" id="wwa-' + wwa.id + '"><h3><span class="h-title">' + wwa.title + '</span></h3><p>' + wwa.description + '</p><img src="' + wwa.image + '" class="image-wwa animated fadeIn"></div>'

        sidebarEl += '<li class="nav-item"><a class="nav-link'+ ( (i==0)? (' active') : (' ') ) +'" href="#wwa-' + wwa.id + '">' + wwa.title + '</a></li>'

    }

    $(".WWA").append(el);
    $(".SIDEBAR-WWA").append(sidebarEl);

}