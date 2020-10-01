var containExample = false;
var sideBarIconConfig = sideBarIconConfig || {};

function initSideBar() {
    var sideBar = $("ul#sidebar-menu");
    for (var key in conf) {
        sideBar.append(createSideBarMenuItem(key, conf[key], false));
    }
}


function sidebarScrollFix() {
    $('ul#sidebar-menu>li').hover(function (evt) {

        if (!$('body').hasClass('sidebar-collapse')) {
            return;
        }

        var $titleBar = $(this).children('a').children('.sidebar-title-bar');
        $titleBar.css({
            "top": ($(this).offset().top - $(window).scrollTop()) + "px",
            "width": "233px"
        });

        var visibleOffsetTop = $(this).offset().top - $(window).scrollTop();
        var offsetBottom = $('.sidebar-menu').height() - visibleOffsetTop;
        var requireVisibleHeight = $(this).height() + $(this).children('ul').height();
        if (offsetBottom <= requireVisibleHeight) {
            $('.sidebar-menu').css({
                "height": (requireVisibleHeight + $(window).height()) + "px"
            })
        }

        var offsetTop = visibleOffsetTop + $(this).height();
        $(this).children('ul').css({
            "top": offsetTop + "px"
        });

        var $activeList = $(this).children('ul');
        var activeListOffsetBottom = Math.abs($(window).height() - visibleOffsetTop - $(this).height());
        var requireActiveListHeight = $activeList.height();
        if (activeListOffsetBottom < requireActiveListHeight) {
            $activeList.css({
                "height": requireActiveListHeight
            });
            $activeList.addClass('scroll-list');
        }

    }, function (evt) {
        if (!$('body').hasClass('sidebar-collapse')) {
            return;
        }
        $(this).children('ul').removeClass('scroll-list');
        $(this).children('ul').css({
            "height": "auto"
        });
    });
    $('.main-sidebar').on('scroll', function (evt) {
        evt.stopPropagation();
    });

    $(window).on('resize', function () {
        $('.sidebar-menu').css({
            "height": "100%"
        })
    })
}

function createSideBarMenuItem(id, config, containAll) {
    containExample = containAll;

    if (!config) {
        return;
    }
    if (window.isLocal && config.localIgnore) {
        return;
    }
    if (config.content) {
        var hasNewExamples = false;
        a: for (var key in config.content) {
            var examples = config.content[key].content;
            if (examples) {
                for (var index = 0; index < examples.length; index++) {
                    var element = examples[index];
                    if (element.version === window.version) {
                        config.content[key].hasNewExamples = true;
                        hasNewExamples = true;
                        continue a;
                    }
                }
            }
        }
        config.hasNewExamples = hasNewExamples;
    }




    var title = utils.getLocalPairs(config, "name");
    var li = $("<li id='iclient_" + id + "' class='treeview ' title='" + title + "'></li>");
    if (config.content) {
        createSideBarMenuTitle(id, title, true, config.hasNewExamples).appendTo(li);
        createSideBarSecondMenu(config.content, id).appendTo(li);
    } else {
        createSideBarMenuTitle(id, title, false, config.hasNewExamples).appendTo(li);
    }
    return li;
}

function createSideBarSecondMenu(config, name) {
    var ul = $("<ul class='treeview-menu second-menu '></ul>");
    for (var key in config) {
        var configItem = config[key];
        if (window.isLocal && configItem.localIgnore) {
            continue;
        }
        var title = utils.getLocalPairs(configItem, "name") || "【empty title】";
        var li = $("<li class='menuTitle ' id='" + key + "' title='" + title + "'></li>");
        li.appendTo(ul);
        if (containExample && configItem.content) {
            createSideBarMenuSecondTitle(name + '-' + key, title, true, configItem.hasNewExamples).appendTo(li);
            createSideBarThirdMenu(configItem.content).appendTo(li);
        } else {
            createSideBarMenuSecondTitle(name + '-' + key, title, false, configItem.hasNewExamples).appendTo(li);
        }
    }
    return ul;
}

