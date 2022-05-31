import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        section: {
            schemaType: SchemaTypes.Text,
            label: 'Section',
            readonly: true,
        },
        keyword: {
            schemaType: SchemaTypes.Text,
            label: 'Keyword',
            readonly: true,
        },
        texts: {
            english: {
                text: {
                    schemaType: SchemaTypes.Text,
                    label: 'Text - English',
                    optional: true,
                },
                id: {
                    schemaType: SchemaTypes.Text,
                },
            },
            spanish: {
                text: {
                    schemaType: SchemaTypes.Text,
                    label: 'Text - Spanish',
                    optional: true,
                },
                id: {
                    schemaType: SchemaTypes.Text,
                },
            },
            vietnamese: {
                text: {
                    schemaType: SchemaTypes.Text,
                    label: 'Text - Vietnamese',
                    optional: true,
                },
                id: {
                    schemaType: SchemaTypes.Text,
                },
            },
            chinese: {
                text: {
                    schemaType: SchemaTypes.Text,
                    label: 'Text - Chinese',
                    optional: true,
                },
                id: {
                    schemaType: SchemaTypes.Text,
                },
            },
            loanOfficerLanguage: {
                text: {
                    schemaType: SchemaTypes.Text,
                    label: 'Text - Loan Officer Language',
                    optional: true,
                },
                id: {
                    schemaType: SchemaTypes.Text,
                },
            },
        },
    };
};

export default {
    createEditSchema() {
        return getBaseSchema();
    },
    createAddSchema() {
        return getBaseSchema();
    },
    // eslint-disable-next-line no-unused-vars
    convertClientDataFormatToApiDataFormat(data, isAddForm) {
        let newData = [
            {
                lang: '1',
                keyword: data.keyword,
                text: data.texts.english.text,
                id: data.texts.english.id,
            },
            {
                lang: '2',
                keyword: data.keyword,
                text: data.texts.spanish.text,
                id: data.texts.spanish.id,
            },
            {
                lang: '3',
                keyword: data.keyword,
                text: data.texts.vietnamese.text,
                id: data.texts.vietnamese.id,
            },
            {
                lang: '4',
                keyword: data.keyword,
                text: data.texts.chinese.text,
                id: data.texts.chinese.id,
            },
            {
                lang: '5',
                keyword: data.keyword,
                text: data.texts.loanOfficerLanguage.text,
                id: data.texts.loanOfficerLanguage.id,
            },
        ];

        return {
            id: newData[0].keyword,
            verbiage: newData,
        };
    },
    // eslint-disable-next-line no-unused-vars
    convertApiDataFormatToClientDataFormat(data, isAddForm) {
        let newFormData = {};
        newFormData.texts = {};
        data.verbiage.forEach((verbiage) => {
            switch (verbiage.lang) {
                case '1':
                    newFormData.id = verbiage.id;
                    newFormData.section = verbiage.pageLabel;
                    newFormData.keyword = verbiage.keyword;
                    newFormData.texts.english = {
                        text: verbiage.text,
                        id: verbiage.id,
                    };
                    break;
                case '2':
                    newFormData.texts.spanish = {
                        text: verbiage.text,
                        id: verbiage.id,
                    };
                    break;
                case '3':
                    newFormData.texts.vietnamese = {
                        text: verbiage.text,
                        id: verbiage.id,
                    };
                    break;
                case '4':
                    newFormData.texts.chinese = {
                        text: verbiage.text,
                        id: verbiage.id,
                    };
                    break;
                case '5':
                    newFormData.texts.loanOfficerLanguage = {
                        text: verbiage.text,
                        id: verbiage.id,
                    };
                    break;
                default:
                    break;
            }
        });
        return newFormData;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return this.convertApiDataFormatToClientDataFormat(data);
    },
};
