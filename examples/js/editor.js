$(document).ready(function() {
    window.initI18N(function() {
        initPage();
        bindEvents();
        sidebarScrollFix();
    });
});

var aceEditor;
var containExamples = true;

function initPage() {
    initSideBar();
    initEditor();
    screenResize();
}

function initSideBar() {
    var config = exampleConfig;
    var sideBar = $("ul#sidebar-menu");
    for (var key in config) {
        sideBar.append(createSideBarMenuItem(key, config[key], containExamples));
    }
    $(sideBar).ready(function() {
        initSelect();
    });

}

function screenResize() {
    window.onresize = function() {
        mapHeight();
    };
}

function initCodeEditor() {
    if (!aceEditor) {
        aceEditor = ace.edit("editor");
        aceEditor.setTheme("ace/theme/textmate");
        aceEditor.getSession().setMode("ace/mode/html");
        aceEditor.getSession().setUseWrapMode(true);
        aceEditor.setShowPrintMargin(false);
        aceEditor.$blockScrolling = Infinity;
    }
    aceEditor.setValue($('#editor').val());
    aceEditor.clearSelection();
    aceEditor.moveCursorTo(0, 0);
}

function initEditor() {
    loadExampleHtml();
    initCodeEditor();
}

function loadExampleHtml() {
    var locationParam = getLocationParam();
    if (!locationParam) {
        return;
    }
    var href = window.location.toString();
    var mapUrl = href.substr(0, href.lastIndexOf('/') + 1);
    mapUrl = mapUrl + locationParam + ".html";

    if (!mapUrl) {
        return;
    }
    var html = $.ajax({
        url: mapUrl,
        async: false,
        error: function(error) {
            alert(resources.editor.envTips);
            html = "";
        }
    }).responseText;
    if (html && html != "") {
        $('#editor').val(html);
        loadPreview(html);
    }
}

function getLocationParam() {
    var param = window.location.toString();
    if (param.indexOf("#") === -1) {
        return null;
    }
    param = param.split("#");
    if (param && param.length > 0) {
        return param[1];
    }
}

function run() {
    var iframeContent = $("#editor").val();
    if (editor) {
        iframeContent = aceEditor.getValue();
    }
    loadPreview(iframeContent);
}

function loadPreview(content) {
    var iFrame = createIFrame(),
        iframeDocument = iFrame.contentWindow.document;
    iFrame.contentWindow.resources = window.resources ? window.resources.resources : {};
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();
    var doc = document;
    iFrame.addEventListener('load', function() {
        mapHeight();
        setTimeout(function() {
            doc.title = iframeDocument.title;
        }, 100);

    });

    mapHeight();
}

function createIFrame() {
    var config = exampleConfig;
    var hash = window.location.hash;
    var id = hash.split("#")[1];
    var div = document.createElement("div");
    // div.style.padding = '5px 5px 5px 20px';
    div.style.backgroundColor = '#1a94fb14';
    div.style.display = 'block';
    div.style.height = '80px';
    div.style.margin = "8px 8px 0px 8px";

    var divLeft = document.createElement("div");
    divLeft.style.width = '90%';
    divLeft.style.float = 'left';
    divLeft.style.padding = "15px 5px 5px 20px";

    // var divRight = document.createElement("div");
    // divRight.style.width = '10%';
    // divRight.style.float = 'right';
    // divRight.style.textAlign= "center";

    var span = document.createElement("span");
    span.style.fontSize = '20px';
    span.style.fontWeight = '500';
    span.style.lineHeight = '35px';

    var p = document.createElement("p");
    p.style.marginBottom = '0px';
    p.style.fontSize = '13px';

    // var img = document.createElement("img");
    // img.style.margin = '25px';
    // img.style.width = '70%';
    // img.setAttribute("src","http://ekgis.com.vn/wp-content/uploads/2014/08/ekgislogonew.png")
    var k = 0;
    for (var key in config) {
        for (var key1 in config[key].content) {
            var arr = config[key].content[key1].content;
            arr.forEach(element => {
                if (element.fileName == id && element.description) {
                    span.innerHTML = element.name;
                    if(element.nameApi){
                        span.innerHTML += " (";
                        var i = document.createElement("i");
                        i.innerHTML = element.nameApi;
                        i.style.color = '#337ab7';
                        var spanChild = document.createElement("span");
                        spanChild.innerHTML = ")";
                        span.append(i);
                        span.append(spanChild);
                    }
                   
                    p.innerHTML = element.description;  
                    if(element.urlApi){
                        var spanChildP = document.createElement("span");
                        spanChildP.innerHTML = " Learn more about using the API ";
                        var a = document.createElement("a");
                        a.innerHTML = "here";
                        a.href = element.urlApi;
                        spanChildP.append(a);
                        p.append(spanChildP);
                    }
                    k = 1;
                }
            });
        }
    }
    if (k == 0) {
        span.innerHTML = "This is title";
        p.innerHTML = "This is description";
    }
    divLeft.append(span);
    divLeft.append(p);
    // divRight.append(img);
    div.append(divLeft);
    // div.append(divRight);
    var preViewPane = $("#previewPane");
    preViewPane.empty();
    var iframe = document.createElement("iframe");
    $(iframe).attr("id", "innerPage");
    $(iframe).attr("name", "innerPage");
    preViewPane.append(div)
    preViewPane.append(iframe);
    return iframe;
}

function refresh() {
    initEditor();
    run();
}

function initSelect() {
    var hash = window.location.hash;
    var id;
    if (hash.indexOf("#") === -1) {
        id = $("section#sidebar .thirdMenu a.link").first().attr('id');
        window.location.hash = (id) ? "#" + id : window.location.hash;
    } else {
        id = hash.split("#")[1];
    }
    selectMenu(id);
}

function mapHeight() {
    var doc = $("#innerPage").contents();
    doc.find("html").height("100%");
    doc.find("body").height("100%");
}

function bindEvents() {
    $("#sidebar ul.third-menu a").click(function(evt) {
        var target = $(evt.target).parent().parent();
        var nodeId = evt.target.id;
        if (evt.target.localName === "span") {
            nodeId = target.attr('id');
        }

        if (nodeId) {
            evt.preventDefault();
            window.location.hash = "#" + nodeId;
            initEditor();
            evt.stopPropagation();
        }
    });
    var codePane = $("#codePane");
    var previewPane = $("#previewPane");
    var expand = !!1;
    $("#showCodeBtn").click(function() {
        if (expand) {
            $(this).text(' Expand');
            $(this).addClass("fa-arrows-alt");
            $(this).removeClass(" fa-compress");
            codePane.show(10, function() {
                previewPane.removeClass("col-md-12");
                previewPane.addClass("col-md-7");
                codePane.addClass("col-md-5");
            });
        } else {
            $(this).text(' Source');
            $(this).addClass(" fa-compress");
            $(this).removeClass("fa-arrows-alt");
            codePane.hide(200, function() {
                codePane.removeClass("col-md-5");
                previewPane.removeClass("col-md-7");
                previewPane.addClass("col-md-12");
            });
        }
        expand = !expand;
    });

    window.addEventListener("hashchange", function() {
        var hash = window.location.hash;
        if (hash.indexOf("#") !== -1) {
            var id = hash.split("#")[1];
            selectMenu(id);
        }
    });
}