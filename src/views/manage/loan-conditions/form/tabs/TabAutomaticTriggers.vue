<template>
    <div>
        <FormPanel label="Logic">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('automaticTriggers.isAutomatic')"
                            @update:modelValue="handleAncestorInput('automaticTriggers.isAutomatic', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <div v-show="formDataCurrentOfAncestor.automaticTriggers.isAutomatic">
            <FormPanel label="Loan">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightDropdownSelect
                                v-bind="bindAncestorInput('automaticTriggers.loanPurpose')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.loanPurpose', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightDropdownSelect
                                v-bind="bindAncestorInput('automaticTriggers.productProgram')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.productProgram', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightDropdownSelect
                                v-bind="bindAncestorInput('automaticTriggers.occupancyType')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.occupancyType', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightInputState
                                v-bind="bindAncestorInput('automaticTriggers.states')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.states', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightInputMoney
                                v-bind="bindAncestorInput('automaticTriggers.minimumLoanAmount')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.minimumLoanAmount', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Branches">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightDropdownSelect
                                id="showSpecificBranches"
                                v-model="showSpecificBranches"
                                label="Branch Scope"
                                sub-label="Specifies whether this Condition should trigger for all branches or just specific branches."
                                :options="[
                                    { id: 'allBranches', label: 'All Branches', value: false },
                                    { id: 'specificBranches', label: 'Specific Branches', value: true },
                                ]"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow v-show="showSpecificBranches" align-items="end">
                        <BrightColumn desktop="8">
                            <InputSpecificBranches
                                v-bind="bindAncestorInput('automaticTriggers.branches')"
                                no-items-message="No Branches can use this Condition."
                                :all-possible-items="branches.map(branch => branch.id)"
                                :get-object-representation-of-item-by-id="getBranchObjectById"
                                @update:modelValue="handleAncestorInput('automaticTriggers.branches', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Employment">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightDropdownSelect
                                v-bind="bindAncestorInput('automaticTriggers.employmentStatus')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.employmentStatus', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isSelfEmployed')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isSelfEmployed', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isEmployedLess2Years')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isEmployedLess2Years', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isRetired')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isRetired', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Income">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isIncomeEmployment')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isIncomeEmployment', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isIncomeSocialSecurity')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isIncomeSocialSecurity', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isIncomeVABenefits')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isIncomeVABenefits', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isIncomeCommission')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isIncomeCommission', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Marital Status, Child Support, and Alimony">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isDivorced')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isDivorced', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isPayAlimonyChildSupport')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isPayAlimonyChildSupport', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isReceiveAlimonyChildSupport')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isReceiveAlimonyChildSupport', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Credit Indicators">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isBankruptcy')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isBankruptcy', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isLatesPublicRecords')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isLatesPublicRecords', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isShortSalePreForeclosureDeedInLieu')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isShortSalePreForeclosureDeedInLieu', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Bank Accounts">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isLargeDeposit')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isLargeDeposit', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isBankStatement')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isBankStatement', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="TBD">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isTBDProperty')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isTBDProperty', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="REOs">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.hasAnyREO')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.hasAnyREO', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.hasREOMortgage')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.hasREOMortgage', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.hasREOFreeAndClear')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.hasREOFreeAndClear', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.hasREORental')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.hasREORental', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Residency Type">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isPermanentResidencyAlien')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isPermanentResidencyAlien', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Dependents">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isDependentsUnder18')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isDependentsUnder18', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>

            <FormPanel label="Expenses">
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="end">
                        <BrightColumn desktop="8">
                            <BrightSwitch
                                v-bind="bindAncestorInput('automaticTriggers.isNoMortgage')"
                                @update:modelValue="handleAncestorInput('automaticTriggers.isNoMortgage', $event)"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </FormPanel>
        </div>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import BrightInputState from "@/bright/components/input-library/state/BrightInputState.vue";
import InputSpecificBranches from "@/views/manage/loan-conditions/form/tabs/components/InputSpecificBranches.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabAutomaticTriggers",
    components: { InputSpecificBranches, BrightInputState },
    mixins: [FormDescendantMixin],
    data() {
        return {
            showSpecificBranches: this.formDataCurrentOfAncestor.automaticTriggers.branches.length > 0,
        };
    },
    computed: {
        branches() {
            const lender = useLenderStore();
            return lender.branches;
        },
    },
    watch: {
        'formDataCurrentOfAncestor.automaticTriggers.branches': {
            deep: true,
            handler: function(newValue) {
                if (newValue.length > 0) {
                    this.showSpecificBranches = true;
                }
            },
        },
    },
    methods: {
        getBranchObjectById(id) {
            let branch = this.branches.find(branch => branch.id === id);
            return {
                id: id,
                name: branch.information.name,
            };
        },
    },
};
</script>
