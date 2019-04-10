import React from 'react';

// className eats Array also and ignore empty elements
// className={<array>ClassList}
const ReactCreateElement = React.createElement;
React.createElement = function createElement(type, props, ...args) {
    if (arguments[1] && Array.isArray(arguments[1].className)) {
        arguments[1].className = arguments[1].className.filter(Boolean).join(' ');
    } // ? typeof i === 'string'
    return ReactCreateElement.apply(this, arguments);
};
