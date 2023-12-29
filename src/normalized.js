import { max, min } from "mathjs";
// import Aahp from "./aahp.js";
import geoJson from "./final_data_98.json";

export let Na = [];
export let Cl = [];
export let HCO3 = [];
export let EC = [];
export let SAR = [];

for ( let i = 0; i < geoJson.features.length; i++) {
  Na.push(geoJson.features[i].properties.Na);
  Cl.push(geoJson.features[i].properties.Cl);
  HCO3.push(geoJson.features[i].properties.HCO3);
  EC.push(geoJson.features[i].properties.EC);
  SAR.push(geoJson.features[i].properties.SAR);
};
const haha=[Na,Cl,HCO3,EC,SAR];
console.log(JSON.parse(JSON.stringify(haha)));

let uccc_Na = [];
for (let k = 0; k < Na.length; k++) {
  if (Na[k]>=2 && Na[k]<3) {
    uccc_Na.push((100) - (((Na[k]-2)*15) / (1)));
  } else if (Na[k]>=3 && Na[k]<6) {
    uccc_Na.push((85) - (((Na[k]-3)*25) / (3)));
  } else if (Na[k]>=6 && Na[k]<9) {
    uccc_Na.push((60) - (((Na[k]-6)*25) / (3)));
  } else {
    uccc_Na.push((35) - (((Na[k]-2)*35) / (max(Na))));
  }
}

let uccc_Cl = [];
for (let k = 0; k < Cl.length; k++) {
  if (Cl[k]>=1 && Cl[k]<4) {
    uccc_Cl.push((100) - (((Cl[k]-1)*15) / (3)));
  } else if (Cl[k]>=4 && Cl[k]<7) {
    uccc_Cl.push((85) - (((Cl[k]-4)*25) / (3)));
  } else if (Cl[k]>=7 && Cl[k]<10) {
    uccc_Cl.push((60) - (((Cl[k]-7)*25) / (3)));
  } else {
    uccc_Cl.push((35) - (((Cl[k]-1)*35) / (max(Cl))));
  }
}

let uccc_HCO3 = [];
for (let k = 0; k < HCO3.length; k++) {
  if (HCO3[k]>=1 && HCO3[k]<1.5) {
    uccc_HCO3.push((100) - (((HCO3[k]-1)*15) / (0.5)));
  } else if (HCO3[k]>=1.5 && HCO3[k]<4.5) {
    uccc_HCO3.push((85) - (((HCO3[k]-1.5)*25) / (3)));
  } else if (HCO3[k]>=4.5 && HCO3[k]<8.5) {
    uccc_HCO3.push((60) - (((HCO3[k]-4.5)*25) / (4)));
  } else {
    uccc_HCO3.push((35) - (((HCO3[k]-1)*35) / (max(HCO3))));
  }
}

let uccc_EC = []; //dS/m
for (let k = 0; k < EC.length; k++) {
  if (EC[k]>=0.2 && EC[k]<0.75) {
    uccc_EC.push((100) - (((EC[k]-0.2)*15) / (0.55)));
  } else if (EC[k]>=0.75 && EC[k]<1.5) {
    uccc_EC.push((85) - (((EC[k]-0.75)*25) / (0.75)));
  } else if (EC[k]>=1.5 && EC[k]<3) {
    uccc_EC.push((60) - (((EC[k]-1.5)*25) / (1.5)));
  } else {
    uccc_EC.push((35) - (((EC[k]-0.2)*35) / (max(EC))));
  }
}

let uccc_SAR = [];
for (let k = 0; k < SAR.length; k++) {
  if (SAR[k]>=2 && SAR[k]<3) {
    uccc_SAR.push((100) - (((SAR[k]-2)*15) / (1)));
  } else if (SAR[k]>=3 && SAR[k]<6) {
    uccc_SAR.push((85) - (((SAR[k]-3)*25) / (3)));
  } else if (SAR[k]>=6 && SAR[k]<12) {
    uccc_SAR.push((60) - (((SAR[k]-6)*25) / (6)));
  } else {
    uccc_SAR.push((35) - (((SAR[k]-2)*35) / (max(SAR))));
  }
}

export const uccc = [uccc_Na, uccc_Cl, uccc_HCO3, uccc_EC, uccc_SAR];
console.log(uccc);
console.log([max(uccc[0]), max(uccc[1]), max(uccc[2]), max(uccc[3]), max(uccc[4])]);

export default 'normalized.js';