export default {
    all: [
        {
            name: 'Alabama',
            abbreviation: 'AL',
            isTerritory: false,
        },
        {
            name: 'Alaska',
            abbreviation: 'AK',
            isTerritory: false,

        },
        {
            name: 'American Samoa',
            abbreviation: 'AS',
            isTerritory: true,

        },
        {
            name: 'Arizona',
            abbreviation: 'AZ',
            isTerritory: false,
        },
        {
            name: 'Arkansas',
            abbreviation: 'AR',
            isTerritory: false,
        },
        {
            name: 'California',
            abbreviation: 'CA',
            isTerritory: false,
        },
        {
            name: 'Colorado',
            abbreviation: 'CO',
            isTerritory: false,
        },
        {
            name: 'Connecticut',
            abbreviation: 'CT',
            isTerritory: false,
        },
        {
            name: 'Delaware',
            abbreviation: 'DE',
            isTerritory: false,
        },
        {
            name: 'District Of Columbia',
            abbreviation: 'DC',
            isTerritory: false,
        },
        {
            name: 'Micronesia',
            abbreviation: 'FM',
            isTerritory: true,
        },
        {
            name: 'Florida',
            abbreviation: 'FL',
            isTerritory: false,
        },
        {
            name: 'Georgia',
            abbreviation: 'GA',
            isTerritory: false,
        },
        {
            name: 'Guam',
            abbreviation: 'GU',
            isTerritory: true,
        },
        {
            name: 'Hawaii',
            abbreviation: 'HI',
            isTerritory: false,
        },
        {
            name: 'Idaho',
            abbreviation: 'ID',
            isTerritory: false,
        },
        {
            name: 'Illinois',
            abbreviation: 'IL',
            isTerritory: false,
        },
        {
            name: 'Indiana',
            abbreviation: 'IN',
            isTerritory: false,
        },
        {
            name: 'Iowa',
            abbreviation: 'IA',
            isTerritory: false,
        },
        {
            name: 'Kansas',
            abbreviation: 'KS',
            isTerritory: false,
        },
        {
            name: 'Kentucky',
            abbreviation: 'KY',
            isTerritory: false,
        },
        {
            name: 'Louisiana',
            abbreviation: 'LA',
            isTerritory: false,
        },
        {
            name: 'Maine',
            abbreviation: 'ME',
            isTerritory: false,
        },
        {
            name: 'Marshall Islands',
            abbreviation: 'MH',
            isTerritory: true,
        },
        {
            name: 'Maryland',
            abbreviation: 'MD',
            isTerritory: false,
        },
        {
            name: 'Massachusetts',
            abbreviation: 'MA',
            isTerritory: false,
        },
        {
            name: 'Michigan',
            abbreviation: 'MI',
            isTerritory: false,
        },
        {
            name: 'Minnesota',
            abbreviation: 'MN',
            isTerritory: false,
        },
        {
            name: 'Mississippi',
            abbreviation: 'MS',
            isTerritory: false,
        },
        {
            name: 'Missouri',
            abbreviation: 'MO',
            isTerritory: false,
        },
        {
            name: 'Montana',
            abbreviation: 'MT',
            isTerritory: false,
        },
        {
            name: 'Nebraska',
            abbreviation: 'NE',
            isTerritory: false,
        },
        {
            name: 'Nevada',
            abbreviation: 'NV',
            isTerritory: false,
        },
        {
            name: 'New Hampshire',
            abbreviation: 'NH',
            isTerritory: false,
        },
        {
            name: 'New Jersey',
            abbreviation: 'NJ',
            isTerritory: false,
        },
        {
            name: 'New Mexico',
            abbreviation: 'NM',
            isTerritory: false,
        },
        {
            name: 'New York',
            abbreviation: 'NY',
            isTerritory: false,
        },
        {
            name: 'North Carolina',
            abbreviation: 'NC',
            isTerritory: false,
        },
        {
            name: 'North Dakota',
            abbreviation: 'ND',
            isTerritory: false,
        },
        {
            name: 'Northern Mariana Islands',
            abbreviation: 'MP',
            isTerritory: true,
        },
        {
            name: 'Ohio',
            abbreviation: 'OH',
            isTerritory: false,
        },
        {
            name: 'Oklahoma',
            abbreviation: 'OK',
            isTerritory: false,
        },
        {
            name: 'Oregon',
            abbreviation: 'OR',
            isTerritory: false,
        },
        {
            name: 'Palau',
            abbreviation: 'PW',
            isTerritory: true,
        },
        {
            name: 'Pennsylvania',
            abbreviation: 'PA',
            isTerritory: false,
        },
        {
            name: 'Puerto Rico',
            abbreviation: 'PR',
            isTerritory: true,
        },
        {
            name: 'Rhode Island',
            abbreviation: 'RI',
            isTerritory: false,
        },
        {
            name: 'South Carolina',
            abbreviation: 'SC',
            isTerritory: false,
        },
        {
            name: 'South Dakota',
            abbreviation: 'SD',
            isTerritory: false,
        },
        {
            name: 'Tennessee',
            abbreviation: 'TN',
            isTerritory: false,
        },
        {
            name: 'Texas',
            abbreviation: 'TX',
            isTerritory: false,
        },
        {
            name: 'Utah',
            abbreviation: 'UT',
            isTerritory: false,
        },
        {
            name: 'Vermont',
            abbreviation: 'VT',
            isTerritory: false,
        },
        {
            name: 'Virgin Islands',
            abbreviation: 'VI',
            isTerritory: true,
        },
        {
            name: 'Virginia',
            abbreviation: 'VA',
            isTerritory: false,
        },
        {
            name: 'Washington',
            abbreviation: 'WA',
            isTerritory: false,
        },
        {
            name: 'West Virginia',
            abbreviation: 'WV',
            isTerritory: false,
        },
        {
            name: 'Wisconsin',
            abbreviation: 'WI',
            isTerritory: false,
        },
        {
            name: 'Wyoming',
            abbreviation: 'WY',
            isTerritory: false,
        },
    ],

    getStates() {
        return this.all.filter(entry => !entry.isTerritory);
    },

    getTerritories() {
        return this.all.filter(entry => entry.isTerritory);
    },

    getStatesAndTerritories() {
        return this.all;
    },

    /**
     * @deprecated
     */
    getFullName() {
        return this.all.map(entry => entry.name);
    },

    /**
     * @deprecated
     */
    getAbbreviation() {
        return this.all.map(entry => entry.abbreviation);
    },
};
