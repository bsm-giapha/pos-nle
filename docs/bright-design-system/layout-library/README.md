# Layout Library

The **Layout Library** consists of components that are commonly used to support the structure of a section of a page.

## Banner
Use [Banners](/bright-design-system/layout-library/banner/) to display important information or announcements.

<div>
    <BrightBanner label="Not all who wander are lost" body="If you turn left enough, you'll face the right side."/>
</div>
<br>

## Card
Use [Cards](/bright-design-system/layout-library/card/) to group content that share a common purpose or function.

<div>
    <BrightCard>
        <span class="__typography--heading--5 mb-0 block">Lorem ipsum dolor sit amet</span>
        <span class="__typography--section-caps--xs text-grey-500 block">Lorem ipsum dolor sit amet</span>
    </BrightCard>
</div>
<br>

## Divider
Use [Dividers](/bright-design-system/layout-library/divider/) to divide or separate content as needed.

<div>
    <BrightCard>
        <span class="__typography--heading--5 mb-0 block">Lorem ipsum dolor sit amet</span>
        <BrightDivider class="my-16"/>
        <span class="__typography--section-caps--xs text-grey-500 block">Lorem ipsum dolor sit amet</span>
    </BrightCard>
</div>
<br>

## Grid
Use [Grids](/bright-design-system/layout-library/grid/) to organize and structure content using a 12-column and flex grid system.

<div class="border rounded-6 p-16 bg-grey-50" style="padding: 0">
    <BrightGrid>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised class="text-center">
                    1 of 3
                </BrightCard>
            </BrightColumn>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised class="text-center">
                    2 of 3
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised class="text-center">
                    3 of 3
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow>
            <BrightColumn class="tablet:border-r">
                <BrightCard raised class="text-center">
                    1 of 2
                </BrightCard>
            </BrightColumn>
            <BrightColumn>
                <BrightCard raised class="text-center">
                    2 of 2
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow>
            <BrightColumn>
                <BrightCard raised class="text-center">
                    1 of 1
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</div>

## Tables
Use [Tables](/bright-design-system/layout-library/table/) to display tabular data.

<div>
    <BrightTable
        id="tableExample"
        :columns="[
            {
                name: 'Loan Number',
                align: 'center',
                key: 'loanNumber',
            },
            {
                name: 'Borrowers',
                sort: 'asc',
                key: 'borrowers',
            },
            {
                name: 'Address',
                key: 'address',
            },
            {
                name: 'Loan Amount',
                align: 'right',
                key: 'loanAmount',
            },
            {
                name: 'Actions',
                align: 'center',
                sort: 'none',
                key: 'actions',
            },
        ]"
        :rows='[
            {
                loanNumber: "ABCD1234",
                borrowers: "John Homeowner & Mary Homeowner",
                address: "321 C Main Road, Bellflower, CA 12345",
                loanAmount: "$410,000",
                actions: "",
            },
            {
                loanNumber: "OKS0KKA",
                borrowers: "Alice Firstimer",
                address: "123 D Main Street, Los Angeles, CA 92647",
                loanAmount: "$600,000",
                actions: "",
            },
            {
                loanNumber: "USIDU44",
                borrowers: "James Henry",
                address: "15 A Main, San Diego, CA 12345",
                loanAmount: "$410,000",
                actions: "",
            },
            {
                loanNumber: "9876WXYZ",
                borrowers: "Suzi Builder",
                address: "777 B Main Place, Orange, CA 92625",
                loanAmount: "$110,000",
                actions: "",
            },
            {
                loanNumber: "AAZZ123",
                borrowers: "Amy Applier",
                address: "62 E Main Lane, Coto de Caza, CA 92679",
                loanAmount: "$1,000,000",
                actions: "",
            },
            {
                loanNumber: "34757934",
                borrowers: "Jane Doe",
                address: "86 F Main Street, Los Angeles, CA 92647",
                loanAmount: "$70,000",
                actions: "",
            },
            {
                loanNumber: "GHI4LMN9",
                borrowers: "John Doe",
                address: "39 G Main, San Diego, CA 12345",
                loanAmount: "$560,000",
                actions: "",
            },
        ]'
        :rowsPerPageOptions = "[3, 4, 5]"
    >
        <template v-slot:column.loanNumber="row">
            <a href="javascript://">{{row.loanNumber}}</a>
        </template>
        <template v-slot:column.actions>
            <a href="javascript://"><BrightIcon use="email" class="text-black"></BrightIcon></a>
        </template>
    </BrightTable>
</div>
<br>