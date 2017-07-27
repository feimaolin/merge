/**
 * Deep merge two objects and return a third object
 * If isExtend is true, the content of following objects are copied to the first object.
 * arrayMerge function determined how array is merged. 
 * By default, object value is merged and primative value is replaced  based on position.
 * @param {boolean} isExtend - Whether to extend the most left object or return a new object.
 * @param {Function} arrayMerge - If given, array is merged using this function.
 * @param {Object} firstObj - The first object to merge.
 * @param {...Object} [n] - An object to merge into the previous one.
 * @returns {Object} - The merged object. If the first argument is true, the first object is returned.
 */
function merge(isExtend, arrayMerge, firstObj) {
    let returnObj = {};
    let args = Array.prototype.slice.call(arguments, 2);

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
                    if (typeof arrayMerge === 'function') {
                        arrayMerge(copy[key], originalValue)
                    } else {
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
                    }
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
        args = Array.prototype.slice.call(arguments, 3);
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