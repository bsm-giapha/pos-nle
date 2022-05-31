<template>
    <div class="TabLicensingCredentials">
        <PanelStateLicensing v-bind="bindDescendant"/>

        <FormPanel label="Loan Origination System (LOS)">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn :tablet="ardentCanUpdateResource('Lender.InternalUser.LosPassword') ? '6' : 'flex'" :desktop="ardentCanUpdateResource('Lender.InternalUser.LosPassword') ? 'flex' : '8'">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.losUsername')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.losUsername', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn v-show="ardentCanUpdateResource('Lender.InternalUser.LosPassword')" tablet="6">
                        <BsmInputSmartPassword
                            v-bind="bindAncestorInput('licensingCredentials.losPassword')"
                            :encrypted-value="formDataInitialOfAncestor.licensingCredentials.losPassword"
                            @update:modelValue="handleAncestorInput('licensingCredentials.losPassword', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Customer Relationship Management (CRM)">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.crmUID')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.crmUID', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel v-show="ardentCanUpdateResource('Lender.InternalUser.PpeAccount') || ardentCanUpdateResource('Lender.InternalUser.OptimalBlue') " label="Product & Pricing Engine (PPE)" sub-label="If a User does not have PPE  credentials, then they may still be able to run pricing at the company, branch, or workflow level (if any of them have credit credentials).">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow v-show="ardentCanUpdateResource('Lender.InternalUser.PpeAccount')" align-items="end">
                    <BrightColumn desktop="4" tablet="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.ppeUsername')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.ppeUsername', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn desktop="4" tablet="6">
                        <BsmInputSmartPassword
                            v-bind="bindAncestorInput('licensingCredentials.ppePassword')"
                            :encrypted-value="formDataInitialOfAncestor.licensingCredentials.ppePassword"
                            @update:modelValue="handleAncestorInput('licensingCredentials.ppePassword', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-show="ardentCanUpdateResource('Lender.InternalUser.OptimalBlue')" align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.ppeEmail')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.ppeEmail', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-show="ardentCanUpdateResource('Lender.InternalUser.OptimalBlue')" align-items="end">
                    <BrightColumn desktop="4" tablet="6">
                        <BrightInputNumber
                            v-bind="bindAncestorInput('licensingCredentials.ppeBranchID')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.ppeBranchID', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn desktop="4" tablet="6">
                        <BrightInputNumber
                            v-bind="bindAncestorInput('licensingCredentials.ppeUserID')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.ppeUserID', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel v-show="hasGeneralPermission('AllowUserCreditCredentials')" label="Credit">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="4" tablet="6">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('licensingCredentials.creditVendor')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.creditVendor', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="4" tablet="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.creditLoginID')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.creditLoginID', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn desktop="8" tablet="6">
                        <BsmInputSmartPassword
                            v-bind="bindAncestorInput('licensingCredentials.creditLoginPassword')"
                            :encrypted-value="formDataInitialOfAncestor.licensingCredentials.creditLoginPassword"
                            @update:modelValue="handleAncestorInput('licensingCredentials.creditLoginPassword', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="4" tablet="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensingCredentials.creditInternalID')"
                            @update:modelValue="handleAncestorInput('licensingCredentials.creditInternalID', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn v-show="lenderConfiguration('isCreditSurrogateLogin')" desktop="4" tablet="6">
                        <BsmInputSmartPassword
                            v-bind="bindAncestorInput('licensingCredentials.creditSurrogateLoginID')"
                            :encrypted-value="formDataInitialOfAncestor.licensingCredentials.creditSurrogateLoginID"
                            @update:modelValue="handleAncestorInput('licensingCredentials.creditSurrogateLoginID', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel v-show="ardentCanUpdateResource('Lender.InternalUser.MortgageLoans') && ardentCanUpdateResource('Lender.InternalUser.ApprovalRuleDO')" label="Desktop Originator (DO)">
            <BrightRow align-items="end">
                <BrightColumn desktop="4" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.doUsername')"
                        @update:modelValue="handleAncestorInput('licensingCredentials.doUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="8" tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('licensingCredentials.doPassword')"
                        :encrypted-value="formDataInitialOfAncestor.licensingCredentials.doPassword"
                        @update:modelValue="handleAncestorInput('licensingCredentials.doPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="4" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.doCreditUsername')"
                        @update:modelValue="handleAncestorInput('licensingCredentials.doCreditUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="8" tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('licensingCredentials.doCreditPassword')"
                        :encrypted-value="formDataInitialOfAncestor.licensingCredentials.duCreditPassword"
                        @update:modelValue="handleAncestorInput('licensingCredentials.doCreditPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </FormPanel>

        <FormPanel v-show="ardentCanUpdateResource('Lender.InternalUser.MortgageLoans') && ardentCanUpdateResource('Lender.InternalUser.ApprovalRuleDU')" label="Desktop Underwriter (DU)">
            <template v-slot:sub-label>
                To test your DU credentials, <SmartLink href="https://desktopunderwriter.fanniemae.com/" target="_blank">click here</SmartLink>.
            </template>
            <BrightRow align-items="end">
                <BrightColumn desktop="4" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.duUsername')"
                        @update:modelValue="handleAncestorInput('licensingCredentials.duUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="8" tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('licensingCredentials.duPassword')"
                        :encrypted-value="formDataInitialOfAncestor.licensingCredentials.duPassword"
                        @update:modelValue="handleAncestorInput('licensingCredentials.duPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="4" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.duCreditUsername')"
                        @update:modelValue="handleAncestorInput('licensingCredentials.duCreditUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="8" tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('licensingCredentials.duCreditPassword')"
                        :encrypted-value="formDataInitialOfAncestor.licensingCredentials.duCreditPassword"
                        @update:modelValue="handleAncestorInput('licensingCredentials.duCreditPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </FormPanel>

        <FormPanel v-show="ardentCanUpdateResource('Lender.InternalUser.MortgageLoans') && ardentCanUpdateResource('Lender.InternalUser.ApprovalRuleDU')" label="Loan Prospector (LP)">
            <BrightRow align-items="end">
                <BrightColumn desktop="4" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.lpUsername')"
                        @update:modelValue="handleAncestorInput('licensingCredentials.lpUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="8" tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('licensingCredentials.lpPassword')"
                        :encrypted-value="formDataInitialOfAncestor.licensingCredentials.lpPassword"
                        @update:modelValue="handleAncestorInput('licensingCredentials.lpPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </FormPanel>
    </div>
</template>

<script>
import PanelStateLicensing from "@/views/manage/internal-users/form/tabs/licensing-credentials/PanelStateLicensing.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import BsmInputSmartPassword from "@/components/inputs/BsmInputSmartPassword.vue";
import SmartLink from "@/components/navigation/SmartLink.vue";
export default {
    name: "TabLicensingCredentials",
    components: { SmartLink, BsmInputSmartPassword, PanelStateLicensing },
    mixins: [FormDescendantMixin],
};
</script>
