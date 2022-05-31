<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightTable
                        ref="playground"
                        :key="componentKey"
                        v-bind="bindings"
                        :columns="[
                            { name: 'ID', key: 'id', align: 'right', type: 'number', filterable: true },
                            { name: 'First Name', key: 'firstName', sort: 'asc' },
                            { name: 'Last Name', key: 'lastName', filterable: true },
                            { name: 'Email', key: 'email', cellClass: 'whitespace-no-wrap' },
                            { name: 'Phone Number', key: 'phoneNumber', cellClass: 'whitespace-no-wrap', sort: 'none' },
                            { name: 'Action', key: 'action', align: 'center', excludeFromSearch: true, sort: 'none' },
                        ]"
                        :rows="[
                            {
                                id: '1342',
                                firstName: 'John',
                                lastName: 'Smith',
                                email: 'john.smith@js.com',
                                phoneNumber: '(123) 819-1012',
                                action: '',
                            },
                            {
                                id: '3516',
                                firstName: 'Tim',
                                lastName: 'Alvarez',
                                email: 'tim.alvarez@ta.com',
                                phoneNumber: '(231) 412-9029',
                                action: '',
                            },
                            {
                                id: '3029',
                                firstName: 'Judith',
                                lastName: 'Clark',
                                email: 'judith.clark@jc.com',
                                phoneNumber: '(162) 876-1422',
                                action: '',
                            },
                            {
                                id: '383',
                                firstName: 'Jerome',
                                lastName: 'Smith',
                                email: 'jerome.smith@js.com',
                                phoneNumber: '(221) 415-6161',
                                action: '',
                            },
                            {
                                id: '345',
                                firstName: 'Mary',
                                lastName: 'Lee',
                                email: 'mary.lee@ml.com',
                                phoneNumber: '(612) 623-5122',
                                action: '',
                            },
                            {
                                id: '122',
                                firstName: 'John',
                                lastName: 'Homeowner',
                                email: 'john.homeowner@jh.com',
                                phoneNumber: '(231) 351-5209',
                                action: '',
                            },
                            {
                                id: '121',
                                firstName: 'Mary',
                                lastName: 'Homeowner',
                                email: 'mary.homeowner@mh.com',
                                phoneNumber: '(231) 351-5208',
                                action: '',
                            },
                            {
                                id: '9820',
                                firstName: 'Andy',
                                lastName: 'America',
                                email: 'andy.america@aa.com',
                                phoneNumber: '(221) 827-9818',
                                action: '',
                            },
                            {
                                id: '9821',
                                firstName: 'Amy',
                                lastName: 'America',
                                email: 'amy.america@aa.com',
                                phoneNumber: '(221) 827-9820',
                                action: '',
                            },
                            {
                                id: '9910',
                                firstName: 'Patrick',
                                lastName: 'Purchaser',
                                email: 'patrick.purchaser@pp.com',
                                phoneNumber: '(521) 415-7651',
                                action: '',
                            },
                            {
                                id: '9911',
                                firstName: 'Lorraine',
                                lastName: 'Purchaser',
                                email: 'lorraine.purchaser@lp.com',
                                phoneNumber: '(231) 512-5111',
                                action: '',
                            },
                            {
                                id: '7626',
                                firstName: 'Suzi',
                                lastName: 'Builder',
                                email: 'suzi.builder@sb.com',
                                phoneNumber: '(918) 544-6565',
                                action: '',
                            },
                            {
                                id: '862',
                                firstName: 'Alice',
                                lastName: 'Firstimer',
                                email: 'alice.firstimer@af.com',
                                phoneNumber: '(123) 456-7890',
                                action: '',
                            },
                            {
                                id: '524',
                                firstName: 'Penny',
                                lastName: 'Public',
                                email: 'penny.public@pp.com',
                                phoneNumber: '(321) 444-4151',
                                action: '',
                            },
                            {
                                id: '101',
                                firstName: 'Mom',
                                lastName: 'Firstimer',
                                email: 'mom.firstimer@mf.com',
                                phoneNumber: '(909) 315-9902',
                                action: '',
                            },
                            {
                                id: '102',
                                firstName: 'Dad',
                                lastName: 'Firstimer',
                                email: 'dad.firstimer@df.com',
                                phoneNumber: '(909) 315-9905',
                                action: '',
                            },
                            {
                                id: '8777',
                                firstName: 'Ross',
                                lastName: 'Blemished',
                                email: 'ross.blemished@rb.com',
                                phoneNumber: '(552) 212-2255',
                                action: '',
                            },
                            {
                                id: '4411',
                                firstName: 'Wanna',
                                lastName: 'House',
                                email: 'wanna.house@wh.com',
                                phoneNumber: '(497) 237-6780',
                                action: '',
                            },
                            {
                                id: '4410',
                                firstName: 'Needa',
                                lastName: 'House',
                                email: 'needa.house@nh.com',
                                phoneNumber: '(497) 237-6779',
                                action: '',
                            },
                            {
                                id: '5648',
                                firstName: 'Elizabeth',
                                lastName: 'Spender',
                                email: 'elizabeth.spender@es.com',
                                phoneNumber: '(322) 675-7533',
                                action: '',
                            },
                            {
                                id: '3800',
                                firstName: 'Ken',
                                lastName: 'Customer',
                                email: 'ken.customer@kc.com',
                                phoneNumber: '(310) 909-3155',
                                action: '',
                            },
                            {
                                id: '12810',
                                firstName: 'Homer',
                                lastName: 'Loanseeker',
                                email: 'homer.loanseeker@hl.com',
                                phoneNumber: '(310) 2141-2200',
                                action: '',
                            },
                            {
                                id: '11092',
                                firstName: 'Mort',
                                lastName: 'Gage',
                                email: 'mort.gage@mg.com',
                                phoneNumber: '(909) 150-1299',
                                action: '',
                            },
                            {
                                id: '11093',
                                firstName: 'Ann',
                                lastName: 'Gage',
                                email: 'ann.gage@ag.com',
                                phoneNumber: '(909) 150-1300',
                                action: '',
                            },
                            {
                                id: '10002',
                                firstName: 'Pitt',
                                lastName: 'Rock',
                                email: 'pitt.rock@pr.com',
                                phoneNumber: '(850) 123-9029',
                                action: '',
                            },
                            {
                                id: '6790',
                                firstName: 'Sonny',
                                lastName: 'Graves',
                                email: 'sonny.graves@sg.com',
                                phoneNumber: '(211) 451-3766',
                                action: '',
                            },
                            {
                                id: '8484',
                                firstName: 'Loco',
                                lastName: 'Motion',
                                email: 'loco.motion@lm.com',
                                phoneNumber: '(190) 630-9050',
                                action: '',
                            },
                            {
                                id: '27272',
                                firstName: 'Jess',
                                lastName: 'Sea',
                                email: 'jess.sea@js.com',
                                phoneNumber: '(810) 450-9000',
                                action: '',
                            },
                            {
                                id: '27271',
                                firstName: 'Ann',
                                lastName: 'Sea',
                                email: 'ann.sea@as.com',
                                phoneNumber: '(810) 450-9001',
                                action: '',
                            },
                            {
                                id: '16920',
                                firstName: 'Ron',
                                lastName: 'Tintin',
                                email: 'ron.tintin@rt.com',
                                phoneNumber: '(300) 819-5733',
                                action: '',
                            },
                            {
                                id: '7770',
                                firstName: 'Lucky',
                                lastName: 'Knowscore',
                                email: 'lucky.knowscore@lk.com',
                                phoneNumber: '(221) 535-5788',
                                action: '',
                            },
                            {
                                id: '11111',
                                firstName: 'Ima',
                                lastName: 'One',
                                email: 'ima.one@io.com',
                                phoneNumber: '(910) 340-6515',
                                action: '',
                            },
                        ]"
                    >
                        <template v-slot:column.action>
                            <a href="javascript://"><BrightIcon use="email" class="text-blue-500"></BrightIcon></a>
                        </template>
                    </BrightTable>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none" class="mt-16">
            <BrightColumn>
                <BrightCard
                    ribbon="blue"
                    :expandable="true"
                    label="Interactive Playground"
                    sub-label="Use this playground to interact with the above component in different states and settings."
                >
                    <BrightRow class="mt-24">
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="layers"/> Display</div>
                            <BrightInputGroup label="Display Settings" hide-label>
                                <BrightSwitch id="playgroundHideHeader" v-model="hideHeader" label="Hide Header"/>
                                <BrightSwitch id="playgroundHideFooter" v-model="hideFooter" label="Hide Footer"/>
                                <BrightSwitch id="playgroundShowHorizontalDivider" v-model="showHorizontalDivider" label="Horizontal Dividers"/>
                                <BrightSwitch id="playgroundShowVerticalDivider" v-model="showVerticalDivider" label="Vertical Dividers"/>
                                <BrightSwitch id="playgroundSearchable" v-model="searchable" label="Searchable"/>
                                <BrightSwitch id="playgroundFilterable" v-model="filterable" label="Filterable"/>
                                <BrightSwitch id="playgroundBulkEditable" v-model="bulkEditable" label="Bulk Editable"/>
                                <BrightSwitch id="playgroundShowRefreshButton" v-model="showRefreshButton" label="Show Refresh Button"/>
                            </BrightInputGroup>
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightInputGroup label="Styling Options" hide-label>
                                <BrightSwitch id="playgroundBordered" v-model="bordered" label="Bordered"/>
                                <BrightSwitch id="playgroundFullWidth" v-model="fullWidth" label="Full Width"/>
                                <BrightSwitch id="playgroundStriped" v-model="striped" label="Striped (Rows)"/>
                            </BrightInputGroup>

                            <BrightDropdownSelect
                                id="playgroundPadding"
                                v-model="padding"
                                label="Padding"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'paddingLarge', label: 'Large', value: 'large' },
                                    { id: 'paddingMedium', label: 'Medium', value: 'medium' },
                                    { id: 'paddingSmall', label: 'Small', value: 'small' },
                                    { id: 'paddingNone', label: 'None', value: 'none' },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundSize"
                                v-model="size"
                                label="Size"
                                sub-label="Affects the default font-size of table contents."
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'sizeLarge', label: 'Large', value: 'large' },
                                    { id: 'sizeMedium', label: 'Medium', value: 'medium' },
                                    { id: 'sizeSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightTable from "@/bright/components/layout-library/table/BrightTable";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
export default {
    name: "VuePressUIPlaygroundTag",
    components: {
        BrightInputGroup,
        BrightGrid,
        BrightRow,
        BrightColumn,
        BrightSwitch,
        BrightCard,
        BrightIcon,
        BrightTable,
        BrightDropdownSelect,
    },
    data() {
        return {
            componentKey: 0,

            hideHeader: false,
            hideFooter: false,
            searchable: true,
            filterable: true,
            bulkEditable: true,
            showRefreshButton: false,

            bordered: true,
            fullWidth: true,
            padding: 'medium',
            showHorizontalDivider: true,
            showVerticalDivider: false,
            size: 'medium',
            striped: true,
        };
    },
    computed: {
        bindings() {
            const bulkEditActions = [
                { eventName: 'assigntobranch', action: 'Assign to Branch', icon: 'assignment' },
                { eventName: 'assigntoteam', action: 'Assign to Team', icon: 'assignment' },
                { eventName: 'changerole', action: 'Change Role', icon: 'star' },
            ];
            const filters = [
                { columnKey: 'lastName', name: 'Last Name', pluralName: 'Last Names' },
            ];

            return {
                id: 'playground',

                hideHeader: this.hideHeader,
                hideFooter: this.hideFooter,
                rowsPerPageOptions: [10, 20, 40],
                searchable: this.searchable,
                filters: this.filterable ? filters : [],
                bulkEditActions: this.bulkEditable ? bulkEditActions : [],
                showRefreshButton: this.showRefreshButton,

                bordered: this.bordered,
                fullWidth: this.fullWidth,
                formControl: 'none',
                padding: this.padding,
                showHorizontalDivider: this.showHorizontalDivider,
                showVerticalDivider: this.showVerticalDivider,
                size: this.size,
                striped: this.striped,
            };
        },
    },
    watch: {
        bulkEditable() {
            this.forceRerender();
        },
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
    },
};
</script>

<style scoped>

</style>
