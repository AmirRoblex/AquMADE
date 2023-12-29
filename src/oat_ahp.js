const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix;
const ahpLite = require('ahp-lite');

let c = [];
export let output1 = ahpLite.getWeights(c);
// console.log(output1.ev);

let ddr = [[1, 1, 1/3, 1/2, 1/4], [1, 1, 1/2, 1/2, 1/4], [3, 2, 1, 1, 1], [2, 2, 1, 1, 1/2], [4, 4, 1, 2, 1]]; //Dr.Rasouli-fard 
let pwm_ahp = [[1, 1, 1/3, 1/2, 1/4], [1, 1, 1/2, 1/2, 1/4], [3, 2, 1, 1, 1], [2, 2, 1, 1, 1/2], [4, 4, 1, 2, 1]];

// console.log(ddr);
// console.dir(ddr);
// console.log(JSON.parse(JSON.stringify(ddr)));
const R = 3; //radius => default is 2
//   index =  0    1    2    3    4    5    6    7   8  9 10 11 12 13 14 15 16
const IOI = [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1/2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// const ddr_copy = JSON.parse(JSON.stringify(ddr));
export let oat_ahp = [];
const p_criteria = ["Na", "Cl", "HCO3", "EC", "SAR"];
const Crit = [["Na", "Cl"], ["Na", "HCO3"], ["Na", "EC"], ["Na", "SAR"], ["Cl", "HCO3"], ["Cl", "EC"], ["Cl", "SAR"], ["HCO3", "EC"], ["HCO3", "SAR"], ["EC", "SAR"]];

for ( let k = 0; k < Crit.length; k++) {
    let first_cr = Crit[k][0];
    let second_cr = Crit[k][1];
    // console.log(JSON.parse(JSON.stringify(ddr)));

    let start = IOI.indexOf(ddr[p_criteria.indexOf(first_cr)][p_criteria.indexOf(second_cr)]) - R;
    let end = IOI.indexOf(ddr[p_criteria.indexOf(first_cr)][p_criteria.indexOf(second_cr)]) + R;
    let range_list = [...Array(end - start + 1).keys()].map(x => x + start);
    // console.log(ddr);
    if (range_list[0] >= 0 && range_list.slice(-1)[0] <= 16) {
        // console.log(0);
    } else if (range_list[0] < 0 && range_list.slice(-1)[0] <= 16) {
        start = 0;
        end = IOI.indexOf(ddr[p_criteria.indexOf(first_cr)][p_criteria.indexOf(second_cr)]) + R;
        range_list = [...Array(end - start + 1).keys()].map(x => x + start);
        // console.log(1);
    } else if (range_list[0] >= 0 && range_list.slice(-1)[0] > 16) {
        start = IOI.indexOf(ddr[p_criteria.indexOf(first_cr)][p_criteria.indexOf(second_cr)]) - R;
        end = 16;
        range_list = [...Array(end - start + 1).keys()].map(x => x + start);
        // console.log(2);
    } else if (range_list[0] < 0 && range_list.slice(-1)[0] > 16) {
        start = 0;
        end = 16;
        range_list = [...Array(end - start + 1).keys()].map(x => x + start);
        // console.log(3);
    }
    // console.log(JSON.parse(JSON.stringify(ddr)));
    let weight_ii = [];
    let ii = [];
    let kk = range_list[0]
    for ( let ij = 0; ij < range_list.length; ij++) {
        // console.log(JSON.parse(JSON.stringify(ddr)));
        ddr[p_criteria.indexOf(first_cr)][p_criteria.indexOf(second_cr)] = IOI[kk];
        ddr[p_criteria.indexOf(second_cr)][p_criteria.indexOf(first_cr)] = 1/IOI[kk];
        ii.push(IOI[kk]);
        c = new Matrix(ddr);
        // console.log(JSON.parse(JSON.stringify(ddr)));
        output1 = ahpLite.getWeights(c);
        c =[];
        weight_ii.push(output1.ev);
        output1=[];
        kk = kk + 1;
    }
    oat_ahp.push([weight_ii]);
    weight_ii = [];
    ii = [];
    ddr = [[1, 1, 1/3, 1/2, 1/4], [1, 1, 1/2, 1/2, 1/4], [3, 2, 1, 1, 1], [2, 2, 1, 1, 1/2], [4, 4, 1, 2, 1]];

};

console.log(oat_ahp); //000 mishe 1/2 na Na Cl

export default 'oat_ahp.js';