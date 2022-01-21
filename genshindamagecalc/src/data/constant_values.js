export const constant_values = {
    "pieceFormalNames": [
        "Flower of Life",
        "Plume of Death",
        "Sands of Eon",
        "Goblet of Eonothem",
        "Circlet of Logos"
    ],
    "pieceFormalNamesPlural": [
        "Flowers of Life",
        "Plumes of Death",
        "Sands of Eon",
        "Goblets of Eonothem",
        "Circlets of Logos"
    ],
    "statConv": {
        "hp": 0, 
        "hpPercent": 1, 
        "atk": 2, 
        "atkPercent": 3, 
        "def": 4, 
        "defPercent": 5, 
        "er": 6, 
        "em": 7, 
        "critRate": 8, 
        "critDamage": 9,
        "pyroPercent": 10, 
        "hydroPercent": 11, 
        "dendroPercent": 12, 
        "electroPercent": 13, 
        "anemoPercent": 14, 
        "cryoPercent": 15, 
        "geoPercent": 16, 
        "physPercent": 17, 
        "healingPercent": 18,
        "incomingHealingPercent": 19,
        "cooldownReduction": 20,
        "shieldStrength": 21,
        "pyroRes": 22, 
        "hydroRes": 23, 
        "dendroRes": 24, 
        "electroRes": 25, 
        "anemoRes": 26, 
        "cryoRes": 27, 
        "geoRes": 28,
        "normalDamage": 29,
        "chargedDamage": 30,
        "skillDamage": 31,
        "burstDamage": 32,
        "overloaded": 33,
        "shattered": 34,
        "electrocharged": 35,
        "superconduct": 36,
        "swirl": 37,
        "vaporize": 38,
        "melt": 39,
        "burning": 40
    },
    "statConvFormal": [
        "HP", 
        "HP%", 
        "ATK", 
        "ATK%", 
        "DEF", 
        "DEF%", 
        "Energy Recharge %", 
        "Elemental Mastery",
        "Crit Rate %", 
        "Crit DMG %",
        "Pyro DMG Bonus %", 
        "Hydro DMG Bonus %", 
        "Dendro DMG Bonus %", 
        "Electro DMG Bonus %", 
        "Anemo DMG Bonus %", 
        "Cryo DMG Bonus %", 
        "Geo DMG Bonus %", 
        "Phys DMG Bonus %", 
        "Healing Bonus %",
        "Incoming Healing Bonus",
        "CD Reduction",
        "Shield Strength",
        "Pyro RES", 
        "Hydro RES", 
        "Dendro RES", 
        "Electro RES", 
        "Anemo RES", 
        "Cryo RES", 
        "Geo RES",
        "Normal Attack DMG Bonus",
        "Charged Attack DMG Bonus",
        "Elemental Skill DMG Bonus",
        "Elemental Burst DMG Bonus",
        "Overloaded DMG Bonus",
        "Shattered DMG Bonus",
        "Electrocharged DMG Bonus",
        "Superconduct DMG Bonus",
        "Swirl DMG Bonus",
        "Vaporize DMG Bonus",
        "Melt DMG Bonus",
        "Burning DMG Bonus"
    ],
    "possibleMainStats": [ //flower, plume, sands, goblet, circlet
        [0], 
        [2],
        [1, 3, 5, 6, 7],
        [1, 3, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17],
        [1, 3, 5, 7, 8, 9, 18]
    ],
    /**
     * Formatted like so: 
     *  mainStatScaling[rarity][statConv][level]
     */
    "mainStatScaling": [
        [//1 star
            [129, 178, 227, 275, 324],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [8, 12, 15, 18, 21],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [],
            [3.9, 5.4, 6.9, 8.4, 9.9],
            [3.5, 4.8, 6.1, 7.5, 8.8],
            [13, 17, 22, 27, 32],
            [2.1, 2.9, 3.7, 4.5, 5.3],
            [4.2, 5.8, 7.4, 9.0, 10.5],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.1, 4.3, 5.5, 6.7, 7.9],
            [3.9, 5.4, 6.9, 8.4, 9.9],
            [2.4, 3.3, 4.3, 5.2, 6.1]
        ],
        [//2 star
            [258, 331, 404, 478, 551],
            [4.2, 5.4, 6.6, 7.8, 9],
            [17, 22, 26, 31, 36],
            [4.2, 5.4, 6.6, 7.8, 9],
            [],
            [5.2, 6.7, 8.2, 9.7, 11.2],
            [4.7, 6, 7.3, 8.6, 9.9],
            [17, 22, 26, 31, 36],
            [2.8, 3.6, 4.4, 5.2, 6],
            [5.6, 7.2, 8.8, 10.4, 11.9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [4.2, 5.4, 6.6, 7.8, 9],
            [5.2, 6.7, 8.2, 9.7, 11.2],
            [3.2, 4.1, 5.1, 6, 6.9],
        ],
        [//3 star
            [430, 552, 674, 796, 918, 1040, 1162, 1283, 1405, 1527, 1649, 1771, 1893],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [],
            [6.6, 8.4, 10.3, 12.1, 14.0, 15.8, 17.7, 19.6, 21.4, 23.3, 25.1, 27.0, 28.8],
            [5.8, 7.5, 9.1, 10.8, 12.4, 14.1, 15.7, 17.4, 19.0, 20.7, 22.3, 24.0, 25.6],
            [21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 80, 86, 92],
            [3.5, 4.5, 5.5, 6.5, 7.5, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.4, 15.4],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1],
            [6.6, 8.4, 10.3, 12.1, 14.0, 15.8, 17.7, 19.6, 21.4, 23.3, 25.1, 27.0, 28.8],
            [4.0, 5.2, 6.3, 7.5, 8.6, 9.8, 10.9, 12.0, 13.2, 14.3, 15.5, 16.6, 17.8],
        ],
        [//4 star
            [645, 828, 1011, 1194, 1377, 1559, 1742, 1925, 2108, 2291, 2474, 2657, 2839, 3022, 3205, 3388, 3571],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [42, 54, 66, 78, 90, 102, 113, 125, 137, 149, 161, 173, 185, 197, 209, 221, 232],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [],
            [7.9, 10.1, 12.3, 14.6, 16.8, 19.0, 21.2, 23.5, 25.7, 27.9, 30.2, 32.4, 34.6, 36.8, 39.1, 41.3, 43.5],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7],
            [25, 32, 39, 47, 54, 61, 68, 75, 82, 89, 97, 104, 111, 118, 125, 132, 139],
            [4.2, 5.4, 6.6, 7.8, 9.0, 10.1, 11.3, 12.5, 13.7, 14.9, 16.1, 17.3, 18.5, 19.7, 20.8, 22.0, 23.2],
            [8.4, 10.8, 13.1, 15.5, 17.9, 20.3, 22.7, 25.0, 27.4, 29.8, 32.2, 34.5, 36.9, 39.3, 41.7, 44.1, 46.4],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7, 29.5, 31.3, 33.0, 34.8],
            [7.9, 10.1, 12.3, 14.6, 16.8, 19.0, 21.2, 23.5, 25.7, 27.9, 30.2, 32.4, 34.6, 36.8, 39.1, 41.3, 43.5],
            [4.8, 6.2, 7.6, 9.0, 10.3, 11.7, 13.1, 14.4, 15.8, 17.2, 18.6, 19.9, 21.3, 22.7, 24.0, 25.4, 26.8],
        ],
        [//5 star
            [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [],
            [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
            [7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0, 34.2, 36.4, 38.6, 40.8, 43.0, 45.2, 47.4, 49.6, 51.8],
            [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187],
            [4.7, 6.0, 7.4, 8.7, 10.0, 11.4, 12.7, 14.0, 15.4, 16.7, 18.0, 19.3, 20.7, 22.0, 23.3, 24.7, 26.0, 27.3, 28.7, 30.0, 31.1],
            [9.3, 11.9, 14.6, 17.2, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.8, 38.4, 41.1, 43.7, 46.3, 49.0, 51.6, 54.3, 56.9, 59.6, 62.2],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
            [8.7, 11.2, 13.7, 16.2, 16.2, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
            [5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.2, 23.7, 25.2, 26.7, 28.3, 29.8, 31.3, 32.8, 34.4, 35.9],
        ]
        
    ],
    "substatConv": [ //same order as main stat convention, but truncated to not include elem dmg% and healing%
        "HP", 
        "HP%", 
        "ATK", 
        "ATK%", 
        "DEF", 
        "DEF%", 
        "ER%", 
        "EM", 
        "Crit Rate%", 
        "Crit DMG%"
    ],
    /**
     * Formatted like so: 
     *  substatFlavors[substatConv][rarity][flavor]
     * "substatConv" is in the same order as "substatConv"
     */
    "substatFlavors": [
        [[23.90, 29.88], [50.19, 60.95, 71.70], [100.38, 114.72, 129.06, 143.40], [167.30, 191.20, 215.10, 239.00], [209.13, 239.00, 268.88, 298.75]],
        [[1.17, 1.46], [1.63, 1.98, 2.33], [2.45, 2.80, 3.15, 3.50], [3.26, 3.73, 4.20, 4.66], [4.08, 4.66, 5.25, 5.83]],
        [[1.56, 1.95], [3.27, 3.97, 4.67], [6.54, 7.47, 8.40, 9.34], [10.89, 12.45, 14.00, 15.56], [13.62, 15.56, 17.51, 19.45]],
        [[1.17, 1.46], [1.63, 1.98, 2.33], [2.45, 2.80, 3.15, 3.50], [3.26, 3.73, 4.20, 4.66], [4.08, 4.66, 5.25, 5.83]],
        [[1.85, 2.31], [3.89, 4.72, 5.56], [7.78, 8.89, 10.00, 11.11], [12.96, 14.82, 16.67, 18.52], [16.20, 18.52, 20.83, 23.15]],
        [[1.46, 1.82], [2.04, 2.48, 2.91], [3.06, 3.50, 3.93, 4.37], [4.08, 4.66, 5.25, 5.83], [5.10, 5.83, 6.56, 7.29]],
        [[1.30, 1.62], [1.81, 2.20, 2.59], [2.72, 3.11, 3.50, 3.89], [3.63, 4.14, 4.66, 5.18], [4.53, 5.18, 5.83, 6.48]],
        [[4.66, 5.83], [6.53, 7.93, 9.33], [9.79, 11.19, 12.59, 13.99], [13.06, 14.92, 16.79, 18.56], [16.32, 18.65, 20.98, 23.31]],
        [[0.78, 0.97], [1.09, 1.32, 1.55], [1.63, 1.86, 2.10, 2.33], [2.18, 2.49, 2.80, 3.11], [2.72, 3.11, 3.50, 3.89]],
        [[1.55, 1.94], [2.18, 2.64, 3.11], [3.26, 3.73, 4.20, 4.66], [4.35, 4.97, 5.60, 6.22], [5.44, 6.22, 6.99, 7.77]]
    ],
    "numSubStatFlavors": [2, 3, 4, 4, 4],
    "numSubstatRolls": [1, 1, 4, 4, 4],
    "maxNumSubstatRolls": [[1], [1], [4, 5], [6, 7], [8, 9]],
    /**
     * WEAPON STATS
     */
    "weaponAscensionByRarity": [4, 4, 6, 6, 6],
    "levelByAscension": [20, 40, 50, 60, 70, 80, 90]
}