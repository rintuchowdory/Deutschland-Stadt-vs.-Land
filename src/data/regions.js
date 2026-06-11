export const regions = [
  { id:"berlin",     name:"Berlin",          type:"city", bundesland:"BE", einwohner:3769000, coords:[52.5200,13.4050], metrics:{ internet:{speed:265,glasfaser:89,coverage5g:98}, oepnv:{busseProTag:820,bahnhöfe:6,letzteAbfahrt:"24h"}, aerzte:{hausaerztePro10k:9.1,facharztePro10k:24.2,kmZuKlinik:0.9}, bildung:{schulen:820,unis:9,bibliotheken:38}, arbeit:{arbeitslos:8.8,avgGehalt:3580,offeneStellen:68000}, wohnen:{mietePro_m2:15.8,kaufPro_m2:6400,avgWohnfläche:63} }},
  { id:"hamburg",    name:"Hamburg",          type:"city", bundesland:"HH", einwohner:1853000, coords:[53.5753,10.0153], metrics:{ internet:{speed:272,glasfaser:91,coverage5g:99}, oepnv:{busseProTag:640,bahnhöfe:5,letzteAbfahrt:"24h"}, aerzte:{hausaerztePro10k:8.8,facharztePro10k:22.1,kmZuKlinik:1.1}, bildung:{schulen:410,unis:7,bibliotheken:24}, arbeit:{arbeitslos:7.2,avgGehalt:3810,offeneStellen:42000}, wohnen:{mietePro_m2:16.2,kaufPro_m2:7100,avgWohnfläche:66} }},
  { id:"muenchen",   name:"München",          type:"city", bundesland:"BY", einwohner:1488000, coords:[48.1374,11.5755], metrics:{ internet:{speed:280,glasfaser:94,coverage5g:99}, oepnv:{busseProTag:710,bahnhöfe:5,letzteAbfahrt:"02:00"}, aerzte:{hausaerztePro10k:9.4,facharztePro10k:26.8,kmZuKlinik:0.7}, bildung:{schulen:370,unis:8,bibliotheken:20}, arbeit:{arbeitslos:4.1,avgGehalt:4280,offeneStellen:58000}, wohnen:{mietePro_m2:22.4,kaufPro_m2:10800,avgWohnfläche:64} }},
  { id:"koeln",      name:"Köln",             type:"city", bundesland:"NRW",einwohner:1084000, coords:[50.9333,6.9500],  metrics:{ internet:{speed:250,glasfaser:92,coverage5g:99}, oepnv:{busseProTag:480,bahnhöfe:4,letzteAbfahrt:"02:00"}, aerzte:{hausaerztePro10k:8.2,facharztePro10k:19.8,kmZuKlinik:1.2}, bildung:{schulen:312,unis:6,bibliotheken:18}, arbeit:{arbeitslos:8.1,avgGehalt:3450,offeneStellen:24800}, wohnen:{mietePro_m2:14.2,kaufPro_m2:5800,avgWohnfläche:68} }},
  { id:"frankfurt",  name:"Frankfurt a.M.",   type:"city", bundesland:"HE", einwohner:773000,  coords:[50.1109,8.6821],  metrics:{ internet:{speed:268,glasfaser:90,coverage5g:99}, oepnv:{busseProTag:520,bahnhöfe:4,letzteAbfahrt:"02:30"}, aerzte:{hausaerztePro10k:8.6,facharztePro10k:21.4,kmZuKlinik:1.0}, bildung:{schulen:198,unis:5,bibliotheken:14}, arbeit:{arbeitslos:6.4,avgGehalt:4120,offeneStellen:36000}, wohnen:{mietePro_m2:17.8,kaufPro_m2:7400,avgWohnfläche:65} }},
  { id:"stuttgart",  name:"Stuttgart",        type:"city", bundesland:"BW", einwohner:635000,  coords:[48.7758,9.1829],  metrics:{ internet:{speed:255,glasfaser:86,coverage5g:98}, oepnv:{busseProTag:420,bahnhöfe:3,letzteAbfahrt:"01:30"}, aerzte:{hausaerztePro10k:8.1,facharztePro10k:18.9,kmZuKlinik:1.4}, bildung:{schulen:168,unis:4,bibliotheken:11}, arbeit:{arbeitslos:4.8,avgGehalt:4010,offeneStellen:28000}, wohnen:{mietePro_m2:16.9,kaufPro_m2:7200,avgWohnfläche:67} }},
  { id:"duesseldorf",name:"Düsseldorf",       type:"city", bundesland:"NRW",einwohner:645000,  coords:[51.2217,6.7762],  metrics:{ internet:{speed:270,glasfaser:95,coverage5g:99}, oepnv:{busseProTag:520,bahnhöfe:5,letzteAbfahrt:"02:30"}, aerzte:{hausaerztePro10k:9.1,facharztePro10k:22.4,kmZuKlinik:0.8}, bildung:{schulen:198,unis:4,bibliotheken:12}, arbeit:{arbeitslos:7.8,avgGehalt:3720,offeneStellen:18400}, wohnen:{mietePro_m2:15.5,kaufPro_m2:6200,avgWohnfläche:65} }},
  { id:"dresden",    name:"Dresden",          type:"city", bundesland:"SN", einwohner:562000,  coords:[51.0504,13.7373], metrics:{ internet:{speed:218,glasfaser:72,coverage5g:92}, oepnv:{busseProTag:320,bahnhöfe:3,letzteAbfahrt:"01:00"}, aerzte:{hausaerztePro10k:7.4,facharztePro10k:16.2,kmZuKlinik:1.8}, bildung:{schulen:142,unis:4,bibliotheken:9}, arbeit:{arbeitslos:6.9,avgGehalt:2940,offeneStellen:12000}, wohnen:{mietePro_m2:11.2,kaufPro_m2:4200,avgWohnfläche:72} }},
  { id:"euskirchen", name:"Kr. Euskirchen",   type:"land", bundesland:"NRW",einwohner:200000,  coords:[50.6590,6.7879],  metrics:{ internet:{speed:52,glasfaser:28,coverage5g:70},  oepnv:{busseProTag:14,bahnhöfe:2,letzteAbfahrt:"20:00"},  aerzte:{hausaerztePro10k:3.8,facharztePro10k:5.1,kmZuKlinik:18.4},  bildung:{schulen:22,unis:0,bibliotheken:3},  arbeit:{arbeitslos:4.2,avgGehalt:2890,offeneStellen:820},  wohnen:{mietePro_m2:7.2,kaufPro_m2:2800,avgWohnfläche:98} }},
  { id:"vulkaneifel",name:"Vulkaneifel",      type:"land", bundesland:"RLP",einwohner:60000,   coords:[50.1520,6.7040],  metrics:{ internet:{speed:38,glasfaser:12,coverage5g:55},  oepnv:{busseProTag:8,bahnhöfe:1,letzteAbfahrt:"18:30"},   aerzte:{hausaerztePro10k:2.9,facharztePro10k:2.8,kmZuKlinik:28.6},  bildung:{schulen:9,unis:0,bibliotheken:1},   arbeit:{arbeitslos:3.8,avgGehalt:2640,offeneStellen:180},  wohnen:{mietePro_m2:6.5,kaufPro_m2:2100,avgWohnfläche:108} }},
  { id:"altmark",    name:"Altmarkkreis",     type:"land", bundesland:"ST", einwohner:83000,   coords:[52.8552,11.1528], metrics:{ internet:{speed:29,glasfaser:8,coverage5g:44},   oepnv:{busseProTag:6,bahnhöfe:1,letzteAbfahrt:"17:30"},   aerzte:{hausaerztePro10k:2.4,facharztePro10k:2.1,kmZuKlinik:34.2},  bildung:{schulen:8,unis:0,bibliotheken:1},   arbeit:{arbeitslos:7.4,avgGehalt:2410,offeneStellen:210},  wohnen:{mietePro_m2:5.8,kaufPro_m2:1600,avgWohnfläche:112} }},
  { id:"wittmund",   name:"Wittmund",         type:"land", bundesland:"NI", einwohner:57000,   coords:[53.5772,7.7762],  metrics:{ internet:{speed:44,glasfaser:18,coverage5g:58},  oepnv:{busseProTag:9,bahnhöfe:1,letzteAbfahrt:"19:00"},   aerzte:{hausaerztePro10k:3.1,facharztePro10k:3.4,kmZuKlinik:22.8},  bildung:{schulen:7,unis:0,bibliotheken:1},   arbeit:{arbeitslos:5.6,avgGehalt:2680,offeneStellen:280},  wohnen:{mietePro_m2:6.9,kaufPro_m2:2200,avgWohnfläche:104} }},
  { id:"uckermark",  name:"Uckermark",        type:"land", bundesland:"BB", einwohner:118000,  coords:[53.1500,13.9833], metrics:{ internet:{speed:34,glasfaser:11,coverage5g:48},  oepnv:{busseProTag:7,bahnhöfe:2,letzteAbfahrt:"18:00"},   aerzte:{hausaerztePro10k:2.6,facharztePro10k:2.3,kmZuKlinik:31.4},  bildung:{schulen:11,unis:0,bibliotheken:2},  arbeit:{arbeitslos:9.2,avgGehalt:2320,offeneStellen:290},  wohnen:{mietePro_m2:5.4,kaufPro_m2:1400,avgWohnfläche:114} }},
  { id:"freyung",    name:"Freyung-Grafenau", type:"land", bundesland:"BY", einwohner:78000,   coords:[48.8108,13.5483], metrics:{ internet:{speed:56,glasfaser:22,coverage5g:62},  oepnv:{busseProTag:10,bahnhöfe:1,letzteAbfahrt:"19:30"},  aerzte:{hausaerztePro10k:3.4,facharztePro10k:4.2,kmZuKlinik:24.6},  bildung:{schulen:12,unis:0,bibliotheken:2},  arbeit:{arbeitslos:2.9,avgGehalt:2780,offeneStellen:420},  wohnen:{mietePro_m2:7.4,kaufPro_m2:2600,avgWohnfläche:102} }},
  { id:"elbe-elster",name:"Elbe-Elster",      type:"land", bundesland:"BB", einwohner:96000,   coords:[51.5386,13.5311], metrics:{ internet:{speed:41,glasfaser:14,coverage5g:51},  oepnv:{busseProTag:8,bahnhöfe:2,letzteAbfahrt:"18:30"},   aerzte:{hausaerztePro10k:2.8,facharztePro10k:2.6,kmZuKlinik:28.1},  bildung:{schulen:10,unis:0,bibliotheken:2},  arbeit:{arbeitslos:8.6,avgGehalt:2380,offeneStellen:240},  wohnen:{mietePro_m2:5.6,kaufPro_m2:1500,avgWohnfläche:110} }},
  { id:"heinsberg",  name:"Kr. Heinsberg",    type:"land", bundesland:"NRW",einwohner:255000,  coords:[51.0631,6.0994],  metrics:{ internet:{speed:75,glasfaser:38,coverage5g:78},  oepnv:{busseProTag:22,bahnhöfe:1,letzteAbfahrt:"21:00"},  aerzte:{hausaerztePro10k:4.9,facharztePro10k:7.2,kmZuKlinik:12.8},  bildung:{schulen:34,unis:0,bibliotheken:4},  arbeit:{arbeitslos:5.1,avgGehalt:2780,offeneStellen:1240}, wohnen:{mietePro_m2:7.8,kaufPro_m2:2950,avgWohnfläche:94} }},
]

