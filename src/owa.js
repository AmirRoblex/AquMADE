import { uccc } from "./normalized.js";
import { ahp_w } from "./ahp_weights.js";
import { fun_simplex } from "./f_simplex.js";
import { max, min, mean, std } from "mathjs";

function rankDuplicate(arr) {
  const sorted = [...new Set(arr)].sort((a, b) => b - a);
  const rank = new Map(sorted.map((x, i) => [x, i + 1]));
  return arr.map((x) => rank.get(x));
}

let sss = [];
let ord_Na = [];
let ord_Cl = [];
let ord_HCO3 = [];
let ord_EC = [];
let ord_SAR = [];

let ord_Ws = [0.3, 0.25, 0.2, 0.15, 0.1];
let simplex_Ws = fun_simplex(1).slice(0, 5);

let def_Ws = 0; //0:uses def weights, 1: uses simplex weights

if (def_Ws == 1){
	ord_Ws=simplex_Ws;
}
console.log(ord_Ws);

for (let i = 0; i < uccc[0].length; i++) {
	sss = [uccc[0][i], uccc[1][i], uccc[2][i], uccc[3][i], uccc[4][i]];
	sss.sort(function(a, b){return b - a});

	if (uccc[0][i] == sss[0]) { //ord weight for Na
		ord_Na.push(ord_Ws[0]);
	} else if (uccc[0][i] == sss[1]) {
		ord_Na.push(ord_Ws[1]);
	} else if (uccc[0][i] == sss[2]) {
		ord_Na.push(ord_Ws[2]);
	} else if (uccc[0][i] == sss[3]) {
		ord_Na.push(ord_Ws[3]);
	} else {
		ord_Na.push(ord_Ws[4]);
	}

	if (uccc[1][i] == sss[0]) {
		ord_Cl.push(ord_Ws[0]);
	} else if (uccc[1][i] == sss[1]) {
		ord_Cl.push(ord_Ws[1]);
	} else if (uccc[1][i] == sss[2]) {
		ord_Cl.push(ord_Ws[2]);
	} else if (uccc[1][i] == sss[3]) {
		ord_Cl.push(ord_Ws[3]);
	} else {
		ord_Cl.push(ord_Ws[4]);
	}

	if (uccc[2][i] == sss[0]) {
		ord_HCO3.push(ord_Ws[0]);
	} else if (uccc[2][i] == sss[1]) {
		ord_HCO3.push(ord_Ws[1]);
	} else if (uccc[2][i] == sss[2]) {
		ord_HCO3.push(ord_Ws[2]);
	} else if (uccc[2][i] == sss[3]) {
		ord_HCO3.push(ord_Ws[3]);
	} else {
		ord_HCO3.push(ord_Ws[4]);
	}

	if (uccc[3][i] == sss[0]) {
		ord_EC.push(ord_Ws[0]);
	} else if (uccc[3][i] == sss[1]) {
		ord_EC.push(ord_Ws[1]);
	} else if (uccc[3][i] == sss[2]) {
		ord_EC.push(ord_Ws[2]);
	} else if (uccc[3][i] == sss[3]) {
		ord_EC.push(ord_Ws[3]);
	} else {
		ord_EC.push(ord_Ws[4]);
	}

	if (uccc[4][i] == sss[0]) {
		ord_SAR.push(ord_Ws[0]);
	} else if (uccc[4][i] == sss[1]) {
		ord_SAR.push(ord_Ws[1]);
	} else if (uccc[4][i] == sss[2]) {
		ord_SAR.push(ord_Ws[2]);
	} else if (uccc[4][i] == sss[3]) {
		ord_SAR.push(ord_Ws[3]);
	} else {
		ord_SAR.push(ord_Ws[4]);
	}

	sss = [];
}

const ords = [ord_Na, ord_Cl, ord_HCO3, ord_EC, ord_SAR];

let u_Na = [];
let u_Cl = [];
let u_HCO3 = [];
let u_EC = [];
let u_SAR = [];

for (let j = 0; j < uccc[0].length; j++) {
	let sig = ((ord_Na[j] * ahp_w[0]) + (ord_Cl[j] * ahp_w[1]) + (ord_HCO3[j] * ahp_w[2]) + (ord_EC[j] * ahp_w[3]) + (ord_SAR[j] * ahp_w[4]));
	u_Na.push((ord_Na[j] * ahp_w[0]) / sig);
	u_Cl.push((ord_Cl[j] * ahp_w[1]) / sig);
	u_HCO3.push((ord_HCO3[j] * ahp_w[2]) / sig);
	u_EC.push((ord_EC[j] * ahp_w[3]) / sig);
	u_SAR.push((ord_SAR[j] * ahp_w[4]) / sig);
}

export let owa_w = [];
for (let k = 0; k < u_Na.length; k++) {
	owa_w.push((u_Na[k] * uccc[0][k]) + (u_Cl[k] * uccc[1][k]) + (u_HCO3[k] * uccc[2][k]) + (u_EC[k] * uccc[3][k]) + (u_SAR[k] * uccc[4][k]));
}

let no_Restrict = [];
let low_Restrict = [];
let mod_Restrict = [];
let high_Restrict = [];
let sev_Restrict = [];

for (let j = 0; j < owa_w.length; j++) {
	if (owa_w[j]>0 && owa_w[j]<=40) {
		sev_Restrict.push(owa_w[j]);
	} else if (owa_w[j]>40 && owa_w[j]<=55) {
		high_Restrict.push(owa_w[j]);
	} else if (owa_w[j]>55 && owa_w[j]<=70) {
		mod_Restrict.push(owa_w[j]);
	} else if (owa_w[j]>70 && owa_w[j]<=85) {
		low_Restrict.push(owa_w[j]);
	} else {
		no_Restrict.push(owa_w[j]);
	}
}

const resticts = [no_Restrict, low_Restrict, mod_Restrict, high_Restrict, sev_Restrict];
console.log(resticts);
console.log(rankDuplicate(owa_w));

console.log(mean(owa_w));
console.log(std(owa_w));

export default "owa.js";