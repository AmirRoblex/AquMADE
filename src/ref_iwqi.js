// import { uccc } from "./normalized.js";
import { owa_w } from "./owa.js";



let no_Restrict = [];
let low_Restrict = [];
let mod_Restrict = [];
let high_Restrict = [];
let sev_Restrict = [];
for (let j = 0; j < owa_w.length; j++) {
	if (owa_w[j]>0 && owa_w[j]<=40) {
		sev_Restrict.push(owa_w[j])
	} else if (owa_w[j]>40 && owa_w[j]<=55) {
		high_Restrict.push(owa_w[j])
	} else if (owa_w[j]>55 && owa_w[j]<=70) {
		mod_Restrict.push(owa_w[j])
	} else if (owa_w[j]>70 && owa_w[j]<=85) {
		low_Restrict.push(owa_w[j])
	} else {
		no_Restrict.push(owa_w[j])
	}
}

const refinedIWQI = [no_Restrict, low_Restrict, mod_Restrict, high_Restrict, sev_Restrict];
console.log(refinedIWQI)


export default "ref_iwqi.js";