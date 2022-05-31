# Form

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

Use **Forms** to group and submit inputs to a front-end or back-end process.

## Best Practices

### When To Use
> Use **Forms** to group and submit inputs to a front-end or back-end process.

## Anatomy
**Forms** are simple on their own: their main purpose is to contain [Inputs](/bright-design-system/input-library/overview/#input-components) and submit data to a designated process. Due to their status as a functional container, they are always paired with a number of [Inputs](/bright-design-system/input-library/overview/#input-components) and a [Submit Button](/bright-design-system/core-library/button/).

## Submitting Data

### With a Button
In most cases, a **Form** will be submitted when a **Submit Button** is pressed. This is considered best practice and is expected behavior from most users.

<div class="code-example-box">
    <BrightForm id="withAButtonForm">
        <BrightInputText
            id="withAButtonFirstName"
            name="firstName"
            label="First Name"
        />
        <BrightButton use="primary" type="submit">Submit</BrightButton>
    </BrightForm>
</div>

```vue
<BrightForm id="withAButtonForm">
    <BrightInputText
        id="withAButtonFirstName"
        name="firstName"
        label="First Name"
    />
    <BrightButton use="primary" type="submit">Submit</BrightButton>
</BrightForm>
```

### Event Handlers & JavaScript
Use the `onsubmit` event handler to provide your own JavaScript functions to intercept **Form** submissions.

For more information on event handlers, see the following MDN article: <https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers>

<div class="code-example-box">
    <script>
    function handleEventHandlerForm(form) {
        event.preventDefault();
        alert("You entered: " + form.eventHandlerFirstName.value);
    }
    </script>
    <BrightForm id="eventHandlerForm" onsubmit="handleEventHandlerForm(this)">
        <BrightInputText
            id="eventHandlerFirstName"
            name="firstName"
            label="First Name"
        />
        <BrightButton use="primary" type="submit">Submit</BrightButton>
    </BrightForm>
</div>

```vue
<script>
function handleEventHandlerForm(form) {
    event.preventDefault();
    alert("You entered: " + form.firstName.value);
}
</script>

<BrightForm id="eventHandlerForm" onsubmit="handleEventHandlerForm(this)">
    <BrightInputText
        id="eventHandlerFirstName"
        name="firstName"
        label="First Name"
    />
    <BrightButton use="primary" type="submit">Submit</BrightButton>
</BrightForm>
```


## Action
Use the **Action** property to specify the URL that the **Form** will submit to.

<div class="code-example-box">
    <BrightForm id="actionForm" action="https://www.google.com/search">
        <BrightInputText
            id="actionGoogleSearchTerm"
            name="q"
            label="Enter something to search for on Google"
        />
        <BrightButton use="primary" type="submit">Submit</BrightButton>
    </BrightForm>
</div>

```vue
<BrightForm id="actionForm" action="https://www.google.com/search">
    <BrightInputText
        id="actionGoogleSearchTerm"
        name="q"
        label="Enter something to search for on Google"
    />
    <BrightButton use="primary" type="submit">Submit</BrightButton>
</BrightForm>
```


## Method
**Forms** can be submitted using the **GET** (default) or **POST** HTTP method.

Use the **GET Method** for non-sensitive and public data. Conversely, use the **POST Method** for sensitive or private data.

### GET
By default, **Forms** will use the **GET Method** on submission. Form data will be appended to the **Form Action** URL with a `?` separator, joined with `&`.

The **GET Method** is suitable for **Forms** that **do not** have sensitive or private data. This makes the **GET Method** well-suited for sharable links and public destination pages.

<div class="code-example-box">
    <BrightForm id="getForm">
        <BrightInputText
            id="getFormLastName"
            name="lastName"
            label="Last Name"
        />
        <BrightButton use="primary" type="submit">Submit</BrightButton>
    </BrightForm>
</div>

```vue
<BrightForm id="getForm">
    <BrightInputText
        id="getFormLastName"
        name="lastName"
        label="Last Name"
    />
    <BrightButton use="primary" type="submit">Submit</BrightButton>
</BrightForm>
```

### POST
The **POST Method** is suitable for **Forms** that have sensitive or private data. This makes the **POST Method** well-suited for internal pages and security-intensive applications.

To use the **POST Method**, supply the `method` property with a value of `post`.

<div class="code-example-box">
    <BrightForm id="postForm" method="post">
        <BrightInputText
            id="postFormMiddleName"
            name="middleName"
            label="Middle Name"
            sub-label="Note: This will fail on this server because our backend doesn't support POST, but this is here to show the correct usage of the `method` post value."
        />
        <BrightButton use="primary" type="submit">Submit</BrightButton>
    </BrightForm>
</div>

```vue
<BrightForm id="postForm" method="post">
    <BrightInputText
        id="postFormMiddleName"
        name="middleName"
        label="Middle Name"
        sub-label="Note: This will fail on this server because our backend doesn't support POST, but this is here to show the correct usage of the `method` post value."
    />
    <BrightButton use="primary" type="submit">Submit</BrightButton>
</BrightForm>
```


## Edge Cases
This section contains information about reasonable defaults for **Form** behavior and the rare edge cases that may prompt you to override the defaults.

### File Inputs
By default, **Forms** will use the `application/x-www-form-urlencoded` encoding type (enctype) for **Forms** that use the **POST Method**. This is preferred in all cases that do not involve **File Inputs**.

If you need to submit a **File Input** in a **Form**, you can use the `has-file-input` property. This will change the **Form's** encoding type to `multipart/form-data`.

Additionally, you will have to set the **Form** to use the **POST Method**.

<code>Code example goes here</code>

### Target
By default, **Forms** will output their response after submission in the same frame as the **Forms** themselves. Most of the time, this is exactly what you'll want.

If you want to override this behavior, you can use the `target` property and provide one of the following values:

<table> 
    <tbody>
        <tr>
            <th style="width:20%">Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><strong class="font-code">self</strong></td>
            <td>The output is displayed in the same frame (default)</td>
        </tr>  
        <tr>
            <td><strong class="font-code">new-tab</strong></td>
            <td>The output is displayed in a new window or tab</td>
        </tr>
        <tr>
            <td><strong class="font-code">parent</strong></td>
            <td>The output is displayed in the parent frame</td>
        </tr>
        <tr>
            <td><strong class="font-code">top</strong></td>
            <td>The output is displayed in the full body of the window</td>
        </tr>
        <tr>
            <td><i>framename</i></td>
            <td>The output is displayed in a named iframe</td>
        </tr>
    </tbody>
  </table>
  
  <code>Code example goes here</code>

### Accept Charset
By default, **Forms** use the **UTF-8** character encoding for form data. As of February 2020, this is one of the most widely supported character encoding standards across web browsers and is the recommended standard for HTML5 forms.

If you want to override this behavior, you can use the `accept-charset` property and provide your own preferred character encoding.

<code>Code example goes here</code>

For more information, please see the following MDN article on Localizations and Character Encodings: <https://developer.mozilla.org/en-US/docs/Web/Guide/Localizations_and_character_encodings>

## Related Reading
- [Button](/bright-design-system/core-library/button/)
- [Input Library](/bright-design-system/input-library/)

## API
### `BrightForm` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) and [Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#Attributes), the `BrightForm` component has these properties available for use.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [action](#action) | string | | `""` | |
| [method](#method) | string | `get` `post` | `get` | |
| [has-file-input](#file-inputs) | boolean | | `false` | |
| [target](#target) | string | `self` `new-tab` `parent` `top` `{name of an iframe}` | `self` | |
| [accept-charset](#accept-charset) | string | | `utf-8` | |