import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

/**
 * A mixin that is well-suited for components that have an Input List and are a Descendant.
 *
 * Note the use of the following JSDoc block tags in this Mixin's values:
 *      @required = You MUST override this in your Form.
 *      @optional = You can optionally override this in your Form.
 *      @use = You can/should use this in your Form. Often times, this will be used for bindings/event listeners.
 *      @convenience = Useful fields/methods that make Forms easier to manage and more convenient.
 */
export const FormDescendantInputListMixin = {
    mixins: [FormInputListMixin, FormDescendantMixin],
    computed: {
        /**
         * @use
         * Use this when you need to bind to a Modal Form.
         */
        bindDescendantModalForm() {
            return {
                ...this.bindDescendant,
                show: this.showInputListForm,
                formType: this.idOfItemBeingEdited ? 'edit' : 'add',
                handleModalClose: this.hideForm,
                allObjectsThatCanBeEdited: this.itemsInList,
                idOfItemBeingEdited: this.idOfItemBeingEdited,
            };
        },
    },
};
