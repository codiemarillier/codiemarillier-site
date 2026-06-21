import PageHeader from '../components/PageHeader';
import { disclaimerPoints } from '../data/siteData';

export default function Disclaimer() {
  return (
    <main className="page-fade">
      <PageHeader
        eyebrow="Disclaimer"
        title="Disclaimer"
        intro="This page sets out the limits of the site. The content is educational and journalistic only, based on my own personal investing journey."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div className="border border-line bg-paper p-7 md:p-10">
          <div className="space-y-5 text-base leading-8 text-slateText">
            {disclaimerPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
