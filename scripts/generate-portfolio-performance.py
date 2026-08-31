#!/usr/bin/env python3
"""Generate percentage-only public portfolio performance from a private brokerage export."""
import csv, json, sys, urllib.parse, urllib.request
from datetime import datetime, timedelta
from pathlib import Path

SYMBOLS = {
 "META":("META","USD"),"GOOGL":("GOOGL","USD"),"ASML":("ASML.AS","EUR"),"IONQ":("IONQ","USD"),
 "SYM":("SYM","USD"),"RHM":("RHM.DE","EUR"),"NEE":("NEE","USD"),"ABNB":("ABNB","USD"),
 "O":("O","USD"),"BRK.B":("BRK-B","USD"),"QQQA":("QQQA.L","GBX"),"VUAG":("VUAG.L","GBP"),
 "SGLN":("SGLN.L","GBX"),"MSFT":("MSFT","USD"),"SPCX":("SPCX","USD"),"PSH":("PSH.L","GBX"),"HOOD":("HOOD","USD")}

def history(symbol, start, end):
    p1=int(datetime.fromisoformat(start).timestamp()); p2=int((datetime.fromisoformat(end)+timedelta(days=2)).timestamp())
    url=f"https://query1.finance.yahoo.com/v8/finance/chart/{urllib.parse.quote(symbol)}?period1={p1}&period2={p2}&interval=1d&events=div%2Csplits"
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"})
    with urllib.request.urlopen(req) as response: result=json.load(response)["chart"]["result"][0]
    closes=result["indicators"]["quote"][0]["close"]
    return {datetime.fromtimestamp(t).date().isoformat():c for t,c in zip(result["timestamp"],closes) if c is not None}

def ff(series, day):
    keys=[k for k in series if k<=day]
    return series[max(keys)] if keys else None

def replay_transactions(rows):
    """Replay cash and positions without requiring market-price data."""
    positions={}; cash=0.; executions={}; events={}
    for row in sorted(rows,key=lambda r:r["Time"]):
        events.setdefault(row["Time"][:10],[]).append(row)
        action=row["Action"]; total=float(row["Total"] or 0); ticker=row["Ticker"]
        if action=="Deposit": cash+=total
        elif "buy" in action.lower():
            shares=float(row["No. of shares"]); cash-=total; positions[ticker]=positions.get(ticker,0)+shares; executions[ticker]=float(row["Price / share"])
        elif "sell" in action.lower():
            shares=float(row["No. of shares"]); cash+=total; positions[ticker]=positions.get(ticker,0)-shares
        elif action.startswith("Dividend") or action=="Interest on cash": cash+=total
    return positions,cash,executions,events

def main():
    csv_path=Path(sys.argv[1]); out=Path(sys.argv[2] if len(sys.argv)>2 else "src/data/portfolioPerformance.generated.ts")
    requested_end=sys.argv[3] if len(sys.argv)>3 else datetime.now().date().isoformat()
    private_baseline=float(sys.argv[4]) if len(sys.argv)>4 else None
    with csv_path.open(encoding="utf-8-sig") as f: rows=list(csv.DictReader(f))
    for row in rows: row["Time"]=row.get("Time") or row.get("Time (UTC)") or ""
    rows=[row for row in rows if row["Time"] and row["Time"][:10]<=requested_end]
    rows.sort(key=lambda r:r["Time"]); start=rows[0]["Time"][:10]; end=requested_end
    prices={t:history(y,start,end) for t,(y,_) in SYMBOLS.items()}
    prices["GBPUSD"]=history("GBPUSD=X",start,end); prices["EURGBP"]=history("EURGBP=X",start,end)
    positions,cash,executions,events=replay_transactions(rows)
    running_positions={}; running_cash=0.; running_executions={}
    days=[]; d=datetime.fromisoformat(start).date(); finish=datetime.fromisoformat(end).date()
    while d<=finish:
        ds=d.isoformat()
        for r in events.get(ds,[]):
            action=r["Action"]; total=float(r["Total"] or 0); ticker=r["Ticker"]
            if action=="Deposit": running_cash+=total
            elif "buy" in action.lower():
                shares=float(r["No. of shares"]); running_cash-=total; running_positions[ticker]=running_positions.get(ticker,0)+shares; running_executions[ticker]=float(r["Price / share"])
            elif "sell" in action.lower():
                shares=float(r["No. of shares"]); running_cash+=total; running_positions[ticker]=running_positions.get(ticker,0)-shares
            elif action.startswith("Dividend") or action=="Interest on cash": running_cash+=total
        if d.weekday()<5:
            invested=0.
            for ticker,shares in running_positions.items():
                if abs(shares)<1e-9: continue
                price=ff(prices[ticker],ds) or running_executions[ticker]; currency=SYMBOLS[ticker][1]
                if currency=="USD": value=price/ff(prices["GBPUSD"],ds)
                elif currency=="EUR": value=price*ff(prices["EURGBP"],ds)
                elif currency=="GBX": value=price/100
                else: value=price
                invested+=shares*value
            bench=ff(prices["VUAG"],ds)
            if bench: days.append({"date":ds,"portfolioValue":running_cash+invested,"benchmarkClose":bench})
        d+=timedelta(days=1)
    initial=private_baseline or sum(float(row["Total"] or 0) for row in rows if row["Action"]=="Deposit" and row["Time"][:10]==start)
    if initial<=0: raise ValueError("A positive opening deposit is required to normalise percentage performance")
    base=days[0]["benchmarkClose"]
    peak=days[0]["portfolioValue"]; max_dd=0
    for point in days:
        peak=max(peak,point["portfolioValue"]); max_dd=min(max_dd,point["portfolioValue"]/peak-1)
        point["portfolioReturn"]=round((point.pop("portfolioValue")/initial-1)*100,2)
        point["benchmarkReturn"]=round((point.pop("benchmarkClose")/base-1)*100,2)
    weekly=[]
    for p in days:
        key=datetime.fromisoformat(p["date"]).strftime("%G-W%V")
        if weekly and weekly[-1][0]==key: weekly[-1]=(key,p)
        else: weekly.append((key,p))
    weekly=[p for _,p in weekly]
    latest=days[-1]; pr=latest["portfolioReturn"]; br=latest["benchmarkReturn"]
    payload={"daily":days,"weekly":weekly,"summary":{"asOf":latest["date"],"portfolioReturn":pr,"benchmarkReturn":br,"relativeReturn":round(pr-br,2),"maxDrawdown":round(max_dd*100,2)}}
    out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text("// Generated by scripts/generate-portfolio-performance.py; percentage-only public data.\nexport const portfolioPerformance = "+json.dumps(payload,separators=(",",":"))+" as const;\n",encoding="utf-8")
    print(f"Wrote {len(days)} daily and {len(weekly)} weekly observations to {out}")

if __name__=="__main__": main()
