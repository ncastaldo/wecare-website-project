$(document).ready(function(){
    
    addCardHoverHandler();
    
});s

function addCardHoverHandler(){
    
    $("div.card-description-container").hide();

    $(".card").hover(
        function(){
            let el = $(this).find("div.card-description-container");
            if(! el.is(":visible"))
                el.slideDown(300);
        },
        function(){
            let el = $(this).find("div.card-description-container");
            el.slideUp(300);
    });

}