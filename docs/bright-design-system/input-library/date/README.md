# Date

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundDate from './components/VuePressUIPlaygroundDate.vue';
export default {
    components: {
        VuePressUIPlaygroundDate
    },
}
</script>

Use **Date Inputs** to collect date and time information.

<VuePressUIPlaygroundDate/>

## Best Practices

### When To Use
> Use **Date Inputs** to collect date and time information. 

## Input Types
There are 3 different types of date inputs: **Date**, **Time**, and **Date & Time** inputs.

- **Date Inputs** will show a calendar to allow a user to select a date.
- **Time Inputs** will allow a user to select a time only.
- **Date & Time Inputs** will allow a user to select both a date and a time.

## Default Value
Use the `default-value` property to select a date or time by default.

<div class="code-example-box">
    <BrightInputDate
        id="defaultDate"
        label="Date of Birth"
        placeholder="mm/dd/yyyy"
        default-value="1/1/2000"
    />
    <BrightInputDate
        id="defaultTime"
        label="Choose a Time"
        placeholder="hh:mm AM/PM"
        hide-calendar
        enable-time
        format="h:i K"
        default-value="3:30 PM"
    />
    <BrightInputDate
        id="defaultTime"
        label="Appointment Date & Time"
        placeholder="Select a date and time"
        enable-time
        format="l, F j, Y - h:i K"
        default-value="Wednesday, October 3, 2029 - 12:00 AM"
    />
</div>

```vue{5,14,22}
<BrightInputDate
    id="defaultDate"
    label="Date of Birth"
    placeholder="mm/dd/yyyy"
    default-value="1/1/2000"
/>
<BrightInputDate
    id="defaultTime"
    label="Choose a Time"
    placeholder="hh:mm AM/PM"
    hide-calendar
    enable-time
    format="h:i K"
    default-value="3:30 PM"
/>
<BrightInputDate
    id="defaultTime"
    label="Appointment Date & Time"
    placeholder="Select a date and time"
    enable-time
    format="l, F j, Y - h:i K"
    default-value="Wednesday, October 3, 2029 - 12:00 AM"
/>
```

## Enable Time
The `enable-time` property enables the time picker display.

To activate the **Time Input** only, use this property in conjunction with the `hide-calendar` property.

<div class="code-example-box">
    <BrightInputDate
        id="enableTime1"
        label="Select a Date and Time"
        placeholder="mm/dd/yyyy at --:-- AM/PM"
        enable-time
        format="m/d/Y at h:i K"
    />
    <BrightInputDate
        id="enableTime2"
        label="Select a Time"
        placeholder="--:-- AM/PM"
        hide-calendar
        enable-time
        format="h:i K"
    />
</div>

```vue{5,13}
<BrightInputDate
    id="enableTime1"
    label="Select a Date and Time"
    placeholder="mm/dd/yyyy at --:-- AM/PM"
    enable-time
    format="m/d/Y at h:i K"
/>
<BrightInputDate
    id="enableTime2"
    label="Select a Time"
    placeholder="--:-- AM/PM"
    hide-calendar
    enable-time
    format="h:i K"
/>
```

## Format
Use the `format` property to define how the date and/or time should be displayed in the **Date**, **Time**, or **Date & Time Inputs**.

:::tip Note
By default, a **Date Input** will follow the `m/d/Y` format. For `single mode` **Time Inputs** and **Date & Time Inputs**, the `format` property will always be required.
:::

