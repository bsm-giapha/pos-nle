import _cloneDeep from "lodash/cloneDeep";

/**
 * Given a nested string, this function will return the value of the nested string within a data property in the mixin.
 * IMPORTANT: Will return `undefined` when a nesting string does not point to a valid path in a dataProperty.
 *
 * @param {Object} dataProperty - One of the following data properties defined in this mixin: newFormData, oldFormData, changedFormData, inputMetadata.
 * @param {String} nesting - The nested string (e.g. "contact.mailingAddress"). This is essentially a dot-separated key list that will tell the function how deep to look within the dataProperty.
 * @param {Boolean} clone - Whether or not to clone the result. If you pass false here, be cautious.
 * @param {Boolean} skipLastNest - Whether or not to skip the last key in the nest. Passing true will allow you to access an object, which will allow you to modify something by reference/sharing.
 * @returns {*}
 */
export default function(dataProperty, nesting, clone = true, skipLastNest = false) {
    let nestedDataValue = dataProperty;
    let shouldReturnUndefined = false;
    if (nesting.includes('.')) {
        const nestingSplitArray = nesting.split('.');
        nestingSplitArray.forEach((nestedObjectKey, index) => {
            if (!(nestedObjectKey in nestedDataValue)) {
                shouldReturnUndefined = true;
                return;
            }
            if (!(skipLastNest && index === nestingSplitArray.length - 1)) {
                nestedDataValue = nestedDataValue[nestedObjectKey];
            }
        });
    } else if (!skipLastNest && nesting.length > 0) {
        nestedDataValue = nestedDataValue[nesting];
    }

    if (shouldReturnUndefined) return undefined;

    if (clone) {
        return _cloneDeep(nestedDataValue);
    } else {
        return nestedDataValue;
    }
}
