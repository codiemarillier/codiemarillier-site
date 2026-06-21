import { ArrowRight, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/portfolio-desk-hero.png';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="page-fade">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Personal investment journal
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-none text-charcoal md:text-7xl">
            Building a disciplined investment track record, one decision at a time.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slateText md:text-xl">
            Codie Capital Research is my personal investment journal - documenting portfolio reviews, weekly summaries,
            market reflections, and the lessons that come from managing my own portfolio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-charcoal px-6 text-sm font-semibold text-paper transition-colors hover:bg-navy"
            >
              Read About Codie
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex min-h-12 items-center justify-center border border-line bg-paper px-6 text-sm font-semibold text-charcoal transition-colors hover:border-gold hover:bg-ivory"
            >
              View Portfolio
            </Link>
          </div>
          <p className="mt-6 max-w-xl border-l-2 border-gold pl-4 text-sm leading-6 text-slateText">
            Educational content only. I do not manage money for other people or provide personal financial advice.
          </p>
        </div>

        <div className="relative">
          <div className="border border-line bg-ivory p-3 shadow-editorial">
            <img
              src={heroImage}
              alt="Investment desk with a laptop chart, notebook, and printed portfolio report"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 border border-line bg-paper p-5 shadow-editorial sm:left-10 sm:right-auto sm:w-80">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-paper">
                <Library className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">Portfolio record</p>
                <p className="font-serif text-2xl font-semibold text-charcoal">Journal / Portfolio / Philosophy</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-slateText">
              <span className="border border-line bg-ivory py-2">Reviews</span>
              <span className="border border-line bg-ivory py-2">Holdings</span>
              <span className="border border-line bg-ivory py-2">Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
