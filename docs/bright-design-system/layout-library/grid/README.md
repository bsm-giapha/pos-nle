# Grid

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

Use **Grids**  to organize and structure content using a 12-column and flex grid system.


## Anatomy
**Grids** consist of **Rows**, which consist of **Columns**. These three components are coupled and depend on each other to function. If you're familiar with Bootstrap's grid system, then you can see these three components as being equivalent to Bootstrap's containers, rows, and columns.

*It should be noted that all examples in this page contain content that is not related to the Grid and its related component. The unrelated inner content is used to demonstrate the structure of the Grid and not the content itself.*


## Grid
**Grids** are simple containers that define standard vertical padding and provide structure for **Rows**.

**Rows** are the only type of component that can be the direct children of a **Grid**.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue
<BrightGrid>
    <BrightRow>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <BrightRow>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Vertical Gutters
Use <a href="#brightgrid-properties">`gutters-vertical`</a> when you want a Grid to have vertical padding. It's recommended to match this value with a **Row's** `gutters` value.

*Note: By default, a **Grid's** vertical gutters will be `medium`.*

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid gutters-vertical="small">
        <BrightRow gutters="small">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    This <strong>Grid</strong> has `small` vertical gutters, and its <strong>Row</strong> has `small` gutters between its <strong>Columns</strong>.
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    This <strong>Grid</strong> has `small` vertical gutters, and its <strong>Row</strong> has `small` gutters between its <strong>Columns</strong>.
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{1}
<BrightGrid gutters-vertical="small">
    <BrightRow gutters="small">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                This <strong>Grid</strong> has `small` vertical gutters, and its <strong>Row</strong> has `small` gutters between its <strong>Columns</strong>.
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                This <strong>Grid</strong> has `small` vertical gutters, and its <strong>Row</strong> has `small` gutters between its <strong>Columns</strong>.
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```


## Row
**Rows** are Flexbox-powered containers that define standard margins and provide structure for **Columns**.

**Columns** are the only type of component that can be the direct children of a **Row**.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{4-13,17-26}
<BrightGrid>
    <!-- BrightRow only contains BrightColumns as direct children -->
    <BrightRow>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <!-- BrightRow only contains BrightColumns as direct children -->
    <BrightRow>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Gutters
**Rows** have gutters between their **Columns**. Using the <a href="#brightrow-properties"> `gutters` </a> property, it's possible to change the size of the gutters.

#### Small
Use **Small** gutters for layouts that require tighter spacing.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid gutters-vertical="small">
        <BrightRow gutters="small">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="small">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2,14}
<BrightGrid gutters-vertical="small">
    <BrightRow gutters="small">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <BrightRow gutters="small">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Medium
Use **Medium** gutters for most layouts.

*Note: By default, all **Rows** have `medium` gutters.*

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid gutters-vertical="medium">
        <BrightRow gutters="medium">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="medium">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2,14}
<BrightGrid gutters-vertical="medium">
    <BrightRow gutters="medium">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <BrightRow gutters="medium">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Large
Use **Large** gutters sparingly for layouts that require wider spacing.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid gutters-vertical="large">
        <BrightRow gutters="large">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="large">
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2,14}
<BrightGrid gutters-vertical="large">
    <BrightRow gutters="large">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <BrightRow gutters="large">
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Flex Align Items
**Rows** can define the alignment of **Columns** on the cross-axis with the <a href="#brightrow-properties"> `align-items` </a> property.

#### Stretch Items
Use `stretch` to make **Columns** fill a **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="stretch" style="height: 128px">
            <BrightColumn mobile="6" class="tablet:border-r">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="6">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2}
<BrightGrid>
    <BrightRow align-items="stretch" style="height: 128px">
        <BrightColumn mobile="6" class="tablet:border-r">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="6">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Start Items
Use `start` to align **Columns** along the start of a **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="start" style="height: 128px">
            <BrightColumn mobile="6" class="tablet:border-r">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="6">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2}
<BrightGrid>
    <BrightRow align-items="start" style="height: 128px">
        <BrightColumn mobile="6" class="tablet:border-r">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="6">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Center Items
Use `center` to align **Columns** along the center of a **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="center" style="height: 128px">
            <BrightColumn mobile="6" class="tablet:border-r">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="6">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2}
<BrightGrid>
    <BrightRow align-items="center" style="height: 128px">
        <BrightColumn mobile="6" class="tablet:border-r">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="6">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### End Items
Use `end` to align **Columns** along the end of a **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="end" style="height: 128px">
            <BrightColumn mobile="6" class="tablet:border-r">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="6">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2}
<BrightGrid>
    <BrightRow align-items="end" style="height: 128px">
        <BrightColumn mobile="6" class="tablet:border-r">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="6">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Baseline Items
Use `baseline` to align **Columns** along a **Row's** height such that all of their baselines align.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="baseline">
            <BrightColumn mobile="4" class="tablet:border-r">
                <BrightCard class="text-center text-xs" raised>
                    <BrightIcon use="insert_emoticon"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4" class="tablet:border-r">
                <BrightCard class="flex items-center justify-center text-h3" raised>
                    <BrightIcon use="insert_emoticon"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4">
                <BrightCard class="text-center text-m" raised>
                    <BrightIcon use="insert_emoticon"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{2}
<BrightGrid>
    <BrightRow align-items="baseline">
        <BrightColumn mobile="4" class="tablet:border-r">
            <BrightCard class="text-center text-xs" raised>
                <BrightIcon use="insert_emoticon"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4" class="tablet:border-r">
            <BrightCard class="flex items-center justify-center text-h3" raised>
                <BrightIcon use="insert_emoticon"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4">
            <BrightCard class="text-center text-m" raised>
                <BrightIcon use="insert_emoticon"/>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```


