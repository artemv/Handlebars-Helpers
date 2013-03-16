(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('handlebars'));
    } else if (typeof define === 'function' && define.amd) {
        define(['handlebars'], factory);
    } else {
        root.returnExports = factory(root.Handlebars);
    }
}(this, function (Handlebars) {

    var isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    Handlebars.registerHelper('is', function() {
        var args = arguments
        ,   left = args[0]
        ,   operator = args[1]
        ,   right = args[2]
        ,   options = args[3]
        ;

        if (args.length == 2) {
            options = args[1];
            if (left) return options.fn(this);
            return options.inverse(this);
        }

        if (args.length == 3) {
            right = args[1];
            options = args[2];
            if (left == right) return options.fn(this);
            return options.inverse(this);
        }

        var expressions = {
            'not': function(left, right) {
                return left != right;
            },
            '>': function(left, right) {
                return left > right;
            },
            '<': function(left, right) {
                return left < right;
            },
            '>=': function(left, right) {
                return left >= right;
            },
            '<=': function(left, right) {
                return left <= right;
            },
            '===': function(left, right) {
                return left === right;
            },
            '!==': function(left, right) {
                return left !== right;
            },
            'in': function(left, right) {
                if ( ! isArray(right)) {
                    right = right.split(',');
                }
                return right.indexOf(left) !== -1;
            }
        };

        if ( ! expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "'+operator+'"');
        }

        if (expressions[operator](left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Handlebars.SafeString(nl2br);
    });

}));