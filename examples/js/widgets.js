var widgets = {
    loader: {
        showLoader: null,
        setLoaderText: null,
        setAttributes: null,
        removeLoader: null
    },

    alert: {
        showAlert: null,
        clearAlert: null
    }
};

(function (widgets, $) {

    var alertDiv;

    function showAlert(msg, state, width, withBorder, opacity) {
        var className = "alert-",
            border, alpha;
        className += state ? "success" : "danger";
        if (width === null || typeof (width) === 'undefined') {
            width = 300;
        }
        border = withBorder ? {
            "border": "1px solid"
        } : "none";
        alpha = opacity;
        if (alertDiv) {
            $(alertDiv).remove();
        }
        if (!$('#msg_container')[0]) {
            alertDiv = $("<div class='alert alert-dismissible' id='msg_container' role='alert' style='z-index:999999;position: absolute;top: 20px;left: 40%; display: none;text-align: center'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true' >&times;</span></button><strong><p id='msg' style='word-wrap: break-word'></p></strong></div>");
            $('body').append(alertDiv)
        }
        $('#msg_container').css('width', width + 'px');
        $('#msg_container').css(border);
        $('#msg_container').css('opacity', alpha);
        $('#msg_container').addClass(className);
        $('#msg_container').slideDown(300);
        $('#msg').html(msg);
    }

    function clearAlert() {
        $('#msg_container').hide();
    }


    function showLoader(text, type, attributes) {

        if (!type) {
            type = "loader-default";
            attributes = attributes || {
                'data-half': true
            }
        }

        var $body = document.getElementsByTagName('body');
        $body = $body && $body[0];
        if ($body) {
            var $loader = document.getElementsByClassName('loader')[0];
            if (!$loader) {
                $loader = createLoader(type);
            }
            $loader.classList.add('is-active');
            setLoaderText(text);
            setAttributes(attributes);
        }
    }

    function setLoaderText(text, textAttributeField) {
        text = text || 'loading...';
        var txtAttrField = textAttributeField != null ? textAttributeField : "data-text";
        var attributes = {};
        attributes[txtAttrField] = text;
        setAttributes(attributes);
    }

    function setAttributes(attributes) {
        var $loader = document.getElementsByClassName('loader')[0];
        if ($loader && attributes) {
            for (var attr in attributes) {
                $loader.setAttribute(attr, attributes[attr]);
            }
        }
    }

    function removeLoader() {
        var $loader = document.getElementsByClassName('loader')[0];
        if ($loader) {
            $loader.parentNode.removeChild($loader);
        }
    }


    function createLoader(className) {
        var $loader, $body = document.getElementsByTagName('body');
        $body = $body && $body[0];
        if ($body) {
            $loader = document.createElement('div');
            $loader.className = "loader " + className;
            $body.insertBefore($loader, $body.children[0]);
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = ".loader.is-active{" +
                "background-color: rgba(0, 0, 0, 0.4) !important;" +
                "}";
            if (document.getElementsByTagName('head')) {
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        }
        return $loader;
    }


    widgets.alert.showAlert = showAlert;
    widgets.alert.clearAlert = clearAlert;

    widgets.loader.showLoader = showLoader;
    widgets.loader.setLoaderText = setLoaderText;
    widgets.loader.setAttributes = setAttributes;
    widgets.loader.removeLoader = removeLoader;

})(widgets, window.jQuery);



