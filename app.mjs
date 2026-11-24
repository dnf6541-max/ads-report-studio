import {STATUS,SEVERITY,SCENARIOS,CAR,VRU,COUNTERPART,MOVEMENT,DRIVER,LIGHTING,value,pct,parseCSV,selectFields,sha256,buildModel,filtered,countBy,aggregate,contactCounts,movementGroup,sample,audit,csvExport} from './analysis.mjs';
import {surfaceSummary,transitionSummary,timingEvidence,figureCatalog,figureDataRows,extraAudit} from './supplement.mjs';
import {buildPptx} from './export-pptx.mjs';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=n=>Number(n).toLocaleString('ko-KR');
const COLORS=['#148b82','#277eae','#5aaac8','#d58a3b','#83949e','#b3c1c8'];
const SEVCOL={none:'#148b82',minor:'#358ebc',moderate:'#df9f44',serious:'#cb6a40',fatal:'#ad4357',unknown:'#b4bfc8'};
const NAV=[['overview','01','사고유형·발생환경'],['cases','02','중상·사망 사례'],['status','03','ADS 운행상태'],['vru','04','취약도로이용자'],['domestic','05','국내 사고현황'],['audit','✓','검산·표본 검토'],['records','↗','사고별 원문'],['data','＋','데이터·분석 기준']];
const state={tab:'overview',filter:{from:'',to:'',company:''},query:'',scope:'impact',page:1,seed:20261124,full:false,pkg:null,model:null,sources:null,busy:false,figureId:''};
let resizeObserver,figureObserver,noticeTimer;
const notify=(msg)=>{const el=$('#notice');el.textContent=msg;el.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el.classList.remove('show'),5500);};
const selected=()=>filtered(state.model.impact,state.filter);
const selectedADS=()=>filtered(state.model.ads,state.filter);
const checksForSelection=()=>[...audit(state.model,selected()),...extraAudit(state.model,selected(),selectedADS())];
const selectionLabel=()=>`${state.filter.from||state.filter.to?`${state.filter.from||'자료 시작'} ~ ${state.filter.to||'자료 종료'}`:'전체 기간'} · ${state.filter.company||'전체 보고 회사'}`;
const periodLabel=rows=>{const m=rows.map(r=>r.month).filter(Boolean).sort();return m.length?`${m[0]} ~ ${m.at(-1)}`:'해당 기간 자료 없음';};
const exportName=(kind)=>`ADS_${kind}_${state.filter.company?state.filter.company.replace(/[^a-zA-Z0-9가-힣]/g,'_')+'_':''}${new Date().toISOString().slice(0,10)}`;
const link=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
const NHTSA='https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting';

async function init(){
  try{
    if(!globalThis.DecompressionStream)throw new Error('데이터 압축 해제를 지원하는 최신 Chrome, Edge, Safari 또는 Firefox를 사용하세요.');
    // Text-encoded gzip is byte-identical to the source package, and can also
    // be committed through GitHub's browser editor without a binary uploader.
    const {default:encoded}=await import('./data-base64.mjs');
    const packed=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    state.pkg=await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
    state.sources=state.pkg.sources;state.model=await buildModel(state.pkg);render();
  }catch(error){$('#app').innerHTML=`<main class="loading"><h1>데이터를 불러오지 못했습니다</h1><p>${esc(error.message)}</p><button id="reload">다시 시도</button><p>파일을 직접 여는 대신 GitHub Pages 또는 로컬 HTTP 서버에서 실행해 주세요.</p></main>`;$('#reload').onclick=()=>location.reload();}
}

