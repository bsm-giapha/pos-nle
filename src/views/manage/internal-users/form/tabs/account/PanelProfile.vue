<template>
    <FormPanel label="Profile">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        id="profilePicture"
                        label="Profile Picture"
                        sub-label="Profile Pictures are used throughout the platform, including borrower applications, so consider uploading a professional-looking picture. A default placeholder image will be used if a Profile Picture is not uploaded."
                        optional
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        id="emailSignature"
                        label="Email Signature"
                        sub-label="Your email signature will be displayed on emails sent to borrowers. No email signature will be used if an Email Signature is not uploaded."
                        optional
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelProfile",
    mixins: [FormDescendantMixin],
};
</script>
