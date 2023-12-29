import { uccc } from "./normalized.js";

let Na_w = 0.204;// Classic weights
let Cl_w = 0.194;
let HCO3_w = 0.202;
let EC_w = 0.211;
let SAR_w = 0.189;

export let m_iwqi = [];
for (let i = 0; i < uccc[0].length; i++) {
	m_iwqi.push((Na_w*uccc[0][i])+(Cl_w*uccc[1][i])+(HCO3_w*uccc[2][i])+(EC_w*uccc[3][i])+(SAR_w*uccc[4][i]))
}
console.log(m_iwqi)

let no_Restrict = [];
let low_Restrict = [];
let mod_Restrict = [];
let high_Restrict = [];
let sev_Restrict = [];
let miwqi_ranks = [];
for (let j = 0; j < m_iwqi.length; j++) {
	if (m_iwqi[j]>0 && m_iwqi[j]<=40) {
		sev_Restrict.push(m_iwqi[j]);
		miwqi_ranks.push(5);
	} else if (m_iwqi[j]>40 && m_iwqi[j]<=55) {
		high_Restrict.push(m_iwqi[j]);
		miwqi_ranks.push(4);
	} else if (m_iwqi[j]>55 && m_iwqi[j]<=70) {
		mod_Restrict.push(m_iwqi[j]);
		miwqi_ranks.push(3);
	} else if (m_iwqi[j]>70 && m_iwqi[j]<=85) {
		low_Restrict.push(m_iwqi[j]);
		miwqi_ranks.push(2);
	} else {
		no_Restrict.push(m_iwqi[j]);
		miwqi_ranks.push(1);
	}
}

const resticts = [no_Restrict, low_Restrict, mod_Restrict, high_Restrict, sev_Restrict];
console.log(resticts);
console.log(miwqi_ranks);
export default "miwqi.js";