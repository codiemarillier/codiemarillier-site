import { useState } from 'react';
import { portfolioPerformance } from '../data/portfolioPerformance.generated';

const chart={width:760,height:330,padding:{top:28,right:28,bottom:52,left:68}};
const money=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0});
const pct=(n:number)=>`${n>=0?'+':''}${n.toFixed(2)}%`;
type Props={variant?:'card'|'blend'};

export default function PortfolioValueChart({variant='card'}:Props){
 const [frequency,setFrequency]=useState<'weekly'|'daily'>('weekly');
 const data=portfolioPerformance[frequency]; const s=portfolioPerformance.summary;
 const all=data.flatMap(p=>[p.portfolio,p.benchmark,s.startingValue]);
 const min=Math.floor((Math.min(...all)-30)/50)*50,max=Math.ceil((Math.max(...all)+30)/50)*50;
 const iw=chart.width-chart.padding.left-chart.padding.right,ih=chart.height-chart.padding.top-chart.padding.bottom;
 const x=(i:number)=>chart.padding.left+i/(data.length-1)*iw,y=(v:number)=>chart.padding.top+(max-v)/(max-min)*ih;
 const path=(key:'portfolio'|'benchmark')=>data.map((p,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ');
 const ticks=[0,Math.floor((data.length-1)/2),data.length-1]; const latest=data[data.length-1];
 const date=(d:string)=>new Date(`${d}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 const shell=variant==='blend'?'border-y border-line':'border border-line bg-paper shadow-editorial';
 return <section className={shell} data-chart="portfolio-benchmark-history">
  <div className={`grid gap-6 border-b border-line md:grid-cols-[1fr_auto] md:items-end ${variant==='blend'?'py-6':'p-6 md:p-8'}`}>
   <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateText">Measured performance</p>
    <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">Portfolio versus the S&amp;P 500.</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-slateText">Account values reconstructed from every transaction and historical closing prices. The benchmark is VUAG, a GBP accumulating S&amp;P 500 tracker, normalised to the same £1,999 starting capital.</p></div>
   <div className="inline-flex self-start border border-line bg-mist p-1" aria-label="Chart frequency">
    {(['weekly','daily'] as const).map(f=><button key={f} onClick={()=>setFrequency(f)} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${frequency===f?'bg-paper text-navy shadow-sm':'text-slateText'}`}>{f}</button>)}
   </div>
  </div>
  <div className={variant==='blend'?'py-5':'p-4 md:p-6'}>
   <div className="mb-2 flex flex-wrap gap-5 text-xs font-semibold"><span className="text-positive">— Your portfolio {pct(s.portfolioReturn)}</span><span className="text-link">— S&amp;P 500 proxy {pct(s.benchmarkReturn)}</span></div>
   <svg className="h-auto w-full" viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label={`Portfolio ${money.format(latest.portfolio)}, S&P 500 benchmark ${money.format(latest.benchmark)}`}>
    {[min,(min+max)/2,max].map(t=><g key={t}><line x1={chart.padding.left} x2={chart.width-chart.padding.right} y1={y(t)} y2={y(t)} stroke="#DDE3E8" strokeDasharray="4 6"/><text x={chart.padding.left-10} y={y(t)+4} textAnchor="end" className="fill-slateText text-[12px]">{money.format(t)}</text></g>)}
    <line x1={chart.padding.left} x2={chart.width-chart.padding.right} y1={y(s.startingValue)} y2={y(s.startingValue)} stroke="#B08D3A" strokeDasharray="3 5"/>
    <path d={path('benchmark')} fill="none" stroke="#2F5FA7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d={path('portfolio')} fill="none" stroke="#137A5A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    {ticks.map(i=><text key={i} x={x(i)} y={chart.height-16} textAnchor={i===0?'start':i===data.length-1?'end':'middle'} className="fill-slateText text-[12px] font-semibold">{date(data[i].date)}</text>)}
   </svg>
  </div>
  <div className="grid gap-px border-t border-line bg-line sm:grid-cols-4">
   {[['Latest value',money.format(s.portfolioValue),'text-charcoal'],['Portfolio return',pct(s.portfolioReturn),s.portfolioReturn>=0?'text-positive':'text-negative'],['Relative to S&P',`${s.relativeReturn>=0?'+':''}${s.relativeReturn.toFixed(2)} pp`,s.relativeReturn>=0?'text-positive':'text-negative'],['Maximum drawdown',pct(s.maxDrawdown),'text-negative']].map(([l,v,c])=><div key={l} className="bg-paper p-5"><p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slateText">{l}</p><p className={`mt-2 font-serif text-2xl font-semibold ${c}`}>{v}</p></div>)}
  </div>
  <p className="border-t border-line px-5 py-3 text-xs leading-5 text-slateText">Data through 10 July 2026. Values are estimates based on closing prices and FX rates; labels and signed figures accompany colour throughout.</p>
 </section>;
}
