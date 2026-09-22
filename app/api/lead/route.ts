import { NextResponse } from "next/server";

const careSettings=new Set(["Private-Pay Home Care","Memory Care / Dementia Care","Residential Care Home","Group Home","Adult Day Care","Other"]);
const challenges=new Set(["Missed inquiries","Slow follow-up","Staffing coordination","Family communication","Owner visibility","Other"]);
const urgencyOptions=new Set(["Immediately","Within 30 days","Within 90 days","Just exploring"]);
const contactOptions=new Set(["Phone","Email","Text"]);
const clean=(value:unknown,max=200)=>typeof value==="string"?value.trim().slice(0,max):"";

export async function POST(request:Request){
 try{
  const input=await request.json() as Record<string,unknown>;
  if(clean(input.website))return NextResponse.json({ok:true});
  const firstName=clean(input.firstName,80),agencyName=clean(input.agencyName,120),email=clean(input.email,160).toLowerCase(),phone=clean(input.phone,40),careSetting=clean(input.careSetting),primaryChallenge=clean(input.primaryChallenge),urgency=clean(input.urgency),preferredContact=clean(input.preferredContact),notes=clean(input.notes,600);
  if(!firstName||!agencyName||!email||(preferredContact!=="Email"&&!phone)||input.consent!==true||!/^\S+@\S+\.\S+$/.test(email)||!careSettings.has(careSetting)||!challenges.has(primaryChallenge)||!urgencyOptions.has(urgency)||!contactOptions.has(preferredContact))return NextResponse.json({error:"Please complete every required field."},{status:400});
  const webhook=process.env.AIRTABLE_LEAD_WEBHOOK;
  if(!webhook)return NextResponse.json({error:"Lead intake is not configured."},{status:503});
  const submittedAt=new Date().toISOString();
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
  const response=await fetch(webhook,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({summary:{firstName,email,phone,agencyName,careSetting,primaryChallenge,urgency,preferredContact},fields:{fld5EaZFYlhK1TKf7:submittedAt,fldvq2swGsav8dAxK:notes}}),signal:controller.signal});
  clearTimeout(timeout);
  if(!response.ok)return NextResponse.json({error:"Lead delivery failed."},{status:502});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Unable to process request."},{status:400})}
}
