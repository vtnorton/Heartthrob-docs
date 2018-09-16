$(document).ready(function () {
    $.fn.clickToggle = function (func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function () {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };

    /* Menu event */
    $(document).click(function () {
        $('.menu').slideUp("fast");
    });
    openMenu = function (env, menu) {
        env.stopPropagation();
        $(menu).next(".menu").slideToggle("fast");
    };

    $("header .search a").clickToggle(
        function () {
            $("header .search a").addClass("searchactived", function () {
                $("header .search input").effect('slide', { direction: 'right', mode: 'show' }, 300).focus();
            });
        }, function () {
            $("header .search input").effect('slide', { direction: 'right', mode: 'hide' }, 300, function () {
                $("header .search a").removeClass("searchactived");
            });
        }
    );
});

function addNotification() {
    campo = "#notifications span";
    itens = 1;

    if ($(campo).text()) {
        itens = parseInt($(campo).text(), 10) + 1;
    } else {
        $("#notifications").append("<span></span>")
    }

    if (itens < 10) {
        $(campo).html("").append(itens);
    } else {
        $(campo).html("").append("9+");
    }
}

function addNotificationNum(quantidade) {
    campo = "#notifications span";
    itens = quantidade;

    if ($(campo).text()) {
        itens = parseInt($(campo).text(), 10) + quantidade;
    } else {
        $("#notifications").append("<span></span>")
    }

    if (itens < 10) {
        $(campo).html("").append(itens);
    } else {
        $(campo).html("").append("9+");
    }
}

function clearNotification() {
    $("#notifications span").remove("");
}

//function openMenu(menuparaabrir, mensageiro) {
//    $(menuparaabrir).slideToggle("normal", function () {
//        if ($(mensageiro).css("font-weight") == "600") {
//            $(mensageiro).css("font-weight", "300");
//            //$(mensageiro + " .menu-drop").css("background-position-x", "-84px !important");
//        } else {
//            $(mensageiro).css("font-weight", "600");
//            //$(mensageiro + " .menu-drop").css("background-position-x", "-56px !important");
//        }
//    });
//    //TODO: mudar o ícone para seta para cima
//};

function backStep(destino, mensageiro) {
    $(mensageiro).removeClass("view-opened");
    $(mensageiro).addClass("view-alarm");
    $(mensageiro).addClass("view-closed", 1000);

    $(destino).removeClass("view-closed", 1000);
    $(destino).addClass("view-opened");
}

function nextStep(destino, mensageiro) {
    $(mensageiro).addClass("view-passed");
    $(mensageiro).removeClass("view-opened");
    $(mensageiro).addClass("view-closed", 1000);

    $(destino).removeClass("view-closed", 1000);
    $(destino).addClass("view-opened");
}