## Column
**Columns** are simple containers that provide structure for content.

### Column Layout
Use **Column Layout** when you want to control a **Column's** width using **Bright's** 12-column grid system.

**Column Layout Columns** have the option of defining their width relative to their **Row's** width at various screen breakpoints. By default, these breakpoints are:
- **mobile**: Less than 640px
- **tablet**: Between 640px and 1439px 
- **desktop**: Greater than or equal to 1440px

Accordingly, a **Column** has three column properties that allow you to specify the number of columns they should occupy at the aforementioned screen breakpoints:
- <a href="#brightcolumn-properties"> `mobile` </a>
- <a href="#brightcolumn-properties"> `tablet` </a>
- <a href="#brightcolumn-properties"> `desktop` </a>

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn mobile="6" tablet="3" desktop="4" class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="6" tablet="9" desktop="8">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3,8}
<BrightGrid>
    <BrightRow>
        <BrightColumn mobile="6" tablet="3" desktop="4" class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="6" tablet="9" desktop="8">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Column Layout Behavior
**Columns** using **Column Layout** will apply the smaller breakpoint settings to larger breakpoints if larger breakpoint settings are not defined. This is a handy shortcut feature that allows you to create responsive layouts.

*Note: At the mobile breakpoint, a **Column** will take up its own row by default. Additionally, if the tablet & desktop breakpoints are not defined either, they will automatically adopt the Flex Layout.* 

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn tablet="6" class="tablet:border-r">
                <BrightCard raised>
                    I'll occupy 1 column at the mobile breakpoint.<br>
                    Then, I'll occupy 6 columns at both the tablet & desktop breakpoints.
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="6">
                <BrightCard raised>
                    I'll occupy 1 column at the mobile breakpoint.<br>
                    Then, I'll occupy 6 columns at both the tablet & desktop breakpoints.
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3,9}
<BrightGrid>
    <BrightRow>
        <BrightColumn tablet="6" class="tablet:border-r">
            <BrightCard raised>
                I'll occupy 1 column at the mobile breakpoint.<br>
                Then, I'll occupy 6 columns at both the tablet & desktop breakpoints.
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="6">
            <BrightCard raised>
                I'll occupy 1 column at the mobile breakpoint.<br>
                Then, I'll occupy 6 columns at both the tablet & desktop breakpoints.
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Flex Layout
Use **Flex Layout** when you want to use Flexbox to control a **Column's** width in a **Row**.

