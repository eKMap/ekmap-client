$(document).ready(function () {
    window.initI18N(function () {
        initPage();
        bindEvents();
        var timeout = setTimeout(function () {
            $("img.chart-thumb").lazyload();
        }, 1000);

    });
});


var exConfig = exampleConfig,
    containExamples = false,
    thumbLocation = getThumbLocation();

function initPage() {
    var sideBar = $("ul#sidebar-menu");
    var chartList = $("#charts-list");
    for (var key in exConfig) {
        sideBar.append(createSideBarMenuItem(key, exConfig[key], containExamples));
        chartList.append(createGalleryItem(key, exConfig[key]));
    }
    resizeCharts();
    initSelect();
    sidebarScrollFix();
}


function initSelect() {
    var hash = window.location.hash;
    if (hash.indexOf("#") === -1) {
        var id = $('#sidebar li').first().children('a')[0].hash;

        window.location.hash = (id) ? id : window.location.hash;
    }
    scroll();
}


function createGalleryItem(id, config) {
    if (!config) {
        return;
    }
    if (window.isLocal && config.localIgnore) {
        return;
    }
    var categoryLi = $("<li class='category' id='" + id + "'></li>");
    var title = utils.getLocalPairs(config, "name");
    if (title) {
        createGalleryItemTitle(id, title).appendTo(categoryLi);
    }

    if (config.content) {
        createSubGalleryItem(config.content, id).appendTo(categoryLi);
    }
    return categoryLi;
}


function createSubGalleryItem(config, name) {
    var categoryContentDiv = $("<div class='category-content'></div>");
    for (var key in config) {
        var configItem = config[key];
        if (window.isLocal && configItem.localIgnore) {
            continue;
        }
        var content = $("<div class='box box-default color-palette-box' id='" + name + '-' + key + "'></div>");
        var title = utils.getLocalPairs(configItem, "name");
        createSubGalleryItemTitle(key, title).appendTo(content);
        if (configItem.content) {
            createGalleryCharts(configItem.content).appendTo(content);

        }
        content.appendTo(categoryContentDiv);
    }
    return categoryContentDiv;
}

function createGalleryItemTitle(id, title) {
    var menuItemIcon = exampleIconConfig[id];
    return $("<h3 class='category-title' id='title_" + id + "'>" + "<i class='fa " + menuItemIcon + "'></i>" + "&nbsp;&nbsp;" + title + "</h3>");
}

function createSubGalleryItemTitle(id, title) {
    return $("<div class='box-header'>" + "<h3 class='box-title' id='category-type-" + id + "'>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + title + "</h4>" + "</h3>" + "</div>");
}


function createGalleryCharts(examples) {
    var chartsDiv = $("<div class='box-body'></div>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var exam = examples[i];
        if (window.isLocal && exam.localIgnore) {
            continue;
        }
        createGalleryChart(exam).appendTo(chartsDiv);
    }
    return chartsDiv;
}

function createGalleryChart(example) {
    var target = "editor.html",
        defaultThumb = "../img/thumb.png",
        title = utils.getLocalPairs(example, "name"),
        subject = example.subject ? example.subject : "",
        href = example.fileName ? example.fileName : "",
        thumbnail = example.thumbnail ? thumbLocation + "/img/" + example.thumbnail : "",
        version = example.version;

    var chartDiv = $("<div class='col-md-3'></div>");
    var chart = $("<div class='chart' style='max-width: none;height: 25rem;'></div>");
    var link = $("<a class='chart-link' style='width: 100% !important;'x target='_blank' href='" + target + "#" + href + "'></a>");
    var divHeader = $("<div style='text-align: center'></div>");
    // var div = $("<div class='col-md-6' style='padding:10px'></div>")
    var chartTitle = $("<p style='color: #1a94fb;padding: 2px;overflow: hidden;height: 36px;line-height: 36px;text-overflow: ellipsis;white-space: nowrap;margin: 0;font-weight: 700;font-size: 16px;'>" + title + "</p>");
    var chartSmall = $("<p style='color: #1a94fb;'>"+ '('+ href + '.html)'  +"</p>")
    var divBody = $("<div style='display: flex;'></div>");
    var divSubject = $("<div class='col-md-6' style='padding: 10px;'></div>")
    var chartSubject = $("<p style='color: #2c3b41;padding: 2px;font-size: 14.4px;'>" + subject + "</p>");
    var newTip = $('<svg xmlns="http://www.w3.org/2000/svg" class="new-example" style="width:8px !important;height:8px;right: 1px;top: 1px;position: absolute;"><circle cx="4" cy="4" r="4" fill="#e14d57"></circle></svg>');
    var thumb = $("<img class='col-md-6' src='" + thumbnail + "' data-original='" + thumbnail + "' style='display: inline;padding: 10px;border-radius: 4px; height: 18rem;object-fit: cover;'>");

    chartTitle.appendTo(divHeader);
    chartSmall.appendTo(divHeader);
    chartSubject.appendTo(divSubject);
    divSubject.appendTo(divBody);
    thumb.appendTo(divBody);
    if (window.version === version) {
        newTip.appendTo(link);
    }
    divHeader.appendTo(link)
    divBody.appendTo(link);
    link.appendTo(chart);
    chart.appendTo(chartDiv);

    return chartDiv;
}

function getThumbLocation() {
    var param = window.location.toString();
    return param.substr(0, param.lastIndexOf('/'));
}

function resizeCharts() {
    var charts = $("#charts-list .chart .chart-thumb");
    if (charts[0] && charts[0].offsetWidth) {
        charts.height(charts[0].offsetWidth * 0.8);
    } else {
        charts.height(260 * 0.8);
    }
    window.onresize = function () {
        resizeCharts();
    }
}

function scroll() {
    var hash = window.location.hash;
    var ele;

    if (hash && hash.indexOf("#") !== -1) {
        var param = hash.split("#")[1].split("-");
        if (param.length === 1) {
            ele = $(".category-title#title_" + param[0]);
            selectMenu(param[0], param.length);
        }

        if (param.length == 2) {
            ele = $("#category-type-" + param[1]);
            selectMenu(param[1], param.length);
        }

    }

    if (ele && ele.offset()) {
        $(window).animate({
            scrollTop: ele.offset().top - 60
        }, 0);
    }
}

function bindEvents() {
    var child = $("ul#sidebar-menu>li.treeview>ul>li");
    var parent = $('ul.sidebar-menu>li').parent("ul");
    if ($('ul.sidebar-menu>li#firstMenuiManager').find('ul').length == 0) {
        if ($('ul.sidebar-menu>li#firstMenuiManager').click(function () {
            $('ul#sidebar-menu>li>ul').slideUp(500);
        }));
    }
    child.parent('ul').siblings('a').click(function (evt) {
        if ($(this).siblings('ul').is(':visible') && $(this).siblings('ul').children('li').hasClass('active')) {
            evt.stopPropagation();
        }
        window.location = evt.currentTarget.href;
    });

    window.addEventListener("hashchange", function () {
        scroll();
    });
}

var openTimer;
var animationSpeed = 500;
$(window).on('scroll', function () {
    if ($('ul.sidebar-menu>li').hasClass('active')) {
        var parent = $('ul.sidebar-menu>li').parent("ul");

        if (openTimer) {
            clearTimeout(openTimer);
        }
        openTimer = setTimeout(function () {
            parent.children('li.active').children('ul').slideDown(animationSpeed, function () {
                parent.children('li.active').children('ul').css('display', 'block');
            })
        }, 100);
    }
    $('ul.sidebar-menu>li').not("li.active").children('ul').css('display', 'none');
});