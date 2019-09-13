
// category colors
// in this example, these colors also act as the IDs for each category, as they are the keys that will be used to
// filter out data
export const A = "#2cdb11";
export const B = "#00a6ed";
export const C = "#ffbf00";
export const D = "#dd0f5e";
export const E = "#6eeb83";
export const F = "#1be7ff";
export const G = "#f6511d";

// the data you want to render onto the treemap should be returned from this function
// the formatting of the data is important, see the 'Usage' section for the squarify package:
// https://www.npmjs.com/package/squarify
export function getData() {

    return [{
        name: 'Box', value: 12, color: A,
    }, {
        name: 'Cat', value: 10, color: B,
    }, {
        name: 'Micro', value: 5, color: B,
    }, {
        name: 'Adel', value: 4, color: C,
    }, {
        name: 'Danny', value: 10, color: D,
    }, {
        name: 'Hero', value: 8, color: D,
    }, {
        name: 'Tea', value: 8, color: D,
    }, {
        name: 'Goose', value: 4, color: E,
    }, {
        name: 'Flower', value: 4, color: E,
    }, {
        name: 'Key', value: 8, color: A,
    }, {
        name: 'Sword', value: 10, color: G,
    }, {
        name: 'Plate', value: 1, color: A,
    }, {
        name: 'Dinosaur', value: 1, color: G,
    }, {
        name: 'Charger', value: 2, color: F,
    }, {
        name: 'Corona', value: 4, color: B,
    }, {
        name: 'Hi-tops', value: 5, color: A,
    }];

}