A **Column** will automatically use **Flex Layout** when no column property (`mobile`, `tablet`, `desktop`) has been passed to a **Column** component.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn class="tablet:border-r" tablet="12" mobile="6">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="12" mobile="6">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3,8}
<BrightGrid>
    <BrightRow>
        <BrightColumn class="tablet:border-r" tablet="12" mobile="6">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="12" mobile="6">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

##### flex
You can use **Flex Layout** at specific breakpoints in a **Column Layout Column** by setting a breakpoint's value to `flex`.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn mobile="flex" tablet="3" class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="flex" tablet="9">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3,8}
<BrightGrid>
    <BrightRow>
        <BrightColumn mobile="flex" tablet="3" class="tablet:border-r">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="flex" tablet="9">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

##### flex-initial
Use `flex-initial` to allow a **Column** to grow and shrink, taking into account its initial size. 

<div class="code-example-box bg-grey-50">
    <BrightGrid gutters-vertical="none">
        <strong>With `flex-initial`</strong>
        <BrightRow align-items="stretch" gutters="none">
            <BrightColumn mobile="8" tablet="flex-initial">
                <BrightCard class="h-full" raised>
                    This column uses `flex-initial`. It will grow and shrink as needed taking initial size into account.
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard class="h-full" raised>
                   Lorem
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <div class="mb-16"></div>
        <strong>With `flex`</strong>
        <BrightRow align-items="stretch" gutters="none">
            <BrightColumn mobile="flex">
                <BrightCard class="h-full" raised>
                    These columns use `flex`. They will all have equal widths.
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="flex">
                <BrightCard class="h-full" raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="flex">
                <BrightCard class="h-full" raised>
                    Lorem
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{4}
<BrightGrid gutters-vertical="none">
    <strong>With `flex-initial`</strong>
    <BrightRow align-items="stretch" gutters="none">
        <BrightColumn mobile="8" tablet="flex-initial">
            <BrightCard class="h-full" raised>
                This column uses `flex-initial`. It will grow and shrink as needed taking initial size into account.
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn>
            <BrightCard class="h-full" raised>
               Lorem
            </BrightCard>
        </BrightColumn>
    </BrightRow>
    <div class="mb-16"></div>
    <strong>With `flex`</strong>
    <BrightRow align-items="stretch" gutters="none">
        <BrightColumn mobile="flex">
            <BrightCard class="h-full" raised>
                These columns use `flex`. They will all have equal widths.
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="flex">
            <BrightCard class="h-full" raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="flex">
            <BrightCard class="h-full" raised>
                Lorem
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

##### flex-none
Use `flex-none` to prevent a **Column** from growing or shrinking.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn tablet="flex-initial">
                <BrightCard raised>This column will grow or shrink, if needed.</BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-none" style="width: 16rem">
                <BrightCard raised>This column will <strong>not</strong> grow or shrink.</BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-initial">
                <BrightCard raised>This column will grow or shrink, if needed.</BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{6}
<BrightGrid>
    <BrightRow>
        <BrightColumn tablet="flex-initial">
            <BrightCard raised>This column will grow or shrink, if needed.</BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-none" style="width: 16rem">
            <BrightCard raised>This column will <strong>not</strong> grow or shrink.</BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-initial">
            <BrightCard raised>This column will grow or shrink, if needed.</BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Flex Layout Behavior
By default, **Flex Layout Columns** will evenly distribute space between other **Columns** in a **Row**. If a mobile breakpoint setting is not defined, each **Column** will occupy its own row.

Additionally, **Columns** can use the `flex-grow` and `flex-shrink` property options at specific breakpoints to override the default Flex Layout behavior.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn tablet="flex" class="tablet:border-r">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex">
                <BrightCard raised>
                    Lorem Ipsum
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3,8,13}
<BrightGrid>
    <BrightRow>
        <BrightColumn tablet="flex" class="tablet:border-r">
            <BrightCard raised>
               Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex">
            <BrightCard raised>
                Lorem Ipsum
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Flex Grow
**Columns** can adjust how they grow in a **Flex Layout** using the `flex-grow` property options.

##### flex-grow
Use `flex-grow` to allow a **Column** to grow to fill any available space in a **Flex Layout**.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn mobile="4" tablet="flex-none" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="lock"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4" tablet="flex-grow" class="text-center tablet:border-r" style="width: 16rem">
                <BrightCard class="w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4" tablet="flex-none" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="lock"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{9}
