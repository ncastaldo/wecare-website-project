$(document).ready(function(){
    

    /* Bootstrap nav active */
    $(".navbar .nav-link").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    
    
    
    
    
    
    
})