Reference the [**Formatting Characters**](#formatting-characters) tables below to construct date and time formats for the `format` property.

<div class="code-example-box">
    <BrightInputDate
        id="dateInputFormat"
        label="Purchase Date"
        placeholder="mm-dd-yyyy"
        format="m-d-Y"
    />
    <BrightInputDate
        id="timeInputFormat"
        label="Time of Arrival"
        placeholder="--:--:-- AM/PM"
        hide-calendar
        enable-time
        format="h:i:S K"
    />
    <BrightInputDate
        id="dateTimeInputFormat"
        label="Appointment Date & Time"
        placeholder="Select a date and time"
        format="l, F j, Y at h:i K"
        enable-time
    />
</div>

```vue{5,13,19}
<BrightInputDate
    id="dateInputFormat"
    label="Purchase Date"
    placeholder="mm-dd-yyyy"
    format="m-d-Y"
/>
<BrightInputDate
    id="timeInputFormat"
    label="Time of Arrival"
    placeholder="--:--:-- AM/PM"
    hide-calendar
    enable-time
    format="h:i:S K"
/>
<BrightInputDate
    id="dateTimeInputFormat"
    label="Appointment Date & Time"
    placeholder="Select a date and time"
    format="l, F j, Y at h:i K"
    enable-time
/>
```

### Formatting Characters

#### Date Formatting
| <div style="width: 120px">Character</div> | Description | Example |
| :- | :- | :- |
| `/`, `-`, <br> or `space` | These are acceptable when separating months, days, & years | m/d/Y <br> m-d-Y <br> F j, Y |
| today | This is an acceptable date value | Today's date |
| d | Day of the month, 2 digits with leading zeros | 01 to 31 |
| D | A textual representation of a day	| Mon through Sun |
| l (lowercase 'L')	| A full textual representation of the day of the week	| Sunday through Saturday |
| j | Day of the month without leading zeros | 1 to 31 |
| J | Day of the month without leading zeros and ordinal suffix | 1st, 2nd, to 31st |
| w | Numeric representation of the day of the week | 0 (for Sunday) through 6 (for Saturday) |
| W | Numeric representation of the week | 0 (first week of the year) through 52 (last week of the year) |
| F | A full textual representation of a month | January through December |
| m | Numeric representation of a month, with leading zero | 01 through 12 |
| n | Numeric representation of a month, without leading zeros | 1 through 12 |
| M | A short textual representation of a month | Jan through Dec |
| y | A two digit representation of a year | 99 or 03 |
| Y | A full numeric representation of a year, 4 digits | 1999 or 2003 |

#### Time Formatting
| <div style="width: 120px">Character</div> | Description | Example |
| :- | :- | :- |
| `:` or `space` | These are acceptable when separating hours, minutes, & seconds | h:i K |
| today | This is an acceptable time value | Time will default to 12 AM. <br> The `format` value will be applied. |
| H | Hours (24 hours) | 00 to 23 |
| h | Hours | 1 to 12 |
| G | Hours, 2 digits with leading zeros | 01 to 12 |
| i | Minutes | 00 to 59 |
| S | Seconds, 2 digits | 00 to 59 |
| s | Seconds | 0, 1 to 59 |
| K | AM/PM | AM or PM |

## Hide Calendar
Use the `hide-calendar` property to use the **Time Input**. This property will only allow a time selection.

<div class="code-example-box">
    <BrightInputDate
        id="hideCalendar"
        label="Select a Time"
        placeholder="--:-- AM/PM"
        hide-calendar
        enable-time
        format="h:i K"
    />
</div>

```vue{5}
<BrightInputDate
    id="hideCalendar"
    label="Select a Time"
    placeholder="--:-- AM/PM"
    hide-calendar
    enable-time
    format="h:i K"
/>
```

## Inline
Use the `inline` property to automatically display the date and/or time input underneath the input element.

This property will not require the user to click the input element to open the date and/or time inputs. The input will already be displayed on the screen.

<div class="code-example-box">
    <BrightInputDate
        id="inline"
        label="Select a Date"
        placeholder="mm/dd/yyyy"
        inline
    />
</div>

```vue{5}
<BrightInputDate
    id="inline"
    label="Select a Date"
    placeholder="mm/dd/yyyy"
    inline
/>
```

## Max Value
Use the `max-value` property to set the maximum value (date or time) that a user can pick to. Ensure the maximum value format is written to match the `format` value.

:::tip Note
* For **Date & Time Inputs**: The `max-value` property is not supported for the time value.
* For **Time Inputs**: The `starting-hour` and/or `starting-minute` values will need to be updated if their values are never reached in the `max-value`. Otherwise, an incorrect starting time will be displayed.
* `today` is an acceptable `max-value` value.
:::

<div class="code-example-box">
    <BrightInputDate
        id="maxDate"
        label="Previous Appointment"
        placeholder="mm/dd/yyyy"
        max-value="today"
    />
    <BrightInputDate
        id="maxDateTime"
        label="Previous Appointment Date & Time"
        placeholder="mm/dd/yyyy at --:-- AM/PM"
        enable-time
        format="m/d/Y at h:i K"
        max-value="06/30/2020"
    />
</div>

```vue{5,13}
<BrightInputDate
    id="maxDate"
    label="Previous Appointment"
    placeholder="mm/dd/yyyy"
    max-value="today"
/>
<BrightInputDate
    id="maxDateTime"
    label="Previous Appointment Date & Time"
    placeholder="mm/dd/yyyy at --:-- AM/PM"
    enable-time
    format="m/d/Y at h:i K"
    max-value="06/30/2020"
/>
```

## Min Value
Use the `min-value` property to set the minimum value (date or time) that a user can pick from. Ensure the minimum value format is written to match the `format` value.

:::tip Note
* For **Date & Time Inputs**: The `min-value` property is not supported for the time value.
* For **Time Inputs**: The `starting-hour` and/or `starting-minute` properties will need to be updated if their values are never reached in the `min-value`. Otherwise, an incorrect starting time will be displayed.
* `today` is an acceptable `min-value` value.
:::

<div class="code-example-box">
    <BrightInputDate
        id="minDate"
        label="Appointment Date"
        placeholder="mm/dd/yyyy"
        min-value="today"
    />
    <BrightInputDate
        id="minDateTime"
        label="Appointment Date & Time"
        placeholder="mm/dd/yyyy at --:-- AM/PM"
        enable-time
        format="m/d/Y at h:i K"
        min-value="06/30/2020"
    />
</div>

```vue{5,13}
<BrightInputDate
    id="minDate"
    label="Appointment Date"
    placeholder="mm/dd/yyyy"
    min-value="today"
/>
<BrightInputDate
    id="minDateTime"
    label="Appointment Date & Time"
    placeholder="mm/dd/yyyy at --:-- AM/PM"
    enable-time
    format="m/d/Y at h:i K"
    min-value="06/30/2020"
/>
```

## Mode
Use the `mode` property to allow for a single value, multiple values, or a range of values to be selected.

<div class="code-example-box">
    <BrightInputDate
        id="modeSingle"
        label="Select a Date"
        placeholder="mm/dd/yyyy"
        mode="single"
    />
    <BrightInputDate
        id="modeMultiple"
        label="Availability"
        placeholder="Select multiple dates"
        format="F j, Y"
        mode="multiple"
    />
    <BrightInputDate
        id="modeRange"
        label="Availability"
        placeholder="Select a range of dates"
        enable-time
        format="m/d/Y at h:i K"
        mode="range"
    />
</div>

```vue{5,12,20}
<BrightInputDate
    id="modeSingle"
    label="Select a Date"
    placeholder="mm/dd/yyyy"
    mode="single"
/>
<BrightInputDate
    id="modeMultiple"
    label="Availability"
    placeholder="Select multiple dates"
    format="F j, Y"
    mode="multiple"
/>
<BrightInputDate
    id="modeRange"
    label="Availability"
    placeholder="Select a range of dates"
    enable-time
    format="m/d/Y at h:i K"
    mode="range"
/>
```

## Month Selector Type
Use the `month-selector-type` property to determine how the month should be displayed in the calendar's month header.

`dropdown` will display the list of selectable months in a dropdown menu. (This is the default setting.)
<br> `static` will not display allow the selection of months in a dropdown menu.

<div class="code-example-box">
    <BrightInputDate
        id="monthSelectorTypeStatic"
        label="Select a Date"
        sub-label="The month dropdown menu will show by default."
        placeholder="mm/dd/yyyy"
    />
    <BrightInputDate
        id="monthSelectorTypeDropdown"
        label="Select Another Date"
        sub-label="The months header will stay static."
        placeholder="mm/dd/yyyy"
        month-selector-type="static"
    />
</div>

```vue{12}
<BrightInputDate
    id="monthSelectorTypeStatic"
    label="Select a Date"
    sub-label="The month dropdown menu will show by default."
    placeholder="mm/dd/yyyy"
/>
<BrightInputDate
    id="monthSelectorTypeDropdown"
    label="Select Another Date"
    sub-label="The months header will stay static."
    placeholder="mm/dd/yyyy"
    month-selector-type="static"
/>
```

## Shorthand Months
Use the `shorthand-months` property to display the shorthand version of a month's name in the calendar picker (i.e. Sep instead of September).

<div class="code-example-box">
    <BrightInputDate
        id="shorthandMonths"
        label="Date of Birth"
        placeholder="mm/dd/yyyy"
        shorthand-months
    />
</div>

```vue{5}
<BrightInputDate
    id="shorthandMonths"
    label="Date of Birth"
    placeholder="mm/dd/yyyy"
    shorthand-months
/>
```

## Starting Hour
Use the `starting-hour` property to display a different starting hour in the time picker. By default, the starting hour is set to `12`.

:::tip Note
The `starting-hour` property is available for inputs that have the `enable-time` property enabled.
:::

<div class="code-example-box">
    <BrightInputDate
        id="startingHour"
        label="Time Available"
        placeholder="--:-- AM/PM"
        hide-calendar
        enable-time
        format="h:i K"
        starting-hour="8"
    />
    <BrightInputDate
        id="startingHourDateAndTime"
        label="Availability"
        placeholder="Select a date and time"
        enable-time
        format="F j, Y - h:i K"
        starting-hour="10"
    />
</div>

```vue{8,16}
<BrightInputDate
    id="startingHour"
    label="Time Available"
    placeholder="--:-- AM/PM"
    hide-calendar
    enable-time
    format="h:i K"
    starting-hour="8"
/>
<BrightInputDate
    id="startingHourDateAndTime"
    label="Availability"
    placeholder="Select a date and time"
    enable-time
    format="F j, Y - h:i K"
    starting-hour="10"
/>
```

## Starting Minute
Use the `starting-minute` property to display a different starting minute in the time picker. By default, the starting minute is set to `00`.

:::tip Note
The `starting-minute` property is available for inputs that have the `enable-time` property enabled.
:::

<div class="code-example-box">
    <BrightInputDate
        id="startingMinute"
        label="Time Available"
        placeholder="--:-- AM/PM"
        hide-calendar
        enable-time
        format="h:i K"
        starting-minute="30"
    />
    <BrightInputDate
        id="startingMinuteDateAndTime"
        label="Availability"
        placeholder="Select a date and time"
        enable-time
        format="F j, Y - h:i K"
        starting-minute="15"
    />
</div>

```vue{8,16}
<BrightInputDate
    id="startingMinute"
    label="Time Available"
    placeholder="--:-- AM/PM"
    hide-calendar
    enable-time
    format="h:i K"
    starting-minute="30"
/>
<BrightInputDate
    id="startingMinuteDateAndTime"
    label="Availability"
    placeholder="Select a date and time"
    enable-time
    format="F j, Y - h:i K"
    starting-minute="15"
/>
```

## Accessibility

### Keyboard Controls
**Date Inputs** have the following keyboard controls:

#### Arrow Key Movement

- **Changing the Year** (**Date** and **Date & Time Inputs** only)
    - **Ctrl-Down:** Select the previous year.
    - **Ctrl-Up:** Select the next year.
- **Changing the Month** (**Date** and **Date & Time Inputs** only)
    - **Ctrl-Left:** Select the previous month.
    - **Ctrl-Right:** Select the next month.
- **Changing the Day** (**Date** and **Date & Time Inputs** only)
    - **Down:** Select the day below.
    - **Up:** Select the day above.
    - **Left:** Select the previous day.
    - **Right:** Select the next day.
- **Changing the Hour and Minutes** (**Time** and **Date & Time Inputs** only)
    - **Down:** Select the previous hour or minute-increment.
    - **Up:** Select the next hour or minute-increment.

#### Other Keys

- **Shift-Tab** (**Time** and **Date & Time Inputs** only)**:** Go to the previous time input.
- **Tab** (**Time** and **Date & Time Inputs** only)**:** Go to the next time input.

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)
- [Form](/bright-design-system/input-library/form/)