<BrightGrid>
    <BrightRow>
        <BrightColumn mobile="4" tablet="flex-none" style="width: 8rem">
            <!-- This column will not grow -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="lock"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4" tablet="flex-grow" class="text-center tablet:border-r" style="width: 16rem">
            <!-- This column will grow -->
            <BrightCard class="w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4" tablet="flex-none" style="width: 8rem">
            <!-- This column will not grow -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="lock"/>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

##### flex-grow-none
Use `flex-grow-none` to prevent a **Column** from growing. 

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn tablet="flex-grow" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-grow-none" class="text-center tablet:border-r" style="width: 16rem">
                <BrightCard class="w-full flex items-center justify-center" raised>
                    <BrightIcon use="lock"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-grow" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{9}
<BrightGrid>
    <BrightRow>
        <BrightColumn tablet="flex-grow" style="width: 8rem">
            <!-- This column will grow -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-grow-none" class="text-center tablet:border-r" style="width: 16rem">
            <!-- This column will not grow -->
            <BrightCard class="w-full flex items-center justify-center" raised>
                <BrightIcon use="lock"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-grow" style="width: 8rem">
            <!-- This column will grow -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Flex Shrink
**Columns** can adjust how they shrink in a **Flex Layout** using the `flex-shrink` property options.

##### flex-shrink
Use `flex-shrink` to allow a **Column** to shrink, if needed. It'll allow other **Columns** to take up more space in a **Flex Layout** first. 

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn mobile="4" tablet="flex-grow" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center text-center" raised>
                    <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/> <br>
                    or <br>
                    <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4" tablet="flex-shrink" class="text-center tablet:border-r" style="width: 16rem">
                <BrightCard class="w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn mobile="4" tablet="flex-grow" style="width: 8rem">
                <BrightCard class="h-full w-full flex items-center justify-center text-center" raised>
                    <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/> <br>
                    or <br>
                    <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{11}
<BrightGrid>
    <BrightRow>
        <BrightColumn mobile="4" tablet="flex-grow" style="width: 8rem">
            <!-- This column will grow or shrink as needed -->
            <BrightCard class="h-full w-full flex items-center justify-center text-center" raised>
                <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/> <br>
                or <br>
                <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4" tablet="flex-shrink" class="text-center tablet:border-r" style="width: 16rem">
            <!-- This column will shrink -->
            <BrightCard class="w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn mobile="4" tablet="flex-grow" style="width: 8rem">
            <!-- This column will grow or shrink as needed -->
            <BrightCard class="h-full w-full flex items-center justify-center text-center" raised>
                <BrightIcon use="arrow_back"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_forward"/> <br>
                or <br>
                <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

##### flex-shrink-none
Use `flex-shrink-none` to prevent a **Column** from shrinking.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn tablet="flex-shrink">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-shrink-none" class="text-center tablet:border-r" style="width: 16rem">
                <BrightCard class="w-full flex items-center justify-center" raised>
                    <BrightIcon use="lock"/>
                </BrightCard>
            </BrightColumn>
            <BrightColumn tablet="flex-shrink">
                <BrightCard class="h-full w-full flex items-center justify-center" raised>
                    <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{9}
<BrightGrid>
    <BrightRow>
        <BrightColumn tablet="flex-shrink">
            <!-- This column will shrink -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-shrink-none" class="text-center tablet:border-r" style="width: 16rem">
            <!-- This column will not shrink -->
            <BrightCard class="w-full flex items-center justify-center" raised>
                <BrightIcon use="lock"/>
            </BrightCard>
        </BrightColumn>
        <BrightColumn tablet="flex-shrink">
            <!-- This column will shrink -->
            <BrightCard class="h-full w-full flex items-center justify-center" raised>
                <BrightIcon use="arrow_forward"/><BrightIcon use="indeterminate_check_box"/><BrightIcon use="arrow_back"/>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Flex Align Self
**Columns** can align themselves in Flexbox using the <a href="#brightcolumn-properties"> `align-self` </a> property. If provided a value, a **Column's** `align-self` property will override the **Row's** `align-items` property.

