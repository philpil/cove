import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { freshState } from '../dist/rules.js';
const source=readFileSync(new URL('../dist/game.js',import.meta.url),'utf8');
const resetSource=source.slice(source.indexOf('function reset(){'),source.indexOf("\n$('reset').onclick="));
for(const previous of ['win','storm','health','midgame'])test(`restart after ${previous} resets the live world and persisted save`,()=>{
  const elements=new Map();
  const element=id=>{if(!elements.has(id))elements.set(id,{style:{},classList:{add(){},remove(){}}});return elements.get(id);};
  let persisted,resumed=false,synced=false;
  const c={state:{...freshState(),stage:3,wood:90,cut:[1,2],time:previous==='storm'?480:220,health:previous==='health'?0:24,won:previous==='win'},freshState,
    paused:false,started:true,ended:previous!=='midgame',keys:{w:true},target:3,chop:1,lastTree:2,saveClock:2,hitCD:1,campCD:10,toastTimer:3,elapsed:180,
    trees:[{g:{rotation:{z:.1}}}],player:{visible:false,rotation:{y:2},position:{}},axe:{rotation:{x:1}},legs:[{rotation:{x:1}}],body:{position:{y:1}},ring:{position:{}},
    $:element,document:{querySelector:()=>element('section')},helpHTML:'fresh welcome markup',endJoy(){},
    syncWorld(){synced=true;c.player.position={x:c.state.x,z:c.state.z};},
    save(){c.state.x=c.player.position.x;c.state.z=c.player.position.z;persisted=structuredClone(c.state);},
    hud(){},resume(){resumed=true;c.started=true;c.paused=false;},toast(){}};
  vm.runInNewContext(resetSource+'\nreset();',c);
  assert.deepEqual(c.state,freshState());assert.deepEqual(persisted,freshState());
  assert.equal(synced,true);assert.equal(resumed,true);assert.equal(c.ended,false);assert.equal(c.player.visible,true);assert.equal(c.campCD,0);assert.equal(c.hitCD,0);
  assert.equal(typeof element('reset').onclick,'function');
  // A subsequent visibility/pagehide save must still persist the NEW run.
  c.save();assert.deepEqual(persisted,freshState());
  element('reset').onclick();assert.deepEqual(persisted,freshState());
});
test('both restart entry points use reset without native dialogs or reload',()=>{
  assert.match(source,/\$\('again'\)\.onclick=reset/);
  assert.match(source,/\$\('reset'\)\.onclick=reset/);
  assert.doesNotMatch(source,/location\.reload|confirm\(/);
});
