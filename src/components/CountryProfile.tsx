import { useState } from "react";
import type { ProgressState } from "../types";
import { countries } from "../data/countries";
import { getQuestionsByFilters } from "../utils/questionGenerator";
import ProgressRing from "./ProgressRing";

type CountryProfileProps = {
  progress: ProgressState;
  onStartQuiz: (title: string, questions: ReturnType<typeof getQuestionsByFilters>) => void;
};

const CountryProfile = ({ progress, onStartQuiz }: CountryProfileProps) => {
  const [selectedId, setSelectedId] = useState(countries[0].id);
  const country = countries.find((item) => item.id === selectedId) ?? countries[0];
  const mastery = progress.countryMastery[country.name] ?? 0;

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Country pages</div>
        <h1 className="font-display text-5xl font-black">Country Profiles</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <aside className="glass rounded-lg p-4">
          <input
            placeholder="Filter countries"
            className="mb-3 w-full rounded border border-white/10 bg-night px-3 py-2 text-sm outline-none focus:border-signal/60"
            onChange={(event) => {
              const match = countries.find((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
              if (match) setSelectedId(match.id);
            }}
          />
          <div className="max-h-[680px] space-y-2 overflow-auto pr-1">
            {countries.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex w-full items-center gap-3 rounded border p-3 text-left ${
                  item.id === country.id ? "border-signal/60 bg-signal/10" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <span className="flex h-9 w-11 items-center justify-center rounded bg-white/10 font-display font-bold">{item.flag}</span>
                <span>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="text-xs text-slate-400">{item.region}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>
        <main className="glass rounded-lg p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-20 items-center justify-center rounded-lg bg-white/10 font-display text-2xl font-black">
                  {country.flag}
                </span>
                <div>
                  <h2 className="font-display text-5xl font-black">{country.name}</h2>
                  <p className="text-slate-400">{country.region}</p>
                </div>
              </div>
            </div>
            <ProgressRing value={mastery} label="mastery" color="#39a8ff" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded border border-white/10 bg-white/[0.04] p-3">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Driving</div>
              <div className="text-lg font-bold">{country.drivingSide}</div>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.04] p-3">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Domain</div>
              <div className="text-lg font-bold">{country.domain}</div>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.04] p-3">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Phone</div>
              <div className="text-lg font-bold">{country.phoneCode}</div>
            </div>
            <button
              type="button"
              onClick={() => onStartQuiz(`${country.name} Practice`, getQuestionsByFilters({ countries: [country.name], count: 10, closeCountryMode: true }))}
              className="rounded bg-signal px-3 py-2 font-bold text-night"
            >
              Practice
            </button>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              ["Road clues", country.roadClues],
              ["Language clues", country.languageClues],
              ["Common signs", country.signClues],
              ["Landscape notes", country.landscapeNotes],
              ["Architecture notes", country.architectureNotes],
              ["Confusable countries", country.confusableCountries],
            ].map(([title, items]) => (
              <section key={String(title)} className="rounded border border-white/10 bg-white/[0.04] p-4">
                <h3 className="font-display text-2xl font-bold">{String(title)}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(items as string[]).map((item) => (
                    <span key={item} className="rounded bg-white/10 px-2 py-1 text-sm text-slate-300">{item}</span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CountryProfile;