#### Auto Self
Use `auto` to align a **Column** based on the value of its **Row's** `align-items` property.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow align-items="end" style="height: 128px">
            <BrightColumn align-self="auto" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Auto</strong>
                </BrightCard>
            </BrightColumn>            
            <BrightColumn align-self="start" mobile="4">
                <BrightCard raised>
                    <strong>Start</strong>
                </BrightCard>
            </BrightColumn>        
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{3}
<BrightGrid>
    <BrightRow align-items="end" style="height: 128px">
        <BrightColumn align-self="auto" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Auto</strong>
            </BrightCard>
        </BrightColumn>            
        <BrightColumn align-self="start" mobile="4">
            <BrightCard raised>
                <strong>Start</strong>
            </BrightCard>
        </BrightColumn>        
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Start Self
Use `start` to align a **Column** along the start of its **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow style="height: 128px">
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>            
            <BrightColumn align-self="start" mobile="4">
                <BrightCard raised>
                    <strong>Start</strong>
                </BrightCard>
            </BrightColumn>        
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{8}
<BrightGrid>
    <BrightRow style="height: 128px">
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>            
        <BrightColumn align-self="start" mobile="4">
            <BrightCard raised>
                <strong>Start</strong>
            </BrightCard>
        </BrightColumn>        
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Center Self
Use `center` to align a **Column** along the center of its **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow style="height: 128px">
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>
            <BrightColumn align-self="center" mobile="4">
                <BrightCard raised>
                    <strong>Center</strong>
                </BrightCard>
            </BrightColumn>
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{8}
<BrightGrid>
    <BrightRow style="height: 128px">
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>
        <BrightColumn align-self="center" mobile="4">
            <BrightCard raised>
                <strong>Center</strong>
            </BrightCard>
        </BrightColumn>
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### End Self
Use `end` to align **Columns** along the end of its **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow style="height: 128px">
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>            
            <BrightColumn align-self="end" mobile="4">
                <BrightCard raised>
                    <strong>End</strong>
                </BrightCard>
            </BrightColumn>        
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{8}
<BrightGrid>
    <BrightRow style="height: 128px">
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>            
        <BrightColumn align-self="end" mobile="4">
            <BrightCard raised>
                <strong>End</strong>
            </BrightCard>
        </BrightColumn>        
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

#### Stretch Self
Use `stretch` to make a **Column** fill its **Row's** height.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow style="height: 128px">
            <BrightColumn mobile="4">
                <BrightCard raised>
                    No align-self value given
                </BrightCard>
            </BrightColumn>            
            <BrightColumn align-self="stretch" mobile="4">
                <BrightCard class="h-full" raised>
                    <strong>Stretch</strong>
                </BrightCard>
            </BrightColumn>        
            <BrightColumn mobile="4">
                <BrightCard raised>
                    No align-self value given
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue{8}
<BrightGrid>
    <BrightRow style="height: 128px">
        <BrightColumn mobile="4">
            <BrightCard raised>
                No align-self value given
            </BrightCard>
        </BrightColumn>            
        <BrightColumn align-self="stretch" mobile="4">
            <BrightCard class="h-full" raised>
                <strong>Stretch</strong>
            </BrightCard>
        </BrightColumn>        
        <BrightColumn mobile="4">
            <BrightCard raised>
                No align-self value given
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Rows in Columns
A **Row** can be included in a **Column**. This allows for intricate layouts where you can "reset" the grid system within a **Column**.

<div class="code-example-box bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <div class="mb-16 w-full text-center font-bold">Lorem Ipsum</div>
                <BrightRow gutters="none">
                    <BrightColumn>
                        <BrightCard class="text-center" raised>
                            Lorem Ipsum
                        </BrightCard>
                    </BrightColumn>
                    <BrightColumn>
                        <BrightCard class="text-center" raised>
                            Lorem Ipsum
                        </BrightCard>
                    </BrightColumn>
                </BrightRow>
                <BrightRow gutters="none">
                    <BrightColumn>
                        <BrightCard class="text-center" raised>
                            Lorem Ipsum
                        </BrightCard>
                    </BrightColumn>
                </BrightRow>
            </BrightColumn>     
            <BrightColumn align-items="stretch">
                <BrightCard class="h-full text-center" raised>
                    <strong>Lorem Ipsum</strong>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue
