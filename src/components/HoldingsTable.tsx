import { holdings } from '../data/siteData';

export default function HoldingsTable() {
  return (
    <>
      <div className="grid gap-4 lg:hidden">
        {holdings.map((holding) => (
          <article key={holding.name} className="border border-line bg-paper p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slateText">{holding.ticker}</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-charcoal">{holding.name}</h3>
              </div>
              <span className="border border-line bg-paper px-3 py-1 text-xs font-semibold text-slateText">{holding.decision}</span>
            </div>
            <dl className="mt-5 grid gap-4 text-sm leading-7">
              <div className="grid grid-cols-2 gap-4">
                <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Weight</dt><dd className="mt-1 font-serif text-2xl text-charcoal">{holding.portfolioWeight}%</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Performance</dt><dd className="mt-1 text-charcoal">{holding.performance ?? 'Not published'}</dd></div>
              </div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Role</dt><dd className="mt-1 text-slateText">{holding.role}</dd></div>
              <div className="border-t border-line pt-4"><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Latest view</dt><dd className="mt-1 text-slateText">{holding.latestNote}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slateText">Last reviewed</dt><dd className="mt-1 text-slateText">{holding.lastReviewed}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto border border-line bg-paper lg:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <caption className="sr-only">Percentage-based personal portfolio holdings table</caption>
          <thead className="bg-charcoal text-paper">
            <tr>
              {['Holding', 'Weight', 'Performance', 'Role', 'Decision', 'Last reviewed'].map((heading) => (
                <th key={heading} scope="col" className="px-5 py-4 font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.name} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-5 py-4 font-semibold text-charcoal">{holding.name}<span className="mt-1 block text-xs font-normal text-slateText">{holding.ticker}</span></th>
                <td className="px-5 py-4 font-semibold text-charcoal">{holding.portfolioWeight}%</td>
                <td className="px-5 py-4 text-slateText">{holding.performance ?? 'Not published'}</td>
                <td className="px-5 py-4 text-slateText">{holding.role}</td>
                <td className="px-5 py-4 font-semibold text-charcoal">{holding.decision}</td>
                <td className="px-5 py-4 text-slateText">{holding.lastReviewed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
