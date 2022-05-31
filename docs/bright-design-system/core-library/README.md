# Core Library

The **Core Library** consists of essential and generic Vue components that can be used in a variety of different applications.

## Avatars
Use [Avatars](/bright-design-system/core-library/avatar/) to visually represent a user in a layout.

<div>
    <BrightAvatar name="Alice Firstimer" color="pink" size="large"/>
</div>
<br>

## Button
Use [Buttons](/bright-design-system/core-library/button/) to communicate the availability of an action to the user and subsequently trigger the action when activated.

<div>
    <BrightButton use="primary">Button</BrightButton>
</div>
<br>

## Expandable
Use [Expandables](/bright-design-system/core-library/expandable/) when you want the ability to show and hide supplementary content.

<div>
    <BrightExpandable id="expandableMRT" class="text-purple-500">
        <template v-slot:header>
            <span class="__typography--heading--4">Expandable Header</span>
        </template>
        <p class="text-grey-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dui quam. Quisque tempor cursus metus, eleifend bibendum purus bibendum nec. Sed quis dui et arcu fringilla tristique. Aliquam erat volutpat. Phasellus sodales enim justo, eget pharetra diam scelerisque quis. Donec convallis a quam non sollicitudin. Nunc varius odio ac risus consectetur, vel egestas massa interdum. Quisque consectetur, massa ut maximus maximus, ligula velit tristique leo, in aliquam sapien velit ut leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus mauris felis, vestibulum a pharetra a, fermentum quis metus.</p>
    </BrightExpandable>
</div>
<br>

## Icon
Use [Icons](/bright-design-system/core-library/icon/) to provide a visual supplement to a layout.

<div>
    <BrightIcon use="face" style="font-size: 32px"/>
</div>

## Loader
Use [Loaders](/bright-design-system/core-library/loaders/) when loading content asynchronously.

<div>
    <BrightLoader is-loading/>
</div>

## Step bar
Use [Step Bars](/bright-design-system/core-library/step-bar/) to present a series of steps to the user.

<div class="code-example-box">
    <BrightStepBar
        id="stepsStepBar"
        :steps="[
            {
                label: 'Step 1',
            },
            {
                label: 'Step 2',
            },
            {
                label: 'Step 3',
            },
            {
                label: 'Step 4',
            },
        ]"
        :current-step="2"
    />
</div>

## Tag
Use [Tags](/bright-design-system/core-library/tag/) to present micro units of content and provide interaction opportunities with content.

<div>
    <BrightTag label="Tag" color="blue" removable/>
</div>