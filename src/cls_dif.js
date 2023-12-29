import { oat_ahp } from "./oat_ahp.js";
import { uccc } from "./normalized.js";
import { sum, pow } from "mathjs";
import { m_iwqi } from "./miwqi.js";


function rankDuplicate(arr) {
  const sorted = [...new Set(arr)].sort((a, b) => b - a);
  const rank = new Map(sorted.map((x, i) => [x, i + 1]));
  return arr.map((x) => rank.get(x));
}

let refer_iwqi = [];
for (let i = 0; i < uccc[0].length; i++) {
	refer_iwqi.push((oat_ahp[0][0][3][0]*uccc[0][i])+(oat_ahp[0][0][3][1]*uccc[1][i])+(oat_ahp[0][0][3][2]*uccc[2][i])+(oat_ahp[0][0][3][3]*uccc[3][i])+(oat_ahp[0][0][3][4]*uccc[4][i]))
}

console.log(refer_iwqi);
const base_rank = rankDuplicate(refer_iwqi);
console.log(base_rank);

let oatIWQI1 = [];
let oatIWQI2 = [];
let oatIWQI3 = [];
let oatIWQI4 = [];
let oatIWQI5 = [];
let oatIWQI6 = [];
let oatIWQI7 = [];
let oat_rank = [];
let iwqi_oat = [];
// console.log(oat_ahp[9][0][2][2]-oat_ahp[0][0][2][2]);
for (let h = 0; h < oat_ahp.length; h++) {
	for (let i = 0; i < uccc[0].length; i++) { //[0][0][0][0] for Na-Cl,0,weight-2, Na-weight
		oatIWQI1.push((oat_ahp[h][0][0][0]*uccc[0][i])+(oat_ahp[h][0][0][1]*uccc[1][i])+(oat_ahp[h][0][0][2]*uccc[2][i])+(oat_ahp[h][0][0][3]*uccc[3][i])+(oat_ahp[h][0][0][4]*uccc[4][i]));
		oatIWQI2.push((oat_ahp[h][0][1][0]*uccc[0][i])+(oat_ahp[h][0][1][1]*uccc[1][i])+(oat_ahp[h][0][1][2]*uccc[2][i])+(oat_ahp[h][0][1][3]*uccc[3][i])+(oat_ahp[h][0][1][4]*uccc[4][i]));
		oatIWQI3.push((oat_ahp[h][0][2][0]*uccc[0][i])+(oat_ahp[h][0][2][1]*uccc[1][i])+(oat_ahp[h][0][2][2]*uccc[2][i])+(oat_ahp[h][0][2][3]*uccc[3][i])+(oat_ahp[h][0][2][4]*uccc[4][i]));
		oatIWQI4.push((oat_ahp[h][0][3][0]*uccc[0][i])+(oat_ahp[h][0][3][1]*uccc[1][i])+(oat_ahp[h][0][3][2]*uccc[2][i])+(oat_ahp[h][0][3][3]*uccc[3][i])+(oat_ahp[h][0][3][4]*uccc[4][i]));
		oatIWQI5.push((oat_ahp[h][0][4][0]*uccc[0][i])+(oat_ahp[h][0][4][1]*uccc[1][i])+(oat_ahp[h][0][4][2]*uccc[2][i])+(oat_ahp[h][0][4][3]*uccc[3][i])+(oat_ahp[h][0][4][4]*uccc[4][i]));
		oatIWQI6.push((oat_ahp[h][0][5][0]*uccc[0][i])+(oat_ahp[h][0][5][1]*uccc[1][i])+(oat_ahp[h][0][5][2]*uccc[2][i])+(oat_ahp[h][0][5][3]*uccc[3][i])+(oat_ahp[h][0][5][4]*uccc[4][i]));
		oatIWQI7.push((oat_ahp[h][0][6][0]*uccc[0][i])+(oat_ahp[h][0][6][1]*uccc[1][i])+(oat_ahp[h][0][6][2]*uccc[2][i])+(oat_ahp[h][0][6][3]*uccc[3][i])+(oat_ahp[h][0][6][4]*uccc[4][i]));
	}
	oat_rank.push([rankDuplicate(oatIWQI1),rankDuplicate(oatIWQI2),rankDuplicate(oatIWQI3),rankDuplicate(oatIWQI4),rankDuplicate(oatIWQI5),rankDuplicate(oatIWQI6),rankDuplicate(oatIWQI7)]);
	iwqi_oat.push([(oatIWQI1),(oatIWQI2),(oatIWQI3),(oatIWQI4),(oatIWQI5),(oatIWQI6),(oatIWQI7)]);
	oatIWQI1 = [];
	oatIWQI2 = [];
	oatIWQI3 = [];
	oatIWQI4 = [];
	oatIWQI5 = [];
	oatIWQI6 = [];
	oatIWQI7 = [];
}
console.log(iwqi_oat[0][0]);