function createSideBarThirdMenu(examples) {
    var ul = $("<ul class='treeview-menu third-menu'></ul>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var example = examples[i];
        if (window.isLocal && example.localIgnore) {
            continue;
        }
        var title = utils.getLocalPairs(example, "name") || "【empty title】";

        var li = $("<li class='menuTitle' id='" + example.fileName + "' title='" + title + "'></li>");
        li.appendTo(ul);

        if (example.fileName && title) {
            createSideBarMenuThirdTitle(example.fileName, title, false,example.version).appendTo(li);
        }
    }
    return ul;
}


function createSideBarMenuTitle(id, title, collapse, hasNewExamples) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + " iconName'></i>"
    }

    var div = $("<a href='#" + id + "'>" + icon + "</a>");
    var titleBar = $("<span class='sidebar-title-bar'></span>");
    var newIcon = "";
    if (hasNewExamples) {
        newIcon = "<svg style='width:16px;height:16px;padding-left:5px'><circle cx='3' cy='3' r='3' fill='#e14d57'></circle>/svg>";
    }
    var firstMenuTitle = $("<span class='firstMenuTitle'>" + title + newIcon + "</span>");
    titleBar.append(firstMenuTitle);
    if (collapse) {
        titleBar.append(createCollapsedIcon());
    }
    div.append(titleBar);
    return div;
}


function createSideBarMenuSecondTitle(id, title, collapse, hasNewExamples) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + "'></i>"
    }
    var newIcon = "";
    if (hasNewExamples) {
        newIcon = "<svg style='width:16px;height:16px;padding-left:5px'><circle cx='3' cy='3' r='3' fill='#e14d57'></circle>/svg>";
    }
    var div = $(
        "<a href='#" + id + "' id='" + id + '-' + id + "'>" + icon +
        "<span class='secondMenuTitle'>" + title + "</span>" + newIcon +
        "</a>");

    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}

function createSideBarMenuThirdTitle(id, title, collapse,version) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + "'></i>"
    }
    var newIcon="";
    if(window.version===version){
        newIcon = "<svg style='width:16px;height:16px;padding-left:5px'><circle cx='3' cy='3' r='3' fill='#e14d57'></circle>/svg>";
    }

    var div = $(
        "<a href='#" + id + "' id='" + id + "'>" + icon +
        "<span class='thirdMenuTitle'>" + title + "</span>" +newIcon+
        "</a>");
    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}

function createCollapsedIcon() {
    return $("<span class='pull-right-container'> <i class='fa fa-angle-left pull-right'></i> </span>");
}

function selectMenu(id, length) {
    var target = _getTarget(id, length);
    if (length !== 1) {
        _selectTarget(target.parent().parent().parent().parent());
        _selectTarget(target.parent().parent());
        _selectTarget(target.parent());
        _selectTarget(target.find("ul"));
    }
}

function _getTarget(id, length) {
    var target;
    if (length) {
        if (length === 1) {
            $("section#sidebar li.active").removeClass("active");
            target = $("section#sidebar li#iclient_" + id);
            target.children('ul').show();
        }
        if (length === 2) {
            $("section#sidebar li.active ul.active li").removeClass("active");
            target = $("section#sidebar li.treeview").children('ul').children('li#' + id);
        }
    } else {
        $("section#sidebar #ul").addClass("active");
        $("section#sidebar li.active").removeClass("active");
        target = $("section#sidebar li#" + id);
    }
    target && target.addClass('active');
    return target;
}

function _selectTarget(target) {
    if (!target || target.length < 1) {
        return;
    }
    var className = target.attr("class");
    if (className && className.indexOf("treeview-menu") > -1 && className.indexOf("menu-open") === -1) {
        target.addClass("menu-open");
        target.css("display", "block");
    }
    if (className && className.indexOf("treeview") > -1) {
        target.addClass('active');
    }
}