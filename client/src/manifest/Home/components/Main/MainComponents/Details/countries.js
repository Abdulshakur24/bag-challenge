const countries = [
  {
    id: 1,
    name: 'Afghanistan',
    iso3: 'AFG',
  },
  {
    id: 2,
    name: 'South Africa',
    iso3: 'ZAF',
  },
  {
    id: 3,
    name: 'Åland Islands',
    iso3: 'ALA',
  },
  {
    id: 4,
    name: 'Albania',
    iso3: 'ALB',
  },
  {
    id: 5,
    name: 'Algeria',
    iso3: 'DZA',
  },
  {
    id: 6,
    name: 'Germany',
    iso3: 'DEU',
  },
  {
    id: 7,
    name: 'Andorra',
    iso3: 'AND',
  },
  {
    id: 8,
    name: 'Angola',
    iso3: 'AGO',
  },
  {
    id: 9,
    name: 'Anguilla',
    iso3: 'AIA',
  },
  {
    id: 10,
    name: 'Antarctica',
    iso3: 'ATA',
  },
  {
    id: 11,
    name: 'Antigua and Barbuda',
    iso3: 'ATG',
  },
  {
    id: 12,
    name: 'Saudi Arabia',
    iso3: 'SAU',
  },
  {
    id: 13,
    name: 'Argentina',
    iso3: 'ARG',
  },
  {
    id: 14,
    name: 'Armenia',
    iso3: 'ARM',
  },
  {
    id: 15,
    name: 'Aruba',
    iso3: 'ABW',
  },
  {
    id: 16,
    name: 'Australia',
    iso3: 'AUS',
  },
  {
    id: 17,
    name: 'Austria',
    iso3: 'AUT',
  },
  {
    id: 18,
    name: 'Azerbaijan',
    iso3: 'AZE',
  },
  {
    id: 19,
    name: 'Bahamas ',
    iso3: 'BHS',
  },
  {
    id: 20,
    name: 'Bahrain',
    iso3: 'BHR',
  },
  {
    id: 21,
    name: 'Bangladesh',
    iso3: 'BGD',
  },
  {
    id: 22,
    name: 'Barbados',
    iso3: 'BRB',
  },
  {
    id: 23,
    name: 'Belarus',
    iso3: 'BLR',
  },
  {
    id: 24,
    name: 'Belgium',
    iso3: 'BEL',
  },
  {
    id: 25,
    name: 'Belize',
    iso3: 'BLZ',
  },
  {
    id: 26,
    name: 'Benin',
    iso3: 'BEN',
  },
  {
    id: 27,
    name: 'Bermuda',
    iso3: 'BMU',
  },
  {
    id: 28,
    name: 'Bhutan',
    iso3: 'BTN',
  },
  {
    id: 29,
    name: 'Bolivia',
    iso3: 'BOL',
  },
  {
    id: 30,
    name: 'Bonaire, Sint Eustatius and Saba',
    iso3: 'BES',
  },
  {
    id: 31,
    name: 'Bosnia and Herzegovina',
    iso3: 'BIH',
  },
  {
    id: 32,
    name: 'Botswana',
    iso3: 'BWA',
  },
  {
    id: 33,
    name: 'Bouvet Island',
    iso3: 'BVT',
  },
  {
    id: 34,
    name: 'Brazil',
    iso3: 'BRA',
  },
  {
    id: 35,
    name: 'Brunei Darussalam',
    iso3: 'BRN',
  },
  {
    id: 36,
    name: 'Bulgaria',
    iso3: 'BGR',
  },
  {
    id: 37,
    name: 'Burkina Faso',
    iso3: 'BFA',
  },
  {
    id: 38,
    name: 'Burundi',
    iso3: 'BDI',
  },
  {
    id: 39,
    name: 'Cabo Verde',
    iso3: 'CPV',
  },
  {
    id: 40,
    name: 'Cayman Islands',
    iso3: 'CYM',
  },
  {
    id: 41,
    name: 'Cambodia',
    iso3: 'KHM',
  },
  {
    id: 42,
    name: 'Cameroon',
    iso3: 'CMR',
  },
  {
    id: 43,
    name: 'Canada',
    iso3: 'CAN',
  },
  {
    id: 44,
    name: 'Chile',
    iso3: 'CHL',
  },
  {
    id: 45,
    name: 'China',
    iso3: 'CHN',
  },
  {
    id: 46,
    name: 'Christmas Island',
    iso3: 'CXR',
  },
  {
    id: 47,
    name: 'Cyprus',
    iso3: 'CYP',
  },
  {
    id: 48,
    name: 'Cocos (Keeling) Islands',
    iso3: 'CCK',
  },
  {
    id: 49,
    name: 'Colombia',
    iso3: 'COL',
  },
  {
    id: 50,
    name: 'Comoros ',
    iso3: 'COM',
  },
  {
    id: 51,
    name: 'Congo',
    iso3: 'COD',
  },
  {
    id: 52,
    name: 'Congo',
    iso3: 'COG',
  },
  {
    id: 53,
    name: 'Cook Islands',
    iso3: 'COK',
  },
  {
    id: 54,
    name: 'Korea ',
    iso3: 'KOR',
  },
  {
    id: 55,
    name: 'Korea',
    iso3: 'PRK',
  },
  {
    id: 56,
    name: 'Costa Rica',
    iso3: 'CRI',
  },
  {
    id: 57,
    name: "Côte d'Ivoire",
    iso3: 'CIV',
  },
  {
    id: 58,
    name: 'Croatia',
    iso3: 'HRV',
  },
  {
    id: 59,
    name: 'Cuba',
    iso3: 'CUB',
  },
  {
    id: 60,
    name: 'Curaçao',
    iso3: 'CUW',
  },
  {
    id: 61,
    name: 'Denmark',
    iso3: 'DNK',
  },
  {
    id: 62,
    name: 'Djibouti',
    iso3: 'DJI',
  },
  {
    id: 63,
    name: 'Dominican Republic',
    iso3: 'DOM',
  },
  {
    id: 64,
    name: 'Dominica',
    iso3: 'DMA',
  },
  {
    id: 65,
    name: 'Egypt',
    iso3: 'EGY',
  },
  {
    id: 66,
    name: 'El Salvador',
    iso3: 'SLV',
  },
  {
    id: 67,
    name: 'United Arab Emirates',
    iso3: 'ARE',
  },
  {
    id: 68,
    name: 'Ecuador',
    iso3: 'ECU',
  },
  {
    id: 69,
    name: 'Eritrea',
    iso3: 'ERI',
  },
  {
    id: 70,
    name: 'Spain',
    iso3: 'ESP',
  },
  {
    id: 71,
    name: 'Estonia',
    iso3: 'EST',
  },
  {
    id: 72,
    name: 'United States of America',
    iso3: 'USA',
  },
  {
    id: 73,
    name: 'Ethiopia',
    iso3: 'ETH',
  },
  {
    id: 74,
    name: 'Falkland Islands [Malvinas]',
    iso3: 'FLK',
  },
  {
    id: 75,
    name: 'Faroe Islands ',
    iso3: 'FRO',
  },
  {
    id: 76,
    name: 'Fiji',
    iso3: 'FJI',
  },
  {
    id: 77,
    name: 'Finland',
    iso3: 'FIN',
  },
  {
    id: 78,
    name: 'France',
    iso3: 'FRA',
  },
  {
    id: 79,
    name: 'Gabon',
    iso3: 'GAB',
  },
  {
    id: 80,
    name: 'Gambia ',
    iso3: 'GMB',
  },
  {
    id: 81,
    name: 'Georgia',
    iso3: 'GEO',
  },
  {
    id: 82,
    name: 'South Georgia and the South Sandwich Islands',
    iso3: 'SGS',
  },
  {
    id: 83,
    name: 'Ghana',
    iso3: 'GHA',
  },
  {
    id: 84,
    name: 'Gibraltar',
    iso3: 'GIB',
  },
  {
    id: 85,
    name: 'Greece',
    iso3: 'GRC',
  },
  {
    id: 86,
    name: 'Grenada',
    iso3: 'GRD',
  },
  {
    id: 87,
    name: 'Greenland',
    iso3: 'GRL',
  },
  {
    id: 88,
    name: 'Guadeloupe',
    iso3: 'GLP',
  },
  {
    id: 89,
    name: 'Guam',
    iso3: 'GUM',
  },
  {
    id: 90,
    name: 'Guatemala',
    iso3: 'GTM',
  },
  {
    id: 91,
    name: 'Guernsey',
    iso3: 'GGY',
  },
  {
    id: 92,
    name: 'Guinea',
    iso3: 'GIN',
  },
  {
    id: 93,
    name: 'Equatorial Guinea',
    iso3: 'GNQ',
  },
  {
    id: 94,
    name: 'Guinea-Bissau',
    iso3: 'GNB',
  },
  {
    id: 95,
    name: 'Guyana',
    iso3: 'GUY',
  },
  {
    id: 96,
    name: 'French Guiana',
    iso3: 'GUF',
  },
  {
    id: 97,
    name: 'Haiti',
    iso3: 'HTI',
  },
  {
    id: 98,
    name: 'Heard Island and McDonald Islands',
    iso3: 'HMD',
  },
  {
    id: 99,
    name: 'Honduras',
    iso3: 'HND',
  },
  {
    id: 100,
    name: 'Hong Kong',
    iso3: 'HKG',
  },
  {
    id: 101,
    name: 'Hungary',
    iso3: 'HUN',
  },
  {
    id: 102,
    name: 'Isle of Man',
    iso3: 'IMN',
  },
  {
    id: 103,
    name: 'United States Minor Outlying Islands',
    iso3: 'UMI',
  },
  {
    id: 104,
    name: 'India',
    iso3: 'IND',
  },
  {
    id: 105,
    name: 'British Indian Ocean Territory ',
    iso3: 'IOT',
  },
  {
    id: 106,
    name: 'Indonesia',
    iso3: 'IDN',
  },
  {
    id: 107,
    name: 'Iran',
    iso3: 'IRN',
  },
  {
    id: 108,
    name: 'Iraq',
    iso3: 'IRQ',
  },
  {
    id: 109,
    name: 'Ireland',
    iso3: 'IRL',
  },
  {
    id: 110,
    name: 'Iceland',
    iso3: 'ISL',
  },
  {
    id: 111,
    name: 'Israel',
    iso3: 'ISR',
  },
  {
    id: 112,
    name: 'Italy',
    iso3: 'ITA',
  },
  {
    id: 113,
    name: 'Jamaica',
    iso3: 'JAM',
  },
  {
    id: 114,
    name: 'Japan',
    iso3: 'JPN',
  },
  {
    id: 115,
    name: 'Jersey',
    iso3: 'JEY',
  },
  {
    id: 116,
    name: 'Jordan',
    iso3: 'JOR',
  },
  {
    id: 117,
    name: 'Kazakhstan',
    iso3: 'KAZ',
  },
  {
    id: 118,
    name: 'Kenya',
    iso3: 'KEN',
  },
  {
    id: 119,
    name: 'Kyrgyzstan',
    iso3: 'KGZ',
  },
  {
    id: 120,
    name: 'Kiribati',
    iso3: 'KIR',
  },
  {
    id: 121,
    name: 'Kuwait',
    iso3: 'KWT',
  },
  {
    id: 122,
    name: "Lao People's Democratic Republic ",
    iso3: 'LAO',
  },
  {
    id: 123,
    name: 'Lesotho',
    iso3: 'LSO',
  },
  {
    id: 124,
    name: 'Latvia',
    iso3: 'LVA',
  },
  {
    id: 125,
    name: 'Lebanon',
    iso3: 'LBN',
  },
  {
    id: 126,
    name: 'Liberia',
    iso3: 'LBR',
  },
  {
    id: 127,
    name: 'Libya',
    iso3: 'LBY',
  },
  {
    id: 128,
    name: 'Liechtenstein',
    iso3: 'LIE',
  },
  {
    id: 129,
    name: 'Lithuania',
    iso3: 'LTU',
  },
  {
    id: 130,
    name: 'Luxembourg',
    iso3: 'LUX',
  },
  {
    id: 131,
    name: 'Macao',
    iso3: 'MAC',
  },
  {
    id: 132,
    name: 'Macedonia',
    iso3: 'MKD',
  },
  {
    id: 133,
    name: 'Madagascar',
    iso3: 'MDG',
  },
  {
    id: 134,
    name: 'Malaysia',
    iso3: 'MYS',
  },
  {
    id: 135,
    name: 'Malawi',
    iso3: 'MWI',
  },
  {
    id: 136,
    name: 'Maldives',
    iso3: 'MDV',
  },
  {
    id: 137,
    name: 'Mali',
    iso3: 'MLI',
  },
  {
    id: 138,
    name: 'Malta',
    iso3: 'MLT',
  },
  {
    id: 139,
    name: 'Northern Mariana Islands',
    iso3: 'MNP',
  },
  {
    id: 140,
    name: 'Morocco',
    iso3: 'MAR',
  },
  {
    id: 141,
    name: 'Marshall Islands ',
    iso3: 'MHL',
  },
  {
    id: 142,
    name: 'Martinique',
    iso3: 'MTQ',
  },
  {
    id: 143,
    name: 'Mauritius',
    iso3: 'MUS',
  },
  {
    id: 144,
    name: 'Mauritania',
    iso3: 'MRT',
  },
  {
    id: 145,
    name: 'Mayotte',
    iso3: 'MYT',
  },
  {
    id: 146,
    name: 'Mexico',
    iso3: 'MEX',
  },
  {
    id: 147,
    name: 'Micronesia',
    iso3: 'FSM',
  },
  {
    id: 148,
    name: 'Moldova',
    iso3: 'MDA',
  },
  {
    id: 149,
    name: 'Monaco',
    iso3: 'MCO',
  },
  {
    id: 150,
    name: 'Mongolia',
    iso3: 'MNG',
  },
  {
    id: 151,
    name: 'Montenegro',
    iso3: 'MNE',
  },
  {
    id: 152,
    name: 'Montserrat',
    iso3: 'MSR',
  },
  {
    id: 153,
    name: 'Mozambique',
    iso3: 'MOZ',
  },
  {
    id: 154,
    name: 'Myanmar',
    iso3: 'MMR',
  },
  {
    id: 155,
    name: 'Namibia',
    iso3: 'NAM',
  },
  {
    id: 156,
    name: 'Nauru',
    iso3: 'NRU',
  },
  {
    id: 157,
    name: 'Nepal',
    iso3: 'NPL',
  },
  {
    id: 158,
    name: 'Nicaragua',
    iso3: 'NIC',
  },
  {
    id: 159,
    name: 'Niger ',
    iso3: 'NER',
  },
  {
    id: 160,
    name: 'Nigeria',
    iso3: 'NGA',
  },
  {
    id: 161,
    name: 'Niue',
    iso3: 'NIU',
  },
  {
    id: 162,
    name: 'Norfolk Island',
    iso3: 'NFK',
  },
  {
    id: 163,
    name: 'Norway',
    iso3: 'NOR',
  },
  {
    id: 164,
    name: 'New Caledonia',
    iso3: 'NCL',
  },
  {
    id: 165,
    name: 'New Zealand',
    iso3: 'NZL',
  },
  {
    id: 166,
    name: 'Oman',
    iso3: 'OMN',
  },
  {
    id: 167,
    name: 'Uganda',
    iso3: 'UGA',
  },
  {
    id: 168,
    name: 'Uzbekistan',
    iso3: 'UZB',
  },
  {
    id: 169,
    name: 'Pakistan',
    iso3: 'PAK',
  },
  {
    id: 170,
    name: 'Palau',
    iso3: 'PLW',
  },
  {
    id: 171,
    name: 'Palestine',
    iso3: 'PSE',
  },
  {
    id: 172,
    name: 'Panama',
    iso3: 'PAN',
  },
  {
    id: 173,
    name: 'Papua New Guinea',
    iso3: 'PNG',
  },
  {
    id: 174,
    name: 'Paraguay',
    iso3: 'PRY',
  },
  {
    id: 175,
    name: 'Netherlands ',
    iso3: 'NLD',
  },
  {
    id: 176,
    name: 'Peru',
    iso3: 'PER',
  },
  {
    id: 177,
    name: 'Philippines ',
    iso3: 'PHL',
  },
  {
    id: 178,
    name: 'Pitcairn',
    iso3: 'PCN',
  },
  {
    id: 179,
    name: 'Poland',
    iso3: 'POL',
  },
  {
    id: 180,
    name: 'French Polynesia',
    iso3: 'PYF',
  },
  {
    id: 181,
    name: 'Puerto Rico',
    iso3: 'PRI',
  },
  {
    id: 182,
    name: 'Portugal',
    iso3: 'PRT',
  },
  {
    id: 183,
    name: 'Qatar',
    iso3: 'QAT',
  },
  {
    id: 184,
    name: 'Syrian Arab Republic',
    iso3: 'SYR',
  },
  {
    id: 185,
    name: 'Central African Republic ',
    iso3: 'CAF',
  },
  {
    id: 186,
    name: 'Réunion',
    iso3: 'REU',
  },
  {
    id: 187,
    name: 'Romania',
    iso3: 'ROU',
  },
  {
    id: 188,
    name: 'United Kingdom',
    iso3: 'GBR',
  },
  {
    id: 189,
    name: 'Russian Federation',
    iso3: 'RUS',
  },
  {
    id: 190,
    name: 'Rwanda',
    iso3: 'RWA',
  },
  {
    id: 191,
    name: 'Western Sahara*',
    iso3: 'ESH',
  },
  {
    id: 192,
    name: 'Saint Barthélemy',
    iso3: 'BLM',
  },
  {
    id: 193,
    name: 'Saint Kitts and Nevis',
    iso3: 'KNA',
  },
  {
    id: 194,
    name: 'San Marino',
    iso3: 'SMR',
  },
  {
    id: 195,
    name: 'Saint Martin',
    iso3: 'MAF',
  },
  {
    id: 196,
    name: 'Sint Maarten (Dutch part)',
    iso3: 'SXM',
  },
  {
    id: 197,
    name: 'Saint Pierre and Miquelon',
    iso3: 'SPM',
  },
  {
    id: 198,
    name: 'Holy See ',
    iso3: 'VAT',
  },
  {
    id: 199,
    name: 'Saint Vincent and the Grenadines',
    iso3: 'VCT',
  },
  {
    id: 200,
    name: 'Saint Helena',
    iso3: 'SHN',
  },
  {
    id: 201,
    name: 'Saint Lucia',
    iso3: 'LCA',
  },
  {
    id: 202,
    name: 'Solomon Islands',
    iso3: 'SLB',
  },
  {
    id: 203,
    name: 'Samoa',
    iso3: 'WSM',
  },
  {
    id: 204,
    name: 'American Samoa',
    iso3: 'ASM',
  },
  {
    id: 205,
    name: 'Sao Tome and Principe',
    iso3: 'STP',
  },
  {
    id: 206,
    name: 'Senegal',
    iso3: 'SEN',
  },
  {
    id: 207,
    name: 'Serbia',
    iso3: 'SRB',
  },
  {
    id: 208,
    name: 'Seychelles',
    iso3: 'SYC',
  },
  {
    id: 209,
    name: 'Sierra Leone',
    iso3: 'SLE',
  },
  {
    id: 210,
    name: 'Singapore',
    iso3: 'SGP',
  },
  {
    id: 211,
    name: 'Slovakia',
    iso3: 'SVK',
  },
  {
    id: 212,
    name: 'Slovenia',
    iso3: 'SVN',
  },
  {
    id: 213,
    name: 'Somalia',
    iso3: 'SOM',
  },
  {
    id: 214,
    name: 'Sudan ',
    iso3: 'SDN',
  },
  {
    id: 215,
    name: 'South Sudan',
    iso3: 'SSD',
  },
  {
    id: 216,
    name: 'Sri Lanka',
    iso3: 'LKA',
  },
  {
    id: 217,
    name: 'Sweden',
    iso3: 'SWE',
  },
  {
    id: 218,
    name: 'Switzerland',
    iso3: 'CHE',
  },
  {
    id: 219,
    name: 'Suriname',
    iso3: 'SUR',
  },
  {
    id: 220,
    name: 'Svalbard and Jan Mayen',
    iso3: 'SJM',
  },
  {
    id: 221,
    name: 'Swaziland',
    iso3: 'SWZ',
  },
  {
    id: 222,
    name: 'Tajikistan',
    iso3: 'TJK',
  },
  {
    id: 223,
    name: 'Taiwan',
    iso3: 'TWN',
  },
  {
    id: 224,
    name: 'Tanzania',
    iso3: 'TZA',
  },
  {
    id: 225,
    name: 'Chad',
    iso3: 'TCD',
  },
  {
    id: 226,
    name: 'Czechia',
    iso3: 'CZE',
  },
  {
    id: 227,
    name: 'French Southern Territories',
    iso3: 'ATF',
  },
  {
    id: 228,
    name: 'Thailand',
    iso3: 'THA',
  },
  {
    id: 229,
    name: 'Timor-Leste',
    iso3: 'TLS',
  },
  {
    id: 230,
    name: 'Togo',
    iso3: 'TGO',
  },
  {
    id: 231,
    name: 'Tokelau',
    iso3: 'TKL',
  },
  {
    id: 232,
    name: 'Tonga',
    iso3: 'TON',
  },
  {
    id: 233,
    name: 'Trinidad and Tobago',
    iso3: 'TTO',
  },
  {
    id: 234,
    name: 'Tunisia',
    iso3: 'TUN',
  },
  {
    id: 235,
    name: 'Turkmenistan',
    iso3: 'TKM',
  },
  {
    id: 236,
    name: 'Turks and Caicos Islands',
    iso3: 'TCA',
  },
  {
    id: 237,
    name: 'Turkey',
    iso3: 'TUR',
  },
  {
    id: 238,
    name: 'Tuvalu',
    iso3: 'TUV',
  },
  {
    id: 239,
    name: 'Ukraine',
    iso3: 'UKR',
  },
  {
    id: 240,
    name: 'Uruguay',
    iso3: 'URY',
  },
  {
    id: 241,
    name: 'Vanuatu',
    iso3: 'VUT',
  },
  {
    id: 242,
    name: 'Venezuela ',
    iso3: 'VEN',
  },
  {
    id: 243,
    name: 'Virgin Islands (British)',
    iso3: 'VGB',
  },
  {
    id: 244,
    name: 'Virgin Islands (U.S.)',
    iso3: 'VIR',
  },
  {
    id: 245,
    name: 'Viet Nam',
    iso3: 'VNM',
  },
  {
    id: 246,
    name: 'Wallis and Futuna',
    iso3: 'WLF',
  },
  {
    id: 247,
    name: 'Yemen',
    iso3: 'YEM',
  },
  {
    id: 248,
    name: 'Zambia',
    iso3: 'ZMB',
  },
  {
    id: 249,
    name: 'Zimbabwe',
    iso3: 'ZWE',
  },
]

export const getFullNameByISO3 = (iso3Param) =>
  countries.filter(({ iso3 }) => iso3 === iso3Param)[0]