## API

### `BrightInputDate` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputDate
        id="dateInput"
        label="Select a Date"
        placeholder="mm/dd/yyyy"
    />
</div>

```vue
<BrightInputDate
    id="dateInput"
    label="Select a Date"
    placeholder="mm/dd/yyyy"
/>
```

### `BrightInputDate` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputDate` component can receive the following **properties**.

### Date Input Properties
| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [default-value](#default-value) | string | | `null` | |
| [format](#format) | string | | `m/d/Y` | |
| [max-value](#max-value) | string | | `null` | |
| [min-value](#min-value) | string | | `null` | |
| [mode](#mode) | string | `single` `range` `multiple` | `single` | |
| [month-selector-type](#month-selector-type) | string | `dropdown` `static` | `dropdown` | |
| [shorthand-months](#shorthand-months) | boolean | | `false` | |
| [inline](#inline) | boolean | | `false` | |

### Time Input Properties
| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [default-value](#default-value) | string | | `null` | |
| [enable-time](#enable-time) | boolean | | `false` | |
| [format](#format) | string | | | ✅ |
| [hide-calendar](#hide-calendar) | boolean | | `false` | |
| [max-value](#max-value) | string | | `null` | |
| [min-value](#min-value) | string | | `null` | |
| [starting-hour](#starting-hour) | string | | `12` | |
| [starting-minute](#starting-minute) | string | | `00` | |
| [inline](#inline) | boolean | | `false` | |

### Date & Time Input Properties
| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [default-value](#default-value) | string | | `null` | |
| [enable-time](#enable-time) | boolean | | `false` | |
| [format](#format) | string | | | ✅ |
| [max-value](#max-value) | string | | `null` | |
| [min-value](#min-value) | string | | `null` | |
| [mode](#mode) | string | `single` `range` `multiple` | `single` | |
| [month-selector-type](#month-selector-type) | string | `dropdown` `static` | `dropdown` | |
| [shorthand-months](#shorthand-months) | boolean | | `false` | |
| [starting-hour](#starting-hour) | string | | `12` | |
| [starting-minute](#starting-minute) | string | | `00` | |
| [inline](#inline) | boolean | | `false` | |

### `BrightInputDate` v-model behavior
The `BrightInputDate` component **does support** the `v-model` directive and will return an `array` of the date and/or time values on input.

### `BrightInputDate` Events
The `BrightInputDate` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns |
| :- | :- | :- |
| `input` [(v-model)](#brightinputdate-v-model-behavior) | When a new value is selected by the user. | The `array` containing the value of the date and/or time. |

### `BrightInputDate` Refs
The `BrightInputDate` component has the following refs.

| Ref | Element Type | Notes |
| :- | :- | :- |
| input | `<input>` | The main input element. |