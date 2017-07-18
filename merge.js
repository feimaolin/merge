/**
 * Deep merge two objects and return a third object
 * If isExtend is true, the content of second object is copied to the first object.
 * @param {boolean} isExtend - Whether to extend the most left object or return a new object.
 * @param {Object} firstObj - The first object to merge
 */
function merge(isExtend, firstObj) {
    let returnObj = {};
    let args = Array.prototype.slice.call(arguments, 1);

    const doCopy = function (copy, original) {
        if (typeof copy !== 'object') {
            copy = {};
        }

        forEachObject(original, function (key, originalValue) {
            // Copy content of object
            if (isObject(originalValue)) {
                copy[key] = doCopy(copy[key] || {}, originalValue);
            } else {
                // If value is array, merge content of array based on position
                if (isArray(originalValue)) {
                    if (!copy[key]) {
                        copy[key] = [];
                    }

                    for (let i = 0; i < originalValue.length; i++) {
                        if (isObject(originalValue[i]) || isArray(originalValue[i])) {
                            copy[key][i] = doCopy(copy[key][i] || {}, originalValue[i]);
                        } else {
                            // If array value is primitive, copy directly
                            copy[key][i] = originalValue[i]
                        }
                    };
                } else {
                    copy[key] = original[key]
                }
            }
        });

        return copy;
    };

    // If isExtend is true, copy into the existing object.
    if (isExtend) {
        returnObj = firstObj;
        args = Array.prototype.slice.call(arguments, 2);
    }

    // For each object, merge to the return object
    args.forEach((obj) => {
        doCopy(returnObj, obj)
    });

    return returnObj;
}

/**
 * Check if a parameter is an object and is not array.
 * @param {Object} obj - The parameter to check.
 */
function isObject(obj) {
    return typeof obj === 'object' && !isArray(obj);
}

/**
 * Check if a parameter is an array.
 * @param {Object} obj - The parameter to check.
 */
function isArray(obj) {
    return Array.isArray(obj);
}

/**
 * Iterate over object key pairs and perform an iterator callback.
 * @param {Object} obj - The object to iterate over.
 * @param {Function} fn - The iterator callback. It passes 2 parameters:
 * * key - The object key
 * * value - The object value
 */
function forEachObject(obj, fn) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(key, obj[key]);
        }
    }
};


module.exports = {
    config: {
        merge: merge,
    }
};