let no_Restrict = [];
let low_Restrict = [];
let mod_Restrict = [];
let high_Restrict = [];
let sev_Restrict = [];
for (let j = 0; j < iwqi_oat[0][0].length; j++) {
	if (iwqi_oat[0][0][j]>0 && iwqi_oat[0][0][j]<=40) {
		sev_Restrict.push(iwqi_oat[0][0][j])
	} else if (iwqi_oat[0][0][j]>40 && iwqi_oat[0][0][j]<=55) {
		high_Restrict.push(iwqi_oat[0][0][j])
	} else if (iwqi_oat[0][0][j]>55 && iwqi_oat[0][0][j]<=70) {
		mod_Restrict.push(iwqi_oat[0][0][j])
	} else if (iwqi_oat[0][0][j]>70 && iwqi_oat[0][0][j]<=85) {
		low_Restrict.push(iwqi_oat[0][0][j])
	} else {
		no_Restrict.push(iwqi_oat[0][0][j])
	}
}

const resticts = [no_Restrict, low_Restrict, mod_Restrict, high_Restrict, sev_Restrict];
console.log(resticts);



console.log(oat_rank);

let sig1 = [];
let sig2 = [];
let sig3 = [];
let sig4 = [];
let sig5 = [];
let sig6 = [];
let sig7 = [];
let sig = [];

for (let f = 0; f < oat_rank.length; f++) {
	for (let j = 0; j < uccc[0].length; j++) {
		sig1.push(pow((oat_rank[f][0][j]-base_rank[j]),2));
		sig2.push(pow((oat_rank[f][1][j]-base_rank[j]),2));
		sig3.push(pow((oat_rank[f][2][j]-base_rank[j]),2));
		sig4.push(pow((oat_rank[f][3][j]-base_rank[j]),2));
		sig5.push(pow((oat_rank[f][4][j]-base_rank[j]),2));
		sig6.push(pow((oat_rank[f][5][j]-base_rank[j]),2));
		sig7.push(pow((oat_rank[f][6][j]-base_rank[j]),2));
	}
	sig.push([sig1, sig2, sig3, sig4, sig5, sig6, sig7]);
	sig1 = [];
	sig2 = [];
	sig3 = [];
	sig4 = [];
	sig5 = [];
	sig6 = [];
	sig7 = [];
}
console.log((sig));
console.log(sum(sig[0][0]));
const N = uccc[0].length;

let r1 = [];
let r2 = [];
let r3 = [];
let r4 = [];//0
let r5 = [];
let r6 = [];
let r7 = [];
export let spearsman = [];

for (let i = 0; i < sig.length; i++) {
	r1 = 1-((6*sum(sig[i][0]))/(N*(pow(N,2))));
	r2 = 1-((6*sum(sig[i][1]))/(N*(pow(N,2))));
	r3 = 1-((6*sum(sig[i][2]))/(N*(pow(N,2))));//0
	r4 = 1-((6*sum(sig[i][3]))/(N*(pow(N,2))));
	r5 = 1-((6*sum(sig[i][4]))/(N*(pow(N,2))));
	r6 = 1-((6*sum(sig[i][5]))/(N*(pow(N,2))));
	r7 = 1-((6*sum(sig[i][6]))/(N*(pow(N,2))));

	spearsman.push([r1,r2,r3,r4,r5,r6,r7]);
	r1 = [];
	r2 = [];
	r3 = [];
	r4 = [];//0
	r5 = [];
	r6 = [];
	r7 = [];
}
console.log(spearsman);
export default "cls_dif.js";