const B = {
  speed:{min:20,max:290}, glasfaser:{min:5,max:98}, g5:{min:40,max:100},
  busse:{min:5,max:850},  bhf:{min:0,max:6},
  ha:{min:2,max:10},      fa:{min:2,max:28},  klinik:{min:0.5,max:36},
  schulen:{min:5,max:850},unis:{min:0,max:10},
  gehalt:{min:2200,max:4400}, stellen:{min:100,max:70000},
}
const n=(v,k,inv=false)=>{const r=Math.min(Math.max((v-B[k].min)/(B[k].max-B[k].min),0),1);return inv?1-r:r}

export function calcFairnessScore(region) {
  const m = region.metrics
  const dims = {
    internet: n(m.internet.speed,'speed')*0.4 + n(m.internet.glasfaser,'glasfaser')*0.35 + n(m.internet.coverage5g,'g5')*0.25,
    oepnv:    n(m.oepnv.busseProTag,'busse')*0.7 + n(m.oepnv.bahnhöfe,'bhf')*0.3,
    aerzte:   n(m.aerzte.hausaerztePro10k,'ha')*0.35 + n(m.aerzte.facharztePro10k,'fa')*0.35 + n(m.aerzte.kmZuKlinik,'klinik',true)*0.30,
    bildung:  n(m.bildung.schulen,'schulen')*0.65 + n(m.bildung.unis,'unis')*0.35,
    arbeit:   n(m.arbeit.avgGehalt,'gehalt')*0.55 + n(m.arbeit.offeneStellen,'stellen')*0.45,
    wohnen:   Math.max(1 - (m.wohnen.mietePro_m2 - 5) / 18, 0),
  }
  const w = {internet:0.20,oepnv:0.22,aerzte:0.22,bildung:0.16,arbeit:0.13,wohnen:0.07}
  const total = Math.round(Object.entries(w).reduce((s,[k,wt])=>s+dims[k]*wt,0)*100)
  return { total, dims: Object.fromEntries(Object.entries(dims).map(([k,v])=>[k,Math.round(v*100)])) }
}

export const cityRegions = regions.filter(r=>r.type==='city')
export const landRegions  = regions.filter(r=>r.type==='land')
export const getRegionById = id => regions.find(r=>r.id===id)
