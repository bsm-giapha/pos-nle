/**
 * Use this to generate unique IDs for form input components such as BrightInputList.
 * You'll need to call this when adding a new item to such components.
 */
export default class UniqueIDGenerator {
    /**
     * @param {String} id
     */
    constructor(id) {
        this.id = id;
        this.currentUniqueIDForNewItems = 0;
    }

    /**
     * @returns {string}
     */
    getUniqueIDForNewItem() {
        this.currentUniqueIDForNewItems += 1;
        return `id.${this.id}-NewItem-${this.currentUniqueIDForNewItems}`;
    }
}
