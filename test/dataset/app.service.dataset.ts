export const MOVIES_JSON_DATA = [
    {
        year: '1984',
        title: 'Bolero',
        studios: 'Cannon Films',
        producers: 'Bo Derek',
        winner: 'yes',
    },
    {
        year: '1990',
        title: "Ghosts Can't Do It",
        studios: 'Triumph Releasing',
        producers: 'Bo Derek',
        winner: 'yes',
    },
    {
        year: '1991',
        title: 'Hudson Hawk',
        studios: 'TriStar Pictures',
        producers: 'Joel Silver',
        winner: 'yes',
    },
    {
        year: '1992',
        title: 'Shining Through',
        studios: '20th Century Fox',
        producers: 'Carol Baum and Howard Rosenman',
        winner: 'yes',
    },
    {
        year: '1993',
        title: 'Indecent Proposal',
        studios: 'Paramount Pictures',
        producers: 'Sherry Lansing',
        winner: 'yes',
    },
    {
        year: '2019',
        title: 'Cats',
        studios: 'Universal Pictures',
        producers: 'Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper',
        winner: 'yes',
    },
    {
        year: '2021',
        title: 'Cats II',
        studios: 'Universal Pictures',
        producers: 'Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper',
        winner: 'yes',
    },
]

export const EXPECTED_MIN = [
    {
        producer: 'Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper',
        interval: 2,
        previousWin: 2019,
        followingWin: 2021,
    }
];

export const EXPECTED_MAX = [
    {
        producer: 'Bo Derek',
        interval: 6,
        previousWin: 1984,
        followingWin: 1990,
    }
];