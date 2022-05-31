# Input Library

The **Input Library** consists of components that are commonly used in constructing forms. 

## Form
Use [Forms](/bright-design-system/input-library/form/) to group and submit inputs to a front-end or back-end process.

<div>
    <BrightForm id="formExample">
        <BrightInputText id="formTextExample" label="Form"/>
        <BrightButton use="primary">Submit</BrightButton>
    </BrightForm>
</div>
<br>

## Input Compound
Use [Input Compounds](/bright-design-system/input-library/input-compound/) to create a compound input out of two or more inputs.
<div>
    <BrightInputCompound id="compoundExample" label="Search" sub-label="Where would you like to search?">
        <BrightDropdownSelect
            id="select"
            class="flex-initial"
            label="Search Scope"
            sub-label="Use this to decide the scope of your search."
            form-control="none"
            :options="[
                { value: 'everywhere', label: 'Everywhere', selected: true },
                { value: 'products', label: 'Products' },
                { value: 'vendors', label: 'Vendors' },
                { value: 'users', label: 'Users' },
            ]"
        />
        <BrightInputText id="searchCompound" class="flex-1" form-control="none" label="Search" placeholder="Search"/>
    </BrightInputCompound>
</div>

## Input Group
Use [Input Groups](/bright-design-system/input-library/input-group/) to group inputs when they have a similar purpose or category.

<div>
    <BrightInputGroup
        id="inputGroup"
        form="form_id"
        label="Input Group"
    >
        <BrightCheckbox
            id="checkbox1"
            label="Checked by default"
            sub-label="This is checkbox 1"
            value="checkbox1"
            checked="true"
        />
        <BrightCheckbox
            id="checkbox2"
            label="Unchecked by default"
            sub-label="This is checkbox 2"
            value="checkbox2"
            checked="false"
        />
    </BrightInputGroup>
</div>
<br>

## Input List
Use [Input Lists](/bright-design-system/input-library/input-list/) to display and easily edit collections of simple objects.

<div>
    <div class="code-example-box">
        <BrightInputList
            id="inputListRecommended"
            label="Input List"
            show-left-section
            items-are-clickable
            :sort-options="[
                { label: 'Sort', options: [
                    { value: 'alphabeticalASC', label: 'Alphabetical (A to Z)' },
                    { value: 'alphabeticalDESC', label: 'Alphabetical (Z to A)' },
                ]},
            ]"
            :item-actions="[
                { value: 'edit', icon: 'edit', label: 'Edit' },
                { value: 'delete', icon: 'close', label: 'Remove' },
            ]"
            :items="[
                {
                    id: 1,
                    name: 'Item 1',
                    nickname: 'This is the first item',
                },
                {
                    id: 2,
                    name: 'Item 2',
                    nickname: 'This is the second item',
                },
                {
                    id: 3,
                    name: 'Item 3',
                    nickname: 'This is the third item',
                },
            ]"
        >
            <template v-slot:left-section="item">
                <BrightAvatar :name="item.name" light color="yellow"/>
            </template>
            <template v-slot:primary-label="item">
                {{ item.name }}
            </template>
            <template v-slot:secondary-label="item">
                {{ item.nickname }}
            </template>
        </BrightInputList>
    </div>
</div>

## Address
Use [Address Inputs](/bright-design-system/input-library/address/) to collect domestic and international address inputs.

<div>
    <BrightInputAddress id="addressExample" label="Mailing Address"/>
</div>
<br>

## Checkbox
Use [Checkboxes](/bright-design-system/input-library/checkbox/) to collect generic boolean inputs.

<div>
    <BrightCheckbox id="checkboxExample" label="Checkbox" value="yes" checked/>
</div>
<br>

## Email
Use [Email Inputs](/bright-design-system/input-library/email/) to collect emails inputs.

<div>
    <BrightInputEmail id="emailExample" label="Email"/>
</div>
<br>

## Money
Use [Money Inputs](/bright-design-system/input-library/money/) to collect USD currency inputs.

<div>
    <BrightInputMoney id="moneyExample" label="Money"/>
</div>
<br>

## Number
Use [Number Inputs](/bright-design-system/input-library/number/) to collect generic numeric inputs.

<div>
    <BrightInputNumber id="numberExample" label="Number"/>
</div>
<br>

## Password
Use [Password Inputs](/bright-design-system/input-library/password/) to collect passwords and generic confidential inputs.

<div>
    <BrightInputPassword id="passwordExample" label="Password"/>
</div>
<br>

## Phone Number
Use [Phone Number Inputs](/bright-design-system/input-library/phone-number/) to collect phone number inputs with smart-formatting.

<div>
    <BrightInputPhoneNumber id="phoneNumberExample" label="Phone Number"/>
</div>
<br>

## Radio Groups
Use [Radio Groups](/bright-design-system/input-library/radio-group/) to collect a single value amongst similar options.

<div>
    <BrightRadioGroup
        id="radioInput"
        label="Radio Group"
        :options="[
            { id: 'radioInput1', label: 'Label 1', subLabel: 'The sublabel', value: 'radioInput1'},
            { id: 'radioInput2', label: 'Label 2', subLabel: 'The sublabel', value: 'radioInput2' },
            { id: 'radioInput3', label: 'Label 3', subLabel: 'The sublabel', value: 'radioInput3' }
        ]"
    />
</div>
<br>

## Select Dropdown
Use [Select Dropdowns](/bright-design-system/input-library/select-dropdown/README.md) to collect a value (or many values) amongst many similar options.

<div>
    <BrightDropdownSelect
        id="optionSchemaExample"
        label="Select Dropdown"
        :button-full-width="false"
        :options="[
            { label: 'Blue', value: 'blue', icon: 'palette', selected: true },
            { label: 'Red', value: 'red', icon: 'palette',},
            { label: 'Yellow', value: 'yellow', icon: 'palette', },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>
<br>

## Switch
Use [Switches](/bright-design-system/input-library/switch/) to collect boolean inputs that are often seen as "on / off" or "enabled / disabled" (i.e. settings).

<div>
    <BrightSwitch id="switchExample" label="Switch" value="yes" checked/>
</div>
<br>

## Text
Use [Text Inputs](/bright-design-system/input-library/text/) to collect generic text input that is short in length.

<div>
    <BrightInputText id="textExample" label="Text"/>
</div>
<br>

## Textarea
Use [Textarea Inputs](/bright-design-system/input-library/textarea/) to collect long-form or multi-line text input.

<div>
    <BrightInputTextarea id="textareaExample" label="Textarea"/>
</div>
<br>