<BrightGrid>
    <BrightRow>
        <BrightColumn class="tablet:border-r">
            <div class="mb-16 w-full text-center font-bold">Lorem Ipsum</div>
            <BrightRow gutters="none">
                <BrightColumn>
                    <BrightCard class="text-center" raised>
                        Lorem Ipsum
                    </BrightCard>
                </BrightColumn>
                <BrightColumn>
                    <BrightCard class="text-center" raised>
                        Lorem Ipsum
                    </BrightCard>
                </BrightColumn>
            </BrightRow>
            <BrightRow gutters="none">
                <BrightColumn>
                    <BrightCard class="text-center" raised>
                        Lorem Ipsum
                    </BrightCard>
                </BrightColumn>
            </BrightRow>
        </BrightColumn>     
        <BrightColumn align-items="stretch">
            <BrightCard class="h-full text-center" raised>
                <strong>Lorem Ipsum</strong>
            </BrightCard>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

## API

### Grid Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightGrid>
        <BrightRow>
            <BrightColumn>
                <div class="border p-8">Content</div>
            </BrightColumn>
            <BrightColumn>
                <div class="border p-8">Content</div>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

```vue
<BrightGrid>
    <BrightRow>
        <BrightColumn>
            <div class="border p-8">Content</div>
        </BrightColumn>
        <BrightColumn>
            <div class="border p-8">Content</div>
        </BrightColumn>
    </BrightRow>
</BrightGrid>
```

### Grid Components
The following components are available in the **Grid** module:

- [`BrightGrid`](#grid-2)
- [`BrightRow`](#row)
- [`BrightColumn`](#column)

### `BrightGrid` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightGrid` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [gutters-vertical](#vertical-gutters) | string | `small` `medium` `large` `none` | `medium` | |

### `BrightRow` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightRow` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [gutters](#gutters) | string | [`small`](#small) [`medium`](#medium) [`large`](#large) | `medium` | |
| [align-items](#flex-align-items) | string | [`stretch`](#stretch-items) [`start`](#start-items) [`center`](#center-items) [`end`](#end-items) [`baseline`](#baseline-items) | `null` | |

### `BrightColumn` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightColumn` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| <div style="width: 80px"> [mobile](#column) </div> | string | <span style="line-height: 2"> `1` `2` `3` `4` `5` `6` `7` `8` `9` `10` `11` `12` <br> [`flex`](#flex) [`flex-initial`](#flex-initial) [`flex-none`](#flex-none) [`flex-grow`](#flex-grow) [`flex-grow-none`](#flex-grow-none) [`flex-shrink`](#flex-shrink) [`flex-shrink-none`](#flex-shrink-none) </span> | `12` | |
| [tablet](#column) | string | <span style="line-height: 2"> `1` `2` `3` `4` `5` `6` `7` `8` `9` `10` `11` `12` <br> [`flex`](#flex) [`flex-initial`](#flex-initial) [`flex-none`](#flex-none) [`flex-grow`](#flex-grow) [`flex-grow-none`](#flex-grow-none) [`flex-shrink`](#flex-shrink) [`flex-shrink-none`](#flex-shrink-none) </span> | `flex` if no values are passed to any of the 3 column properties. `null` otherwise. </div> | |
| [desktop](#column) | string | <span style="line-height: 2"> `1` `2` `3` `4` `5` `6` `7` `8` `9` `10` `11` `12` <br> [`flex`](#flex) [`flex-initial`](#flex-initial) [`flex-none`](#flex-none) [`flex-grow`](#flex-grow) [`flex-grow-none`](#flex-grow-none) [`flex-shrink`](#flex-shrink) [`flex-shrink-none`](#flex-shrink-none) </span> | `null` | |
| [align-self](#flex-align-self) | string | [`auto`](#auto-self) [`start`](#start-self) [`center`](#center-self) [`end`](#end-self) [`stretch`](#stretch-self) | `null` | |