"use client";
import { useState } from "react";
import { Header,Footer,CALENDLY } from "../site-shell";

const careModels=["Private-Pay Home Care","Memory Care / Dementia Care","Residential Care Home","Group Home","Adult Day Care"];
const pains=[
  {id:"inquiry",label:"Urgent inquiries are missed or answered too slowly",system:"Inquiry Response System",detail:"Capture, acknowledge, qualify, and route new inquiries with a clear human handoff."},
  {id:"followup",label:"Families or referral partners stop responding",system:"Persistent Follow-Up System",detail:"Coordinate helpful follow-up, reminders, and staff tasks until the next step is clear."},
  {id:"capacity",label:"We cannot confidently match demand with capacity",system:"Capacity Readiness System",detail:"Surface staffing, bed, placement, or enrollment availability before promises are made."},
  {id:"staffing",label:"Call-outs, recruiting, or staffing gaps create constant fire drills",system:"Staffing Continuity System",detail:"Improve applicant follow-up, call-out escalation, backup coordination, and owner visibility."},
  {id:"visibility",label:"I cannot see where opportunities or tasks are getting lost",system:"Owner Visibility System",detail:"Track sources, status, response, exceptions, and conversion signals in one operating view."},
];
const stages=["Mostly manual and scattered","Some tools, but they do not connect","Automations exist, but they are unreliable"];

export default function Audit(){const[step,setStep]=useState(0);const[model,setModel]=useState("");const[pain,setPain]=useState("");const[stage,setStage]=useState("");const choice=pains.find(x=>x.id===pain);const done=step===3;const selectModel=(v:string)=>{setModel(v);setStep(1)};const selectPain=(v:string)=>{setPain(v);setStep(2)};const selectStage=(v:string)=>{setStage(v);setStep(3)};return <main><Header/><section className="audit-page"><div className="audit-shell"><div className="audit-aside"><p className="kicker">CAREINTAKEAI SYSTEM FINDER</p><h1>Find your clearest automation starting point.</h1><p>Three questions. No contact information. No generic software recommendation.</p><div className="audit-progress" aria-label={`Step ${Math.min(step+1,3)} of 3`}><span style={{width:`${done?100:(step+1)*33.33}%`}}/></div><small>{done?"ASSESSMENT COMPLETE":`QUESTION ${step+1} OF 3`}</small></div><div className="audit-card" aria-live="polite">
{step===0&&<><span>YOUR CARE SETTING</span><h2>Which model do you operate?</h2><div className="audit-options">{careModels.map(v=><button key={v} onClick={()=>selectModel(v)}>{v}<b>→</b></button>)}</div></>}
{step===1&&<><span>YOUR MOST URGENT BOTTLENECK</span><h2>What creates the most pressure right now?</h2><div className="audit-options">{pains.map(v=><button key={v.id} onClick={()=>selectPain(v.id)}>{v.label}<b>→</b></button>)}</div><button className="audit-back" onClick={()=>setStep(0)}>← Back</button></>}
{step===2&&<><span>CURRENT OPERATING STATE</span><h2>How is this handled today?</h2><div className="audit-options">{stages.map(v=><button key={v} onClick={()=>selectStage(v)}>{v}<b>→</b></button>)}</div><button className="audit-back" onClick={()=>setStep(1)}>← Back</button></>}
{done&&choice&&<div className="audit-result"><span>YOUR RECOMMENDED START</span><div className="result-mark">✓</div><h2>{choice.system}</h2><p>{choice.detail}</p><dl><div><dt>Care setting</dt><dd>{model}</dd></div><div><dt>Current state</dt><dd>{stage}</dd></div></dl><p className="audit-note">This is a planning recommendation—not a promise of results or a compliance determination. The audit confirms scope, safeguards, and fit.</p><div className="audit-actions"><a className="button primary" href={CALENDLY} target="_blank" rel="noreferrer">Book a Focused System Audit ↗</a><button onClick={()=>{setStep(0);setModel("");setPain("");setStage("")}}>Start over</button></div></div>}
</div></div></section><Footer/></main>}
