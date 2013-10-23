var Initialize = {};

/**
 * [initialSetting description]
 * @return {[type]} [description]
 */
Initialize.initialSetting = function () {

    var locationArr = location.pathname.split("/"),
        currentFile = locationArr[locationArr.length - 1];
    
    if ($.cookie("SHOW_GUIDE") === "false") {
        // alert("cookie")
        if (currentFile !== "login.html") {
            location.href = "login.html";    
        }
    }
    else {
        // alert("no cookie")
        /*if (currentFile !== "index.html") {
            location.href = "index.html";
        } */       
    }

    Initialize.initialPageSetting();

    $("#guideOKBtn").click( function () {
        $.removeCookie("SHOW_GUIDE");
        location.href = "login.html";
    } );

    $("#guideNotShowBtn").click( function () {
        $.cookie("SHOW_GUIDE", "false");
        location.href = "login.html";
    } );

    $("#guideShowBtn").click( function () {
        $.removeCookie("SHOW_GUIDE");
        location.href = "index.html";
    } );
    
};

/**
 * [initialPageSetting description]
 * @return {[type]} [description]
 */

Initialize.initialPageSetting = function () {

    var totalPage = 0,
        listHtmlContent = "";

    // Set initial page position.
    $(".page-guide").css("left", "-95%");
    $("#page1").css("left", "5%");

    //  1. Get total page.
    //  2. Initial page list.
    $.each($(".page-guide"), function (key, val) {
        var pageNum = "";

        totalPage = totalPage + 1;
        pageNum = $(this).attr("id").substr(4);

        if (pageNum === "1") {
            listHtmlContent = listHtmlContent + "<span class='list--circle list--circle-current'></span>";
        } else {
            listHtmlContent = listHtmlContent + "<span class='list--circle'></span>";
        }        
    });
    // listHtmlContent = listHtmlContent + "</div>";
    $(".list").append(listHtmlContent);
    

    // Swipe action.
    $(".page-guide").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            //This only fires when the user swipes left
            
            var $this = $(this),
                pageNum = 0,
                currentPageID = "",
                nextPageID = "";

            pageNum = $this.attr("id").substr(4);
            currentPageID = "#page" + pageNum;
            nextPageID = "#page" + (parseInt(pageNum, 10) + 1);

            if (pageNum !== totalPage.toString()) {
                $(currentPageID).animate({ 
                    left: "-95%"
                }, { duration: 200, queue: false });

                $(nextPageID).css("left", "100%");
                $(nextPageID).show();
                $(nextPageID).animate({ 
                    left: "5%"
                    // width: "90%"
                }, { duration: 200, queue: false, complete: function () {$(currentPageID).hide()} });

                $(".list > span").each(function (key, val) {
                    $(this).removeClass("list--circle-current");
                    if (key + 1 === (parseInt(pageNum, 10) + 1)) {
                        $(this).addClass("list--circle-current");
                    }
                });
            }

        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            //This only fires when the user swipes right
            var $this = $(this),
                pageNum = 0,
                currentPageID = "",
                nextPageID = "";

            pageNum = $this.attr("id").substr(4);
            currentPageID = "#page" + pageNum;
            prevPageID = "#page" + (parseInt(pageNum, 10) - 1);

            if (pageNum !== "1") {
                $(currentPageID).animate({ 
                    left: "105%",
                    // width: 0,
                    display: "hidden"
                }, { duration: 200, queue: false });

                $(prevPageID).css("left", "-95%");
                $(prevPageID).show();
                $(prevPageID).animate({ 
                    left: "5%"
                }, { duration: 200, queue: false, complete: function () {$(currentPageID).hide();}});
                

                $(".list > span").each(function (key, val) {
                    $(this).removeClass("list--circle-current");
                    if (key === (parseInt(pageNum, 10) - 2)) {
                        $(this).addClass("list--circle-current");
                    }
                });
            }
        }
    });
};head.js("js/vendor/jquery-1.10.2.min.js",
    "js/vendor/jquery.touchSwipe.min.js",
    "js/vendor/jquery.cookie.js");

/*head.js("js/Initialize.js");*/

head.ready(
    function () {
        Initialize.initialSetting();
    }
);
