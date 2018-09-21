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

    $('.nav-top-menus a.child').click(function () {
        closeMenus(this);
    });

    $('.nav-bottom-menus a.child').click(function () {
        closeMenus(this);
    });

    var menustate = getCookie('hb-menustate');
    if (menustate) {
        minNav();
    }

    $('.nav-action').clickToggle(function () {
        if (menustate) { maxNav(); } else { minNav(); }
    }, function () {
        if (menustate) { minNav(); } else { maxNav(); }
    });

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

    $(".user-img").each(function () {
        var nome = this.nextSibling.nodeValue.trim();
        $(".user-img").append('<span>' + getIntials(nome) + '</span>');
    });

    $(".view-element-actions .view-element.link").click(function () {
        $(".view-element-actions .view-element.link").removeClass("opened", 300);
        $(this).addClass("opened", 300);
    });

    if ($("nav ul li ul li a").hasClass("active")) {
        $("nav a.active").parent().parent().parent().css("background", "#555");
        $("nav.light a.active").parent().parent().parent().css("background", "#d9d9d9");
        $("nav a.active").parent().parent().show();
    };

    var modal = document.querySelector(".alert-modal");
    dialog = function (env) {
        /*var html = `<div id='dialog52895' class="alert"><h3>` + env.title + `</h3><p>` + env.description + `</p>
                <a class="btn close" href="#">` + env.cancel + `</a> <a class="btn btn-primary" onclick='` + env.action + `'>` + env.confirm + `</a></div>`;
                */

        //alert(env.title);
        modal.classList.toggle("show-alert");
    }
    closeDialog = function () {
        modal.classList.toggle("show-alert");
    }
});

function minNav() {
    setCookie('hb-menustate', true);
    $("nav a.child").addClass("closed");
    $("nav a").css("color", "transparent");
    $("nav a").css("overflow", "hidden");
    $("nav a i").css("color", "#fff");
    $("nav.light a i").css("color", "#666");
    $("nav").animate({ "width": "65px" }, 400);
    $("nav.middle").animate({ "width": "50px" }, 300);
}
function maxNav() {
    setCookie('hb-menustate', false);

    var width;
    if ($("nav").hasClass("middle")) {
        width = "200px";
    } else {
        width = "250px";
    }

    $("nav").animate({ "width": width }, 350, function () {
        $("nav a.child").removeClass("closed");
        $("nav a").css("color", "#fff");
        $("nav.light a").css("color", "#666");
        $("nav a").css("overflow", "auto");
        $("nav a.child:after").css("", "block");
    });
}

function closeMenus(menu) {
    $('.nav-top-menus li ul').slideUp("fast");
    $('.nav-bottom-menus li ul').slideUp("fast");

    if ($(menu).next('ul').is(":hidden")) {
        $(menu).next('ul').slideDown("fast");
    };
}

function getIntials(towork) {
    towork = removeAcento(towork);
    return towork.replace(/\W*(\w)\w*/g, '$1').toUpperCase()
}

function removeAcento(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}

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

function goToStep(destino, mensageiro) {
    $("#" + mensageiro).removeClass("opened", 650);
    $("#" + destino).addClass("opened", 650);
}

function setDone(destino) {
    $("#" + destino).addClass("view-done", 100);
}

function setWarning(destino) {
    $("#" + destino).addClass("view-warning", 650);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}