function render(){
  const rows=selected(),ads=selectedADS(),pending=filtered(state.model.pending,state.filter),checks=checksForSelection(),failed=checks.filter(c=>!c.ok).length;
  const companies=[...new Set([...state.model.ads,...state.model.pending].map(r=>r.company))].filter(Boolean).sort();
  const active=NAV.find(n=>n[0]===state.tab);
  $('#app').innerHTML=`
    <aside class="sidebar"><div class="brand"><div class="brandmark">A</div><div><strong>ADS 리포트</strong><small>REPORT STUDIO</small></div></div><div class="nav-label">ANALYSIS REPORTS</div><nav class="nav" aria-label="분석 페이지">${NAV.slice(0,5).map(navButton).join('')}</nav><div class="nav-label">DATA & VERIFICATION</div><nav class="nav" aria-label="데이터와 검증">${NAV.slice(5).map(navButton).join('')}</nav><div class="sidebar-bottom"><span class="dot"></span>브라우저에서 직접 계산<br>SGO ADS · 독립형 리포트<br>자료 스냅샷 ${esc(state.pkg.sourceSnapshot)}${link(NHTSA,'NHTSA 원자료 안내 ↗')}</div></aside>
    <main class="workspace" id="workspace"><header class="topbar"><div><div class="eyebrow">EVIDENCE BEFORE INSIGHT</div><h1>ADS 사고분석 리포트 스튜디오</h1><p>사고 집계에서 실제 경위까지, 같은 근거로 확인합니다.</p></div><div class="top-actions"><button data-action="data">CSV 업데이트</button><button data-action="csv">분석대상 CSV</button><button data-action="pdf-all">5페이지 PDF</button><button class="primary" data-action="pptx-all">5페이지 PPTX</button></div></header>
    <form class="filter-panel" id="filters"><label>발생월 · 시작<input type="month" name="from" aria-label="발생월 시작" value="${esc(state.filter.from)}"></label><label>발생월 · 종료<input type="month" name="to" aria-label="발생월 종료" value="${esc(state.filter.to)}"></label><label>보고 회사<select name="company" aria-label="보고 회사"><option value="">전체 보고 회사</option>${companies.map(c=>`<option value="${esc(c)}" ${state.filter.company===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label><button type="submit">적용</button><button type="button" class="ghost" data-action="reset-filter">초기화</button><div class="filter-note">미국 분석: 사고·차량 보고 기준<br>국내 공식 통계는 별도 집계</div></form>
    <section class="kpis" aria-label="선택 범위 요약"><article class="kpi"><div class="kpi-label">사고 당시 ADS 운행 확인</div><strong>${num(rows.length)}<small>건</small></strong><p>${esc(periodLabel(rows))}</p></article><article class="kpi"><div class="kpi-label">운행상태 비교 대상</div><strong>${num(ads.length)}<small>건</small></strong><p>ADS 시스템으로 보고된 검수 대상</p></article><article class="kpi"><div class="kpi-label">중상·사망 보고</div><strong>${num(rows.filter(r=>['serious','fatal'].includes(r.severity)).length)}<small>건</small></strong><p>최고 피해수준 · Serious / Fatality</p></article><article class="kpi"><div class="kpi-label">검산 / 재검토 필요</div><strong>${failed?'확인 필요':'통과'}<small>/ ${num(pending.length)}건</small></strong><p>합계·기준 건수·검수 연결 대조</p></article></section>
    ${state.model.pending.length?`<div class="warning-banner">새로 추가되거나 변경된 최신 보고 ${num(state.model.pending.length)}건은 재검토 대상입니다. 현재 분석 수치는 검수 결과와 원문이 일치하는 사고만 포함합니다. <button class="text-button" data-action="pending">재검토 대상 확인 →</button></div>`:''}
    <div class="panel-heading"><div><h2>${esc(active[2])}</h2><p>${state.tab==='domestic'?'한국교통안전공단 공식 발표 · 2025년 9월까지의 별도 통계':esc(selectionLabel())}</p></div><div class="panel-actions">${['overview','cases','status','vru','domestic'].includes(state.tab)?`<span class="badge">${state.tab==='domestic'?'공식 발표 스냅샷':'실제 데이터 · 검수 연계'}</span><button data-action="zoom">${state.full?'화면에 맞춤':'원본 크기'}</button><button data-action="png-one">페이지 PNG</button><button data-action="pptx-one">페이지 PPTX</button><button data-action="pdf-one">페이지 PDF</button>`:''}</div></div>
    <div id="content">${renderContent()}</div><footer class="app-footer">Automated Driving System (ADS): 자율주행시스템. 구성비는 보고된 사고의 분포이며 사고율·법적 과실·대책 효과를 뜻하지 않습니다.<br>기존 대시보드와 분리된 독립 앱 · 수치는 선택한 파일·검수표·필터에 따라 다시 계산됩니다.</footer></main>`;
  bind();fitSlide();fitFigure();
}
function navButton([id,n,label]){return `<button data-tab="${id}" class="${state.tab===id?'active':''}" ${state.tab===id?'aria-current="page"':''}><span class="nav-num">${n}</span>${label}</button>`;}
function renderContent(){
  if(state.tab==='audit')return auditPage();
  if(state.tab==='records')return recordsPage();
  if(state.tab==='data')return dataPage();
  return `<div class="report-stage ${state.full?'full':''}"><div class="slide-shell">${report(state.tab)}</div></div>${figurePanel(state.tab)}${support(state.tab)}`;
}
function slide(title,subtitle,chip,body,page,foot=''){
  return `<article class="slide" aria-label="${esc(title)}"><header class="slide-header"><div><h2>${title}</h2><p class="slide-subtitle">${subtitle}</p></div><span class="slide-chip">${chip}</span></header><div class="slide-body">${body}</div><footer class="slide-footer"><div>${foot||`자료: NHTSA SGO ADS 제공 CSV 2개 · 최신 보고·중복 연결 및 사고 당시 작동상태 검수 기준.<br>범위: ${esc(selectionLabel())} · 차량별 사고보고 기준. 구성비로 사고위험·법적 과실을 판단하지 않음.`}</div><span class="page-no">${page}</span></footer></article>`;
}
function section(n,title,note=''){return `<div class="section-title"><span>${n}</span>${title}${note?`<small>${note}</small>`:''}</div>`;}
function bars(items,denominator,{compact=false,scale='count',colors=COLORS}={}){
  const max=scale==='percent'?denominator:Math.max(...items.map(x=>x.count),1);
  return `<div class="hbars ${compact?'compact':''}">${items.map((x,i)=>`<div class="hbar"><div class="hbar-label">${esc(x.label??x.key)}</div><div class="track"><div class="fill" style="width:${max?Math.min(100,100*x.count/max):0}%;background:${x.color||colors[i%colors.length]}"></div></div><div class="hbar-value"><b>${num(x.count)}</b>건${denominator!=null?`<em>${pct(x.count,denominator)}%</em>`:''}</div></div>`).join('')}</div>`;
}
function stack(items,total,{legend=true}={}){
  return `<div class="stackbar">${items.filter(x=>x.count).map((x,i)=>`<div class="stackseg" style="width:${total?100*x.count/total:0}%;background:${x.color||COLORS[i%COLORS.length]}" title="${esc(x.label||x.key)} ${num(x.count)}건 (${pct(x.count,total)}%)">${total&&x.count/total>=.085?pct(x.count,total)+'%':''}</div>`).join('')}</div>${legend?`<div class="legend">${items.map((x,i)=>`<span><i style="background:${x.color||COLORS[i%COLORS.length]}"></i>${esc(x.label||x.key)} ${num(x.count)}</span>`).join('')}</div>`:''}`;
}
function insights(title,items,bottom){return `<aside class="insights"><div><div class="micro">PATTERNS & CONTEXT</div><h3>${title}</h3></div>${items.map(([title,text],i)=>`<div class="insight-item"><h4><span>${String(i+1).padStart(2,'0')}</span>${title}</h4><p>${text}</p></div>`).join('')}<div class="insight-bottom">${bottom}</div></aside>`;}
function empty(){return `<div class="empty-report"><h3>선택 범위에 확인된 사고가 없습니다</h3><p>기간·회사를 변경하거나 재검토 대상의 근거를 확인해 주세요.<br>자료가 없을 때 예시 수치를 채워 넣지 않습니다.</p></div>`;}
function report(tab){const rows=selected();if(tab==='domestic')return domesticReport();if(tab==='status')return statusReport();if(!rows.length)return slide(NAV.find(x=>x[0]===tab)[2],'선택 범위의 실자료 분석','N = 0',empty(),String(NAV.findIndex(x=>x[0]===tab)+1).padStart(2,'0'));return tab==='overview'?overviewReport(rows):tab==='cases'?casesReport(rows):vruReport(rows);}

function overviewReport(rows){
  const a=aggregate(rows),car=a.cars.length,n=rows.length;
  const rear=a.scenarios.filter(x=>['01','02'].includes(x.key)).reduce((n,x)=>n+x.count,0);
  const mainTypes=[{label:'정지·직진·감속 후미추돌',count:rear},...['03','04','05'].map(k=>({...a.scenarios.find(x=>x.key===k),label:SCENARIOS[k]}))];
  mainTypes.push({label:'나머지 자동차 사고 유형',count:car-mainTypes.reduce((n,x)=>n+x.count,0),color:'#a7b7c0'});
  const intersection=rows.filter(r=>r.roadway==='Intersection').length;
  const time=a.time.map(x=>({...x,label:({day:'주간',night:'야간',unknown:'시간 불명'})[x.key],color:({day:'#148b82',night:'#267db0',unknown:'#b4bfc8'})[x.key]}));
  const lightN=a.lighting.reduce((n,x)=>n+x.count,0);
  const surface=surfaceSummary(rows);
  const light=a.lighting.map(x=>({...x,label:LIGHTING[x.key],color:({Daylight:'#64b5a3','Dark - Lighted':'#287ea8','Dawn / Dusk':'#d6a655','Dark - Not Lighted':'#29465e'})[x.key]||'#a9bbc3'}));
  const body=`<div class="report-columns"><div class="report-main overview-main">${section('01','충돌대상별 사고 구성',`전체 ${num(n)}건`)}${bars(a.counterparts,n)}<div class="split-bottom"><section>${section('02','자동차 상대 대표 상황')} ${bars(mainTypes,car,{compact:true})}<p class="small-note">분모: 자동차 상대 ${num(car)}건. 두 후미추돌 유형을 합산.<br>세부 8유형·연도별 집계는 아래 상세표에서 확인.</p></section><section>${section('03','발생환경')}<div class="stack-label"><b>장소</b><span>전체 ${num(n)}건</span></div>${stack([{label:'교차로',count:intersection},{label:'그 외 도로·불명',count:n-intersection}],n)}<div class="stack-label"><b>주·야간</b><span>신고 시각 기준</span></div>${stack(time,n)}<div class="stack-label"><b>조명 상태</b><span>기재 ${num(lightN)}건만</span></div>${stack(light,lightN)}<div class="stack-label"><b>노면 상태</b><span>기재 ${num(surface.available.length)}건만</span></div>${stack(surface.counts,surface.available.length)}<p class="small-note">주간 06:00–17:59 / 야간 18:00–05:59.</p></section></div></div>${insights('사고특성 분석',[
    ['자동차 상대 중심',`자동차 상대는 ${num(car)}건 (${pct(car,n)}%)입니다. 차량 종류와 사고 직전 움직임을 함께 확인합니다.`],
    ['후미추돌 상황 구분',`정지·직진·감속 중 후미추돌은 자동차 상대 ${num(car)}건 중 ${num(rear)}건 (${pct(rear,car)}%)입니다.`],
    ['시간·조명·노면 구분',`주·야간은 신고 시각으로 구분합니다. 조명 ${num(lightN)}건, 노면 ${num(surface.available.length)}건은 유효값이 있는 사고만 집계합니다.`]
  ],'사고 형태는 검수된 움직임·접촉 부위와 경위를 연결한 분류입니다. 회사별 운행거리 정보가 없어 사고율을 비교하지 않습니다.')}</div>`;
  return slide('ADS 사고유형 및 충돌특성','충돌대상 · 사고 상황 · 발생환경을 같은 분석대상에서 확인',`사고 당시 ADS 확인 · N=${num(n)}`,body,'01');
}

const caseTitles={'30412-6144':'교차로에서 긴급차량과 접촉','30270-15547':'정지 차량에 뒤차가 접근·접촉','30412-2588':'제동 뒤 자전거가 후부 접촉','30270-11713':'이륜차 접촉 후 후속 충격'};
function casesReport(rows){
  const serious=rows.filter(r=>['serious','fatal'].includes(r.severity));
  const byId=new Map(rows.map(r=>[r.id,r]));const available=state.pkg.cases.filter(c=>byId.has(c.id)&&['serious','fatal'].includes(byId.get(c.id).severity));
  const priority=['30412-6144','30270-15547','30412-2588','30270-11713'];
  const cases=[...priority.map(id=>available.find(c=>c.id===id)).filter(Boolean),...available.filter(c=>!priority.includes(c.id))].slice(0,4);
  const body=cases.length?`<div class="case-grid">${cases.map((c,i)=>{const r=byId.get(c.id);return `<section class="case-card"><header class="case-title"><span style="color:var(--blue)">${String(i+1).padStart(2,'0')}</span><button data-record="${esc(c.id)}" title="원문·변수 보기">${esc(caseTitles[c.id]||c.category)}</button><span class="severity-tag ${r.severity}">${esc(SEVERITY[r.severity])}</span></header><div class="case-content"><div class="case-diagram">${diagram(c.diagram)}<div class="diagram-legend">청록: ADS 차량 · 회색: 상대 차량<br>주황: 접촉 · 경위의 개략 재구성</div></div><div class="case-copy"><div class="case-meta">${esc(r.company)} · ${esc(r.month)}<br>보고 ${esc(r.id)} · 경위 v${esc(r.narrativeVersion)}</div><h4>사고 상황</h4><p>${esc(c.summary)}</p><h4>확인할 점</h4><p class="case-caution">${esc(c.caution)}</p></div></div></section>`;}).join('')}${Array.from({length:4-cases.length},()=>`<section class="case-card"><div class="empty-report"><h3>추가 사례 없음</h3><p>선택 범위에서 검수된 실제 사례만 제시</p></div></section>`).join('')}</div>`:empty();
  return slide('ADS 중상·사망 사고 사례','사고 경위를 재구성하고, 원인 판단에 필요한 조건을 확인',`중상·사망 ${num(serious.length)}건 중 ${cases.length}사례`,body,'02',`자료: NHTSA SGO ADS · 현재 필터의 중상(Serious)·사망(Fatality) 보고. Moderate는 이 페이지의 중상에 포함하지 않음.<br>그림은 원문의 순서와 진로를 요약한 개략도이며 과실 판정·인명피해 인원 산정이 아님. 보고번호를 누르면 원문과 변수를 확인할 수 있음.`);
}

function statusReport(){
  const rows=selectedADS(),n=rows.length;
  if(!n)return slide('ADS 운행상태별 사고 특성','작동상태 · 운전자 유형 · 피해수준','N=0',empty(),'03');
  const statuses=countBy(rows,'decision',['include','non_ads','insufficient','conflict']);
  const labels={include:'사고 당시 ADS 운행 확인',non_ads:'사고 시점 수동·원격 등',insufficient:'사고 당시 상태 확인 부족',conflict:'작동상태 자료 불일치'};
  const statusItems=statuses.map(x=>({...x,label:labels[x.key],color:({include:'#148b82',non_ads:'#d38b3d',insufficient:'#428eb6',conflict:'#a7b6c0'})[x.key]}));
  const driver=countBy(rows,'driver').sort((a,b)=>b.count-a.count).map(x=>({...x,label:DRIVER[x.key]||x.key}));
  const confirmed=rows.filter(r=>r.decision==='include'),other=rows.filter(r=>r.decision==='non_ads'),timing=transitionSummary(rows);
  const compare=[['ADS 운행 확인',confirmed],['수동·원격 운행 등',other],['상태 불충분·불일치',rows.filter(r=>['insufficient','conflict'].includes(r.decision))]];
  const body=`<div class="report-columns"><div class="report-main status-main">${section('01','사고 당시 작동상태',`ADS 시스템 보고 ${num(n)}건`)}${bars(statusItems,n)}<div class="notice-strip">작동 시스템 변수 + 운행상태 변수 + 사고 경위의 선후관계를 함께 검수</div><div class="split-bottom"><section>${section('02','운전자·운영자 유형')}${bars(driver,n,{compact:true})}<p class="small-note">Driver / Operator Type의 원값을 집계.<br>‘None’은 운전자·운영자 없음이며 승객 없음이 아님.</p><div class="notice-strip amber">전환 시차 확인 ${timing.known.length}건 중<br>보고값 5초 이내 ${timing.counts[0].count}건 · 약 표현 포함</div></section><section>${section('03','상태별 피해수준')}<div class="severity-compare">${compare.map(([label,rs])=>`<div class="severity-row"><div class="stack-label"><b>${label}</b><span>${num(rs.length)}건</span></div>${stack(countBy(rs,'severity',Object.keys(SEVERITY)).map(x=>({...x,label:SEVERITY[x.key],color:SEVCOL[x.key]})),rs.length,{legend:false})}<p class="small-note">중상·사망 ${rs.filter(r=>['serious','fatal'].includes(r.severity)).length}건 / ${num(rs.length)}건 (${pct(rs.filter(r=>['serious','fatal'].includes(r.severity)).length,rs.length)}%)</p></div>`).join('')}</div><div class="legend">${Object.keys(SEVERITY).map(k=>`<span><i style="background:${SEVCOL[k]}"></i>${esc(SEVERITY[k])}</span>`).join('')}</div><p class="small-note">각 상태 안에서의 피해수준 구성비.<br>운행거리·노출량을 보정한 위험도 비교가 아님.</p></section></div></div>${insights('운행상태 분석',[
    ['분모를 구분',`운행상태 비교에는 ${num(n)}건을 사용합니다. 유형·환경 분석은 그중 사고 당시 ADS 운행이 확인된 ${num(confirmed.length)}건입니다.`],
    ['시스템과 시점 구분',`Automation System Engaged?는 시스템 구분입니다. 해당 값만으로 충돌 순간의 ADS 유지 여부를 확정하지 않습니다.`],
    ['수동·원격 운행 별도',`사고 시점 수동·원격 운행 등 ${num(other.length)}건을 분리합니다. 이 건수 전체가 ‘충돌 직전 5초 내 전환’을 뜻하지 않습니다.`]
  ],'운행상태는 기존 경위 검수 결과와 원본의 지문이 일치할 때만 적용합니다. 신규·변경 보고는 재검토 후 반영합니다.')}</div>`;
  return slide('ADS 운행상태별 사고 특성','사고 시점 작동상태 · 운전자·운영자 유형 · 피해수준 비교',`운행상태 비교 · N=${num(n)}`,body,'03');
}

function vruReport(all){
  const rows=all.filter(r=>VRU.has(r.counterpart)),n=rows.length;
  if(!n)return slide('보행자·자전거·이륜차 등 사고','취약도로이용자 유형 · 차량 행동 · 발생환경 · 피해수준','VRU N=0',empty(),'04');
  const counts=countBy(rows,r=>VRU.get(r.counterpart),[...VRU.values()]);
  const sev=countBy(rows,'severity',Object.keys(SEVERITY));
  const high=rows.filter(r=>['serious','fatal'].includes(r.severity));
  const moves=['직진','회전','변경·합류','정지·주차','기타·불명'];
  const nighttime=rows.filter(r=>r.time==='night'),ixnight=nighttime.filter(r=>r.roadway==='Intersection');
  const other=all.filter(r=>r.counterpart==='Non-Motorist: Other').length;
  const table=`<table class="slide-table"><thead><tr><th>상대</th>${moves.map(m=>`<th>${m}</th>`).join('')}</tr></thead><tbody>${[...VRU.values()].map(v=>`<tr><td>${v.replace('스쿠터·스케이트보드','스쿠터 등')}</td>${moves.map(m=>`<td class="num">${rows.filter(r=>VRU.get(r.counterpart)===v&&movementGroup(r)===m).length}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const env=`<table class="slide-table"><thead><tr><th>신고 시각</th><th>교차로</th><th>그 외·불명</th></tr></thead><tbody>${[['day','주간'],['night','야간'],['unknown','시간 불명']].map(([k,label])=>`<tr><td>${label}</td><td class="num">${rows.filter(r=>r.time===k&&r.roadway==='Intersection').length}</td><td class="num">${rows.filter(r=>r.time===k&&r.roadway!=='Intersection').length}</td></tr>`).join('')}</tbody></table>`;
  const body=`<div class="report-columns"><div class="report-main vru-main">${section('01','취약도로이용자 유형별 구성',`전체 ${num(n)}건`)}${bars(counts,n)}<div class="notice-strip amber">중상·사망 ${num(high.length)}건 (${pct(high.length,n)}%) · 부상 인원이 아닌 사고·차량 보고 건수</div><div class="split-bottom"><section>${section('02','ADS 행동·발생환경')}${table}<p class="small-note">SV Pre-Crash Movement 기준 · ‘정지·주차’는 정차 시작 동작을 뜻하지 않음.</p>${env}<p class="small-note">주간 06:00–17:59 / 야간 18:00–05:59.</p></section><section>${section('03','접촉부위·피해수준')}<div class="subsection-label">ADS 차량 접촉부위</div>${bars(contactCounts(rows),n,{compact:true})}<p class="small-note">복수 부위 가능. 합계는 ${num(n)}건을 초과할 수 있음.</p><div class="subsection-label">최고 피해수준</div>${stack(sev.map(x=>({...x,label:SEVERITY[x.key],color:SEVCOL[x.key]})),n)}<p class="small-note">Serious·Fatality를 중상·사망으로 구분.<br>Moderate는 별도 범주로 유지.</p></section></div></div>${insights('취약도로이용자 분석',[
    ['유형을 원자료대로',`보행자·자전거·이륜차·스쿠터 등 ${num(n)}건입니다. 기타 비자동차 이용자 ${num(other)}건은 별도이며 임의로 스쿠터로 분류하지 않습니다.`],
    ['시간·장소를 함께 확인',`야간 ${num(nighttime.length)}건 중 교차로 ${num(ixnight.length)}건입니다. 신고 시각으로 나눈 구분이며 조도 측정값은 아닙니다.`],
    ['피해수준의 정의 유지',`중상·사망 ${num(high.length)}건입니다. 접촉 순서와 후속 충격까지 원문으로 확인해야 합니다.`]
  ],'통행량·운행거리와 노출 정도가 없어 구성비만으로 취약도로이용자별 사고위험을 비교할 수 없습니다.')}</div>`;
  return slide('보행자·자전거·이륜차 등 사고','취약도로이용자 유형 · ADS 행동 · 발생환경 · 피해수준 분석',`취약도로이용자 · N=${num(n)}`,body,'04');
}

function domesticReport(){
  const d=state.pkg.domestic;
  const body=`<div class="report-columns"><div class="report-main">${section('01','사고 신고 추이','2022년 ~ 2025년 9월')}<div class="annual-block">${bars(d.annual.map(x=>({label:x.year,count:x.count})),null)}<div class="stat-callout"><p>누적</p><div class="hero-number">112<small>건</small></div><p>2022 ~ 2025.9</p></div></div><p class="small-note">2025년은 1–9월 집계이므로 전년도 연간 건수와 직접 비교할 때 기간 차이에 유의.</p><div class="split-bottom domestic-bottom"><section>${section('02','자율주행모드 사고')}<div class="stat-callout"><div class="hero-number">약 35<small>%</small></div><p>전체 신고 사고 중<br>자율주행모드 운행 중 사고의 비중</p></div><p class="small-note">공식 발표의 근삿값을 그대로 표시.<br>정확한 사고 건수로 환산하지 않음.</p></section><section>${section('03','사고 발생 속도')}<div class="stat-callout"><div class="hero-number">30<small>km/h 이하</small></div><p>사고가 주로 발생한<br>저속 구간에 대한 공식 발표 요약</p></div><p class="small-note">속도대별 상세 건수는 이 자료에 없음.<br>임의의 속도 분포 그래프를 만들지 않음.</p></section></div></div>${insights('국내 사고특성',[
    ['별도 공식 집계',`2022년 7건, 2023년 27건, 2024년 31건, 2025년 1–9월 47건으로 총 112건입니다.`],
    ['미국 SGO와 분리',`이 페이지는 국내 공식 발표값입니다. 미국 CSV를 업로드하거나 기간·회사 필터를 바꾸어도 이 집계는 변경되지 않습니다.`],
    ['발표 시점을 표시',`2025년 11월 28일 발표 자료입니다. 실시간 통계가 아니며 새로운 공식 발표가 있을 때 출처와 함께 갱신합니다.`]
  ],'전체 사고 건수와 모드별 구성비만으로 위험도를 판단할 수 없습니다. 운행대수·주행거리·운행조건을 함께 확인해야 합니다.')}</div>`;
  return slide(d.title,'사고 신고 추이 · 운행모드 · 속도 특성 | 국내 공식 발표',`집계 기준 · 2025.9`,body,'05',`출처: ${link(d.sourceUrl,d.source)} · 발표 2025.11.28 / 출처 확인 2026.11.24.<br>국내 공식 통계 스냅샷. 미국 SGO 분석·필터와 별도이며 양국 건수를 직접 합산하지 않음.`);
}

function diagram(type){
  const common=`<defs><marker id="arr-${type}" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0L5 3L0 6" fill="#6c8794"/></marker></defs>`;
  const road=`<rect x="0" y="0" width="300" height="230" rx="5" fill="#eef3f5"/>`;
  const arrow=(d,color='#6c8794')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#arr-${type})"/>`;
  const car=(x,y,angle=0,color='#178d83',label='ADS')=>`<g transform="translate(${x} ${y}) rotate(${angle})"><rect x="-19" y="-34" width="38" height="68" rx="11" fill="${color}"/><rect x="-14" y="-23" width="28" height="16" rx="4" fill="#d2e7ed"/><rect x="-14" y="17" width="28" height="10" rx="3" fill="#b7d3de"/><rect x="-22" y="-21" width="5" height="13" rx="2" fill="#294858"/><rect x="17" y="-21" width="5" height="13" rx="2" fill="#294858"/><rect x="-22" y="16" width="5" height="13" rx="2" fill="#294858"/><rect x="17" y="16" width="5" height="13" rx="2" fill="#294858"/><text text-anchor="middle" y="10" font-size="11" font-weight="700" fill="white">${label}</text></g>`;
  const hit=(x,y)=>`<path transform="translate(${x} ${y})" d="M0 -11L4 -4L11 0L4 4L0 11L-4 4L-11 0L-4 -4Z" fill="#df8b3c" stroke="white" stroke-width="1.5"/>`;
  const label=(x,y,s)=>`<text x="${x}" y="${y}" font-size="14" fill="#3c6274" font-family="Arial,Malgun Gothic,sans-serif">${s}</text>`;
  let contents='';
  if(type==='crossing')contents=`<rect x="0" y="82" width="300" height="88" fill="#d7e0e5"/><rect x="112" y="0" width="86" height="230" fill="#d7e0e5"/><path d="M0 126H105M205 126H300M156 0V76M156 180V230" stroke="white" stroke-dasharray="12 10" stroke-width="2"/>${car(200,146,-90)}${car(136,61,180,'#738895','소방')}${arrow('M270 146H242')}${arrow('M136 14V28')}${hit(164,128)}${label(200,205,'서쪽 진행')}${label(17,34,'남쪽 진입')}${label(15,61,'긴급등 작동')}`;
  else if(type==='rear')contents=`<rect x="30" y="0" width="240" height="230" fill="#dce5e9"/><path d="M150 0V230" stroke="white" stroke-width="2" stroke-dasharray="13 11"/><path d="M30 36H270" stroke="white" stroke-width="5"/>${car(196,82)}${car(211,178,0,'#7a8c96','SUV')}${arrow('M211 225V215')}${hit(201,119)}${label(35,70,'적색 신호')}${label(39,93,'ADS 정지')}${label(38,185,'뒤차 접근')}`;
  else if(type==='bicycle-rear')contents=`<rect x="72" y="0" width="156" height="230" fill="#dce5e9"/><path d="M86 0V230M212 0V230" stroke="white" stroke-width="2"/>${car(155,154,180)}<g stroke="#718a97" fill="none" stroke-width="3"><ellipse cx="155" cy="37" rx="4" ry="13"/><ellipse cx="155" cy="85" rx="4" ry="13"/><path d="M155 41V82M142 52H168M146 66H164"/></g><ellipse cx="155" cy="63" rx="9" ry="12" fill="#859da8"/>${arrow('M155 5V19')}${hit(155,115)}${label(9,42,'자전거')}${label(10,67,'뒤따름')}${label(13,184,'제동 후')}`;
  else if(type==='motorcycle-secondary')contents=`<rect x="35" y="0" width="235" height="230" fill="#dce5e9"/><path d="M144 0V230" stroke="white" stroke-width="2" stroke-dasharray="12 10"/>${car(205,68)}${car(96,146,0,'#778b96','승용')}<g transform="translate(182 139)"><rect x="-6" y="-22" width="12" height="44" rx="6" fill="#7c919c"/><ellipse cx="0" cy="0" rx="12" ry="15" fill="#9dafb8"/></g>${hit(193,105)}${hit(128,131)}${arrow('M182 187V165')}${arrow('M205 18V9H260')}${label(42,210,'① 후부 접촉 → ② 옆 차로 후속 충격')}${label(14,29,'우회전 감속')}`;
  else contents=`<rect x="26" y="30" width="248" height="48" rx="5" fill="#dceeea"/>${label(48,60,'보고된 사고 상황')}${arrow('M150 86V111')}<rect x="26" y="122" width="248" height="48" rx="5" fill="#e1eaf0"/>${label(48,153,'접촉 순서·피해 확인')}${label(33,204,'상세 진로는 사고 경위에서 확인')}`;
  return `<svg viewBox="0 0 300 230" role="img" aria-label="사고 경위의 개략 재구성">${common}${road}${contents}</svg>`;
}

function currentFigures(){return figureCatalog(state.model,state.filter).filter(f=>f.tab===state.tab);}
function chosenFigure(){const list=currentFigures();return list.find(f=>f.id===state.figureId)||list[0];}
function figurePanel(tab){
 const figs=currentFigures(),f=chosenFigure();if(!f)return '';
 return `<section class="support-panel export-panel"><h3>PPT에 넣을 그림 저장</h3><p>페이지 PNG는 3200 × 1800, 개별 그림 PNG는 2400 × 1350으로 저장합니다. PPTX의 글자·표·차트·개략도는 편집할 수 있습니다.</p><div class="figure-controls"><label for="figure-select">개별 그림</label><select id="figure-select">${figs.map(x=>`<option value="${esc(x.id)}" ${x.id===f.id?'selected':''}>${esc(x.kind==='case'?`${x.record.id} · ${x.record.company} · ${x.title}`:x.title)}</option>`).join('')}</select><button data-action="figure-png">그림 PNG</button><button data-action="figure-pptx">그림 PPTX</button><button data-action="figure-csv">그림 집계 CSV</button></div><details id="figure-details"><summary>선택한 그림 미리보기</summary><div class="figure-stage"><div class="figure-shell" id="figure-preview">${figureMarkup(f)}</div></div></details><div class="bulk-exports"><button data-action="png-all">5페이지 PNG 묶음</button><button data-action="figures-pptx">전체 그림 PPTX</button><span>현재 필터를 적용합니다. 국내 통계는 별도 공식 발표값입니다.</span></div></section>`;
}
function figureMarkup(f){
 let body='';
 if(f.kind==='bar')body=f.items.some(x=>x.count)?bars(f.items,f.denominator):'<div class="empty-report"><h3>해당 자료 없음</h3></div>';
 else if(f.kind==='table')body=`<table class="slide-table"><thead><tr>${f.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${f.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
 else if(f.kind==='grouped')body=f.groups.map(g=>`<div class="figure-group"><h3>${esc(g.label)} · ${num(g.total)}건</h3>${stack(g.items.map(x=>({...x,color:SEVCOL[x.key]})),g.total)}</div>`).join('');
 else if(f.kind==='stat')body=`<div class="figure-stat"><strong>${esc(f.value)}</strong><p>${esc(f.description)}</p></div>`;
 else if(f.kind==='case')body=`<div class="case-content"><div class="case-diagram">${diagram(f.case.diagram)}<div class="diagram-legend">청록: ADS 차량 · 회색: 상대 차량 · 주황: 접촉</div></div><div class="case-copy"><div class="case-meta">${esc(f.record.company)} · ${esc(f.record.month)} · ${esc(f.record.id)}</div><h4>사고 상황</h4><p>${esc(f.case.summary)}</p><h4>확인할 점</h4><p>${esc(f.case.caution)}</p></div></div>`;
 return `<article class="figure-sheet"><header><h2>${esc(f.title)}</h2><p>${f.denominator!=null?`분모 ${num(f.denominator)}건 · `:''}${f.tab==='domestic'?'국내 공식 발표자료':esc(selectionLabel())}</p></header><div class="figure-body">${body}</div><footer>${esc(f.note||'차량별 사고보고 기준. 보고 구성비는 사고율·과실을 뜻하지 않습니다.')}<br>자료: ${f.tab==='domestic'?'한국교통안전공단 · 2025.11.28 발표':'NHTSA SGO ADS 제공 CSV 및 검수 기록'}</footer></article>`;
}
function support(tab){
  if(tab==='domestic')return `<section class="support-panel"><h3>독립된 국내 공식 통계</h3><p>${esc(state.pkg.domestic.note)} ${link(state.pkg.domestic.sourceUrl,'공식 보도자료 확인 ↗')}</p></section>`;
  if(tab==='cases'){const rows=selected().filter(r=>['serious','fatal'].includes(r.severity));return `<section class="support-panel"><h3>선택 범위의 중상·사망 보고 ${num(rows.length)}건</h3><p>최고 피해수준의 원문 값을 유지했습니다. 같은 사고의 피해 인원을 뜻하지 않습니다.</p>${recordTable(rows)}</section>`;}
  if(tab==='overview'){
    const rows=selected(),a=aggregate(rows),years=[...new Set(rows.map(r=>r.month.slice(0,4)))].filter(Boolean).sort();
    return `<section class="support-panel"><details open><summary>자동차 상대 8가지 상황 · 연도별 상세 집계</summary><p class="data-help">각 셀: 건수 (해당 연도 자동차 상대 사고 대비 %). 두 후미추돌은 표에서 구분하며 상단 그래프에서는 합산합니다. 유형은 과실이 아닌 보고된 움직임의 분류입니다.</p><div class="table-scroll"><table><thead><tr><th>대표 상황</th>${years.map(y=>`<th>${y}</th>`).join('')}<th>전체</th></tr></thead><tbody>${a.scenarios.map(s=>`<tr><td>${esc(s.label)}</td>${years.map(y=>{const cr=a.cars.filter(r=>r.month.startsWith(y));const c=cr.filter(r=>r.scenario===s.key).length;return `<td>${num(c)} (${pct(c,cr.length)}%)</td>`;}).join('')}<td class="active-cell">${num(s.count)} (${pct(s.count,a.cars.length)}%)</td></tr>`).join('')}<tr><th>자동차 상대 합계</th>${years.map(y=>`<th>${num(a.cars.filter(r=>r.month.startsWith(y)).length)}</th>`).join('')}<th>${num(a.cars.length)}</th></tr></tbody></table></div></details></section>`;
  }
  if(tab==='vru')return `<section class="support-panel"><h3>분류 기준과 분모</h3><div class="definition-grid"><article><h4>이륜차와 스쿠터 구분</h4><p>Motorcycle과 Non-Motorist: Scooter - Skateboard를 원자료대로 나눕니다. Scooter라는 말만으로 이륜차로 통합하지 않습니다.</p></article><article><h4>접촉부위는 중복 가능</h4><p>앞·뒤 모서리를 전면·후면에 포함하고 좌·우를 측면으로 묶습니다. 한 사고에 여러 부위가 체크될 수 있습니다.</p></article><article><h4>행동 분류의 범위</h4><p>SV Pre-Crash Movement를 사용합니다. 정지·주차에는 Stopped와 Parked, 변경·합류에는 Changing Lanes와 Merging을 포함합니다.</p></article></div></section>`;
  const timing=transitionSummary(selectedADS());
  return `<section class="support-panel"><h3>사고 당시 ADS 여부를 확인하는 방법</h3><p><code>Automation System Engaged?</code>와 <code>Engagement Status</code>는 양식별 의미가 다릅니다. 사고 경위의 충돌 전·후 수동/원격 운행 전환을 확인한 검수 기록을 연결합니다. <code>Verified Engaged</code> 하나만으로 충돌 순간 ADS 운행을 확정하지 않습니다.</p></section><section class="support-panel"><h3>제어권 전환 시차의 원문 근거</h3><p>수동·원격 운행 등 ${num(timing.base.length)}건 중 시차 구분 확인 ${timing.known.length}건. 보고값 5초 이내 ${timing.counts[0].count}건, 5초 초과 ${timing.counts[1].count}건, 구분 미확인 ${timing.counts[2].count}건입니다. ‘약 5초’는 보고값에 따라 5초 이내로 분류하며, 실제 시각의 오차범위를 추정하지 않습니다. ‘직전’, ‘몇 초’만 쓰인 경우 숫자로 채우지 않습니다.</p><div class="table-scroll"><table><thead><tr><th>보고번호</th><th>발생월·회사</th><th>보고 시차</th><th>원문 근거</th></tr></thead><tbody>${timing.details.map(({r,t})=>`<tr><td><button class="text-button" data-record="${esc(r.id)}">${esc(r.id)}</button><br>경위 v${esc(r.narrativeVersion)}</td><td>${esc(r.month)}<br>${esc(r.company)}</td><td>${esc(t.label)}${t.kind==='lower'?'<br>동작 이후 접촉, 정확한 시차 미상':''}</td><td class="wrap">${esc(t.evidence)}${t.secondEvidence?'<br>'+esc(t.secondEvidence):''}</td></tr>`).join('')||'<tr><td colspan="4">선택 범위에서 시차를 구분한 근거가 없습니다.</td></tr>'}</tbody></table></div><div class="panel-actions"><button data-action="timing-csv">전환 시차 근거 CSV</button></div><p class="data-help">전환 계기는 원문이 명시한 경우만 확인합니다. 예: 상대차의 차로 침범(988-6565), ODD 이탈(30610-1091). 이 사례를 전체 전환의 원인 비중으로 일반화하지 않습니다.</p></section>`;
}

function recordTable(rows){return `<div class="table-scroll"><table><thead><tr><th>보고번호</th><th>발생월·회사</th><th>사고 상대</th><th>최고 피해수준</th><th>운행상태 검수</th></tr></thead><tbody>${rows.map(r=>`<tr><td><button class="text-button" data-record="${esc(r.id)}">${esc(r.id)}</button><br><span class="muted">v${esc(r.version)} / 경위 v${esc(r.narrativeVersion)}</span></td><td>${esc(r.month||'발생월 불명')}<br>${esc(r.company)}</td><td>${esc(COUNTERPART[r.counterpart]||r.counterpart)}</td><td>${esc(SEVERITY[r.severity])}</td><td>${esc(STATUS[r.decision]||r.decision)}</td></tr>`).join('')||'<tr><td colspan="5">해당 사고가 없습니다.</td></tr>'}</tbody></table></div>`;}

function auditPage(){
  const checks=checksForSelection(),passed=checks.filter(c=>c.ok).length;
  return `<section class="support-panel" style="margin-top:0"><h3>집계 검산</h3><p>현재 파일 전체의 검수 연결과 선택 필터의 분류 합계를 함께 검사합니다. 기준 데이터가 일치할 때는 사전 검산 건수도 대조합니다.</p><div class="audit-summary ${passed===checks.length?'':'bad'}">${passed===checks.length?'✓':'!'} ${passed} / ${checks.length} 검사 통과 ${state.model.baseline?'· 제공 원본의 기준 집계와 일치':'· 업데이트 파일은 불변 조건만 검사, 기준 건수 고정 검사 미적용'}</div><div class="table-scroll"><table><thead><tr><th>검사 항목</th><th>계산값</th><th>대조값</th><th>결과</th></tr></thead><tbody>${checks.map(c=>`<tr><td>${esc(c.name)}</td><td>${num(c.actual)}</td><td>${num(c.expected)}</td><td class="${c.ok?'check-pass':'check-fail'}">${c.ok?'통과':'불일치'}</td></tr>`).join('')}</tbody></table></div><div class="panel-actions" style="margin-top:15px"><button data-action="audit-json">검산 결과 JSON</button><button data-action="sample-csv">표본 검토 CSV</button></div></section><section class="support-panel"><h3>재현 가능한 무작위 표본</h3><p>선택한 분석대상에서 최대 8건을 추출합니다. 같은 시드와 필터는 같은 표본을 만듭니다. 아래 비교는 실제 변수·기존 검수 결과를 보여주며, 독립적인 사람의 재검토를 대신하지 않습니다.</p><div class="sample-tools"><label for="sample-seed">추출 시드</label><input id="sample-seed" type="number" value="${state.seed}"><button data-action="resample">다시 추출</button></div><div class="sample-grid">${sample(selected(),8,state.seed).map(sampleCard).join('')||'<p>추출할 사고가 없습니다.</p>'}</div></section>`;
}
function sampleCard(r){
  return `<article class="sample-card"><h4>${esc(r.id)} · ${esc(r.month)} · ${esc(r.company)}</h4><p>상대: ${esc(COUNTERPART[r.counterpart]||r.counterpart)}<br>ADS 행동: ${esc(value(r.raw,'SV Pre-Crash Movement'))}<br>상대 행동: ${esc(value(r.raw,'CP Pre-Crash Movement'))}<br>시스템: ${esc(value(r.raw,'Automation System Engaged?'))} / 상태: ${esc(value(r.raw,'Engagement Status')||'미기재')}<br>시각: ${esc(value(r.raw,'Incident Time (24:00)'))} → ${esc(({day:'주간',night:'야간',unknown:'시간 불명'})[r.time])}<br>분류: ${esc(SCENARIOS[r.scenario]||'자동차 대표 유형 대상 밖')}<br>판정: ${esc(STATUS[r.decision])}</p><blockquote>${esc(r.narrative)}</blockquote><p>근거: ${esc(r.reason)}</p><button data-record="${esc(r.id)}">전체 경위·모든 변수 확인</button></article>`;
}
function recordRows(){
  const base=state.scope==='all'?[...state.model.records,...state.model.pending]:state.scope==='pending'?state.model.pending:state.scope==='ads'?state.model.ads:state.model.impact;
  let rows=filtered(base,state.filter);const q=state.query.toLowerCase().trim();
  if(q)rows=rows.filter(r=>`${r.id} ${r.company} ${r.narrative} ${r.counterpart} ${COUNTERPART[r.counterpart]||''} ${r.reason}`.toLowerCase().includes(q));
  return rows.sort((a,b)=>b.month.localeCompare(a.month)||a.id.localeCompare(b.id));
}
function recordsPage(){return `<section class="support-panel" style="margin-top:0"><h3>보고번호에서 원문까지 추적</h3><p>집계에 사용한 최신 변수와, 검수에 사용한 사고 경위 버전을 별도로 표시합니다.</p><div class="records-toolbar"><input class="search-input" id="record-search" type="search" placeholder="보고번호, 회사, 사고 상대 또는 영문 경위 검색" aria-label="사고 검색" value="${esc(state.query)}"><select id="record-scope" aria-label="원문 조회 범위">${[['impact','사고 당시 ADS 확인'],['ads','ADS 시스템 비교 대상'],['pending','재검토 필요'],['all','전체 검수·재검토 기록']].map(([k,v])=>`<option value="${k}" ${state.scope===k?'selected':''}>${v}</option>`).join('')}</select><button data-action="records-csv">검색 결과 CSV</button></div><div id="records-result">${recordsResult()}</div></section>`;}
function recordsResult(){const rows=recordRows(),pageCount=Math.max(1,Math.ceil(rows.length/25));state.page=Math.min(state.page,pageCount);return `${recordTable(rows.slice((state.page-1)*25,state.page*25))}<div class="pagination"><span>총 ${num(rows.length)}건 · ${state.page} / ${pageCount} 페이지</span><div><button data-action="prev" ${state.page<=1?'disabled':''}>이전</button><button data-action="next" ${state.page>=pageCount?'disabled':''}>다음</button></div></div>`;}

function dataPage(){
  const m=state.model;
  return `<section class="support-panel" style="margin-top:0"><h3>CSV 업데이트</h3><p>최신 양식과 이전 양식의 ADS CSV를 최대 2개 선택합니다. 양식에 따라 해당 파일만 교체하고 나머지는 유지합니다. 파일은 현재 브라우저에서 처리하며 서버로 업로드하지 않습니다.</p><div class="panel-actions" style="margin-top:16px"><button class="primary" data-action="upload">ADS CSV 선택</button><button data-action="restore">제공 원본으로 복원</button><button data-action="package">현재 데이터 패키지 저장</button></div><input type="file" id="csv-upload" accept=".csv,text/csv" multiple hidden><p class="data-help">새로 추가되거나 분석에 쓰는 값·경위 버전이 바뀐 사고는 기존 판정을 재사용하지 않고 재검토 대상으로 분리합니다. 화면 새로고침 시 사이트의 기본 데이터로 돌아갑니다. 영구 갱신은 검수표를 갱신한 데이터 패키지를 encode-package.mjs로 변환한 뒤 새 저장소에 배포하는 방식입니다.</p><div class="dataset-cards">${state.sources.map(s=>`<article class="dataset-card"><h4>${s.era==='current'?'최신 양식':'이전 양식'} · ${esc(s.name)}</h4><p>원본 기록 ${num(s.rows.length)}개 · ${esc(s.snapshot||'사용자 업데이트')}</p><code>SHA-256 ${esc(s.sha256)}</code></article>`).join('')}</div></section>
    <section class="support-panel"><h3>원자료에서 분석대상까지</h3><div class="flow-strip"><div><strong>${num(m.rawCount)}</strong>CSV 원본 기록</div><div><strong>${num(m.latest.size)}</strong>보고번호별 최신</div><div><strong>${num(m.records.length)}</strong>유효한 검수 대표 기록</div><div><strong>${num(m.ads.length)}</strong>ADS 시스템 비교 대상</div><div><strong>${num(m.impact.length)}</strong>사고 당시 ADS 확인</div></div><p class="data-help">비사고 정기보고 ${m.compliance}개 제외. 보고번호별 최대 버전 유지 → 검수된 동일 사고·차량 연결 적용 → ADS 시스템 구분 → 경위에 근거한 사고 시점 작동상태 분리. 재검토 필요 최신 보고 ${num(m.pending.length)}개는 확인된 분석대상에 포함하지 않습니다.</p></section>
    <section class="support-panel"><h3>분석 기준</h3><ol class="method-list"><li><b>집계 단위:</b> 사고·차량별 대표 보고입니다. 하나의 물리적 사고에 여러 보고 차량이 있을 수 있으므로 고유 사고 건수·피해 인원과 동일하지 않습니다.</li><li><b>운행상태:</b> <code>Automation System Engaged?</code>, 양식별 <code>Engagement Status</code>, <code>Narrative</code>의 선후관계를 연결한 기존 검수 결과를 사용합니다. 보고 범위의 ‘충돌 전 30초’와 충돌 순간은 구분합니다.</li><li><b>주·야간:</b> 신고된 <code>Incident Time (24:00)</code> 기준 주간 06:00–17:59, 야간 18:00–05:59입니다. 시간대 변환이나 일출·일몰 계산을 하지 않습니다. 미기재·유효하지 않은 값은 불명입니다.</li><li><b>조명:</b> <code>Lighting</code>이 기재되고 Unknown이 아닌 경우만 별도 분모에 포함합니다. 시간으로 조명 값을 채우지 않습니다.</li><li><b>피해수준:</b> <code>Highest Injury Severity Alleged</code>를 사용합니다. 중상·사망은 Serious/Fatality, Moderate는 중등도로 별도 보존합니다. ‘부상 보고 없음’이 반드시 물적피해만 발생했다는 확정을 뜻하지는 않습니다.</li><li><b>자동차 상황:</b> 기존 검수표의 8가지 대표 상황과 그 외를 연결합니다. 움직임·접촉부위·사고 경위에 근거한 분류이며 키워드만으로 새 사고를 자동 확정하지 않습니다.</li><li><b>검수 결과 보호:</b> 연결 보고의 최신 분석 필드와 사용한 경위 버전의 SHA-256이 모두 일치해야 판정을 재사용합니다. 같은 사고·차량 식별자의 신규 보고가 추가되어도 기존 연결을 재검토합니다.</li><li><b>원문 접근:</b> 공개 보고 경위를 포함하되 불필요한 VIN 형식 문자열은 비식별 처리했습니다. 공식 조사 결론이나 법적 과실 비율을 산출하지 않습니다.</li></ol></section>
    <section class="support-panel"><h3>출처와 한계</h3><p>${link(NHTSA,'NHTSA Standing General Order 사고보고 자료')} · 제공된 ADS CSV 2개와 기존 검수 기록을 사용합니다. 운행거리·운행시간 분모가 없어 회사별 사고율을 비교하지 않습니다. 수치는 보고 및 갱신 시점에 영향을 받습니다.<br><br>${link(state.pkg.domestic.sourceUrl,'국내 통계: 한국교통안전공단 공식 보도자료')} · 2025.11.28 발표. 국내 자료는 공식 발표 스냅샷이며 미국 CSV로 자동 갱신하지 않습니다.</p></section>`;
}

function showRecord(id){
  const r=[...state.model.records,...state.model.pending].find(r=>r.id===id);if(!r)return notify('해당 보고를 현재 자료에서 찾을 수 없습니다.');
  const c=state.pkg.cases.find(c=>c.id===r.id),d=$('#record-dialog');
  d.innerHTML=`<header class="dialog-header"><div><div class="eyebrow">SOURCE RECORD</div><h2 id="record-title">${esc(r.id)} · ${esc(r.company)}</h2></div><button data-close aria-label="원문 닫기">닫기 ×</button></header><div class="dialog-content"><div class="dialog-meta"><article><strong>집계 변수</strong>최신 v${esc(r.version)} · ${esc(r.source)}<br>발생월 ${esc(r.month||'불명')} / 시각 ${esc(value(r.raw,'Incident Time (24:00)')||'불명')}<br>상대 ${esc(COUNTERPART[r.counterpart]||r.counterpart)}<br>피해수준 ${esc(value(r.raw,'Highest Injury Severity Alleged'))}</article><article><strong>검수 결과</strong>${esc(STATUS[r.decision])}<br>사용 경위 v${esc(r.narrativeVersion)}<br>자동차 유형: ${esc(SCENARIOS[r.scenario]||'대상 밖·미분류')}<br>연결 보고: ${esc(r.members.join(', '))}</article></div><h3>작동상태 판단의 근거</h3><p class="data-help">${esc(r.reason)}<br>방법: ${esc(r.method||'재검토 필요')}</p>${c&&r.decision==='include'?`<h3>사례 설명과 원문 근거</h3><p class="data-help">${esc(c.summary)}</p><blockquote class="narrative">${esc(c.evidence)}</blockquote><p class="data-help">${esc(c.caution)}</p>`:''}<h3>분류에 직접 쓰이는 변수</h3><table><tbody>${['Automation System Engaged?','Engagement Status','Driver / Operator Type','SV Pre-Crash Movement','CP Pre-Crash Movement','Incident Time (24:00)','Lighting','Roadway Type'].map(k=>`<tr><th>${esc(k)}</th><td>${esc(value(r.raw,k)||'미기재')}</td></tr>`).join('')}</tbody></table><h3>사고 경위 원문 · v${esc(r.narrativeVersion)}</h3><div class="narrative">${esc(r.narrative||'경위 미기재')}</div><details><summary>최신 보고의 분석 변수 전체</summary><table><tbody>${Object.entries(r.raw).filter(([k])=>k!=='Narrative').map(([k,v])=>`<tr><th>${esc(k)}</th><td>${esc(String(v).trim()||'미기재')}</td></tr>`).join('')}</tbody></table></details>${r.narrativeVersion!==r.version?`<details><summary>최신 버전의 사고 경위와 비교</summary><div class="narrative">${esc(value(r.raw,'Narrative'))}</div></details>`:''}</div>`;
  d.querySelector('[data-close]').onclick=()=>d.close();d.showModal();
}

function bind(){
  $('#filters').onsubmit=e=>{e.preventDefault();if(state.busy)return;const f=Object.fromEntries(new FormData(e.currentTarget));if(f.from&&f.to&&f.from>f.to)return notify('시작월이 종료월보다 늦습니다.');state.filter=f;state.page=1;render();};
  if($('#record-search'))$('#record-search').oninput=e=>{state.query=e.target.value;state.page=1;$('#records-result').innerHTML=recordsResult();};
  if($('#record-scope'))$('#record-scope').onchange=e=>{state.scope=e.target.value;state.page=1;$('#records-result').innerHTML=recordsResult();};
  if($('#csv-upload'))$('#csv-upload').onchange=e=>importCSV([...e.target.files]);
  if($('#figure-select'))$('#figure-select').onchange=e=>{state.figureId=e.target.value;$('#figure-preview').innerHTML=figureMarkup(chosenFigure());fitFigure();};
}
document.addEventListener('click',async e=>{
  const target=e.target.closest('button');if(!target)return;
  if(state.busy)return;
  if(target.dataset.tab){state.tab=target.dataset.tab;state.page=1;state.full=false;render();return;}
  if(target.dataset.record){showRecord(target.dataset.record);return;}
  const action=target.dataset.action;if(!action)return;
  if(action==='data'){state.tab='data';render();}
  else if(action==='reset-filter'){state.filter={from:'',to:'',company:''};state.page=1;render();}
  else if(action==='zoom'){state.full=!state.full;render();}
  else if(action==='pdf-one'||action==='pdf-all')await exportPDF(action==='pdf-all');
  else if(action==='png-one'||action==='png-all')await exportPNG(action==='png-all'?'all':'one');
  else if(action==='figure-png')await exportPNG('figure');
  else if(action==='pptx-one'||action==='pptx-all')await exportPPTX({scope:'pages',...(action==='pptx-one'?{tab:state.tab}:{})});
  else if(action==='figure-pptx')await exportPPTX({scope:'figures',figureId:chosenFigure()?.id});
  else if(action==='figures-pptx')await exportPPTX({scope:'figures'});
  else if(action==='figure-csv'){const f=chosenFigure();if(f)download(csvExport(figureDataRows(f)),exportName(f.id)+'.csv','text/csv;charset=utf-8');}
  else if(action==='timing-csv'){const t=transitionSummary(selectedADS());download(csvExport(t.details.map(({r,t})=>({보고번호:r.id,경위버전:r.narrativeVersion,발생월:r.month,보고회사:r.company,보고시차:t.label,구분:t.bucket,원문근거:t.evidence,추가근거:t.secondEvidence}))),exportName('전환시차_원문근거')+'.csv','text/csv;charset=utf-8');}
  else if(action==='csv')downloadCSV(selected(),'분석대상');
  else if(action==='records-csv')downloadCSV(recordRows(),'검색결과');
  else if(action==='prev'||action==='next'){state.page+=action==='prev'?-1:1;$('#records-result').innerHTML=recordsResult();}
  else if(action==='resample'){const n=Number($('#sample-seed').value);if(!Number.isFinite(n))return notify('유효한 정수 시드를 입력하세요.');state.seed=n>>>0;render();}
  else if(action==='sample-csv')downloadCSV(sample(selected(),8,state.seed),'표본검토_seed'+state.seed);
  else if(action==='audit-json')download(JSON.stringify({created:new Date().toISOString(),filter:state.filter,seed:state.seed,baseline:state.model.baseline,checks:checksForSelection(),sources:state.sources.map(({rows,...s})=>s),sample:sample(selected(),8,state.seed).map(exportRow)},null,2),exportName('검산')+'.json','application/json');
  else if(action==='upload')$('#csv-upload').click();
  else if(action==='restore'){state.sources=state.pkg.sources;state.model=await buildModel(state.pkg);render();notify('제공된 원본 데이터와 검수표로 복원했습니다.');}
  else if(action==='package')await exportPackage();
  else if(action==='pending'){state.tab='records';state.scope='pending';state.query='';state.page=1;render();}
});

function fitSlide(){
  resizeObserver?.disconnect();const shell=$('.slide-shell');if(!shell)return;
  const fit=()=>{const s=state.full?1:Math.min(1,shell.clientWidth/1600);shell.style.height=(900*s)+'px';shell.querySelector('.slide').style.transform=`scale(${s})`;};
  resizeObserver=new ResizeObserver(fit);resizeObserver.observe(shell);fit();
}
function fitFigure(){figureObserver?.disconnect();const shell=$('.figure-shell');if(!shell)return;const fit=()=>{const scale=Math.min(1,shell.clientWidth/1200);shell.style.height=675*scale+'px';shell.querySelector('.figure-sheet').style.transform=`scale(${scale})`;};figureObserver=new ResizeObserver(fit);figureObserver.observe(shell);fit();}
function exportRow(r){return {보고번호:r.id,최신버전:r.version,경위버전:r.narrativeVersion,연결보고:r.members.join(';'),발생월:r.month,보고회사:r.company,시스템:value(r.raw,'Automation System Engaged?'),상태변수:value(r.raw,'Engagement Status'),검수판정:STATUS[r.decision],검수근거:r.reason,사고상대:r.counterpart,차량행동:value(r.raw,'SV Pre-Crash Movement'),상대행동:value(r.raw,'CP Pre-Crash Movement'),자동차유형:SCENARIOS[r.scenario]||'',시각:value(r.raw,'Incident Time (24:00)'),주야간:r.time,조명:value(r.raw,'Lighting'),피해수준원값:value(r.raw,'Highest Injury Severity Alleged'),피해수준:SEVERITY[r.severity],사고경위:r.narrative};}
function downloadCSV(rows,label){download(csvExport(rows.map(exportRow)),exportName(label)+'.csv','text/csv;charset=utf-8');notify(`${num(rows.length)}건을 CSV로 저장했습니다.`);}
function download(body,name,type){const url=URL.createObjectURL(new Blob([body],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
async function importCSV(files){
  if(!files.length)return;if(files.length>2)return notify('최신 양식과 이전 양식 CSV를 최대 2개 선택하세요.');
  try{
    notify('파일 구조와 기존 검수 결과를 대조하고 있습니다.');
    const changes=[],eras=new Set();
    for(const f of files){
      if(f.size>40*1024*1024)throw new Error('파일은 개당 40MB 이하를 사용하세요.');
      const bytes=await f.arrayBuffer(),parsed=parseCSV(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
      for(const required of ['Report ID','Report Version','Report Type','Automation System Engaged?','Incident Date','Narrative','Crash With'])if(!parsed.headers.includes(required))throw new Error(`${f.name}: 필수 열 ${required}가 없습니다. ADS 원본 CSV를 선택하세요.`);
      const era=parsed.headers.includes('Engagement Status')?'current':'archive';if(eras.has(era))throw new Error('같은 양식의 파일을 두 개 선택했습니다. 최신·이전 양식을 각각 하나씩 사용하세요.');eras.add(era);
      changes.push({era,name:f.name,snapshot:'사용자 업데이트',sha256:await sha256(bytes),rowCount:parsed.rows.length,rows:parsed.rows.map(r=>selectFields(r,state.pkg.fields))});
    }
    const sources=state.sources.map(s=>changes.find(c=>c.era===s.era)||s);
    const model=await buildModel(state.pkg,sources);
    state.sources=sources;state.model=model;state.page=1;render();notify(`재집계 완료: ADS 확인 ${num(model.impact.length)}건 · 재검토 필요 ${num(model.pending.length)}건`);
  }catch(error){notify(`불러오지 않았습니다: ${error.message}`);if($('#csv-upload'))$('#csv-upload').value='';}
}
async function exportPackage(){
  try{const body=JSON.stringify({...state.pkg,sources:state.sources});const stream=new Blob([body]).stream().pipeThrough(new CompressionStream('gzip'));download(await new Response(stream).arrayBuffer(),'data.json.gz','application/gzip');notify('데이터 패키지를 저장했습니다. 검수 후 encode-package.mjs로 변환해 새 앱 저장소에 반영하세요.');}catch(e){notify(e.message);}
}
function lockExport(){
 if(state.busy)return null;
 if(checksForSelection().some(x=>!x.ok)){notify('검산에서 불일치를 발견했습니다. 검산 페이지를 확인한 뒤 저장해 주세요.');return null;}
 state.busy=true;const controls=$$('button,input,select').map(el=>[el,el.disabled]);controls.forEach(([el])=>el.disabled=true);
 return ()=>{state.busy=false;controls.forEach(([el,disabled])=>{if(el.isConnected)el.disabled=disabled;});};
}
async function exportPPTX(options){
 const unlock=lockExport();if(!unlock)return;
 try{
  if(!window.pptxgen)throw new Error('PPTX 모듈을 아직 불러오지 못했습니다. 잠시 후 다시 시도하세요.');
  notify('편집 가능한 PPTX를 만들고 있습니다.');
  const pptx=buildPptx(window.pptxgen,state.model,state.filter,options);
  await pptx.writeFile({fileName:exportName(options.scope==='figures'?(options.figureId||'전체그림'):(options.tab||'5페이지_리포트'))+'.pptx',compression:true});
  notify('PPTX를 저장했습니다. PowerPoint에서 글자·표·차트·개략도를 편집할 수 있습니다.');
 }catch(e){notify(`PPTX 생성 실패: ${e.message}`);}finally{unlock();}
}
async function renderPNG(markup,width,height){
 if(!window.html2pdf)throw new Error('이미지 모듈을 아직 불러오지 못했습니다. 잠시 후 다시 시도하세요.');
 const root=$('#export-root');root.innerHTML=markup;await document.fonts.ready;
 const worker=window.html2pdf().set({margin:0,html2canvas:{scale:2,backgroundColor:'#fff',logging:false,windowWidth:1600},jsPDF:{unit:'px',format:[width,height],orientation:'landscape',hotfixes:['px_scaling']}}).from(root.firstElementChild).toCanvas();
 const canvas=await worker.get('canvas');return await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('이미지를 만들지 못했습니다.')),'image/png'));
}
async function exportPNG(scope){
 const unlock=lockExport();if(!unlock)return;
 try{
  notify(scope==='all'?'5페이지 PNG 묶음을 만들고 있습니다.':'PNG 그림을 만들고 있습니다.');
  if(scope==='all'){
   if(!window.JSZip)throw new Error('묶음 저장 모듈을 아직 불러오지 못했습니다.');
   const zip=new window.JSZip();for(const [i,[tab,,label]]of NAV.slice(0,5).entries()){const blob=await renderPNG(report(tab),1600,900);zip.file(`${String(i+1).padStart(2,'0')}_${label}.png`,await blob.arrayBuffer());}
   zip.file('읽어주세요.txt',`자료: NHTSA SGO ADS 제공 자료와 검수 기록\n분석 범위: ${selectionLabel()}\n사고 당시 ADS 확인: ${selected().length}건\n국내 통계는 한국교통안전공단의 별도 공식 발표값\n페이지 이미지: 3200 × 1800 px\n검산: ${checksForSelection().length}개 통과\n`);
   download(await zip.generateAsync({type:'blob',compression:'DEFLATE'}),exportName('5페이지_PNG')+'.zip','application/zip');
  }else if(scope==='figure'){
   const f=chosenFigure();if(!f)throw new Error('저장할 그림이 없습니다.');download(await renderPNG(figureMarkup(f),1200,675),exportName(f.id)+'.png','image/png');
  }else download(await renderPNG(report(state.tab),1600,900),exportName(state.tab)+'.png','image/png');
  notify(scope==='all'?'5페이지 PNG 묶음을 저장했습니다.':'PNG 그림을 저장했습니다.');
 }catch(e){notify(`이미지 저장 실패: ${e.message}`);}finally{$('#export-root').innerHTML='';unlock();}
}
async function exportPDF(all){
  const unlock=lockExport();if(!unlock)return;
  const root=$('#export-root');
  try{
    if(!window.html2pdf)throw new Error('PDF 모듈을 아직 불러오지 못했습니다. 잠시 후 다시 시도하세요.');
    notify(all?'5페이지 PDF를 만들고 있습니다.':'페이지 PDF를 만들고 있습니다.');
    const tabs=all?NAV.slice(0,5).map(x=>x[0]):[state.tab];
    // Render each page independently to avoid the browser's maximum canvas height.
    let pdf;
    for(let i=0;i<tabs.length;i++){
      root.innerHTML=report(tabs[i]);
      const worker=window.html2pdf().set({margin:0,filename:exportName('리포트')+'.pdf',image:{type:'jpeg',quality:.95},html2canvas:{scale:1.4,backgroundColor:'#fff',logging:false,windowWidth:1600},jsPDF:{unit:'px',format:[1600,900],orientation:'landscape',hotfixes:['px_scaling']}}).from(root.firstElementChild).toPdf();
      if(!pdf)pdf=await worker.get('pdf');
      else{const canvas=await worker.get('canvas');pdf.addPage([1600,900],'landscape');pdf.addImage(canvas.toDataURL('image/jpeg',.95),'JPEG',0,0,1600,900);}
    }
    pdf.save(exportName(all?'5페이지_리포트':state.tab)+'.pdf');notify(`${tabs.length}페이지 PDF를 저장했습니다.`);
  }catch(e){notify(`PDF 생성 실패: ${e.message}`);}finally{root.innerHTML='';unlock();}
}
init();
