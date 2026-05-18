import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, useMapEvents } from "react-leaflet";
import type { ProgressState, RoadFinderChallenge } from "../types";
import { roadFinderChallenges } from "../data/roadFinderChallenges";
import { kmToMiles } from "../utils/mapDistance";
import { scoreMapChallenge } from "../utils/scoring";

type MapFinderProps = {
  progress: ProgressState;
};

type ClickCaptureProps = {
  onClick: (position: { lat: number; lng: number }) => void;
};

const ClickCapture = ({ onClick }: ClickCaptureProps) => {
  useMapEvents({
    click(event) {
      onClick({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
};

const MapFinder = ({ progress }: MapFinderProps) => {
  const [challengeId, setChallengeId] = useState(roadFinderChallenges[0].id);
  const [clicked, setClicked] = useState<{ lat: number; lng: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [secondsRemaining] = useState(300);
  const challenge = roadFinderChallenges.find((item) => item.id === challengeId) ?? roadFinderChallenges[0];
  const result = useMemo(
    () => (clicked && submitted ? scoreMapChallenge(challenge, clicked, secondsRemaining) : null),
    [challenge, clicked, secondsRemaining, submitted]
  );
  const distance = result
    ? progress.savedSettings.distanceUnit === "mi"
      ? `${Math.round(kmToMiles(result.distanceKm))} mi`
      : `${Math.round(result.distanceKm)} km`
    : null;

  const selectChallenge = (next: RoadFinderChallenge) => {
    setChallengeId(next.id);
    setClicked(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Static offline trainer</div>
        <h1 className="font-display text-5xl font-black">World Map Trainer</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <aside className="glass rounded-lg p-4">
          <h2 className="font-display text-2xl font-bold">Road finder challenges</h2>
          <div className="mt-4 max-h-[640px] space-y-2 overflow-auto pr-1">
            {roadFinderChallenges.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => selectChallenge(item)}
                className={`w-full rounded border p-3 text-left ${
                  item.id === challenge.id ? "border-signal/60 bg-signal/10" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="font-semibold">{item.title}</div>
                <div className="text-xs text-slate-400">{item.country} / D{item.difficulty}</div>
              </button>
            ))}
          </div>
        </aside>
        <main className="glass rounded-lg p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-bold">{challenge.title}</h2>
              <p className="text-slate-300">{challenge.prompt}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded border border-signal/30 bg-signal/10 px-3 py-2 text-sm font-semibold text-signal">
                100% static map
              </div>
              <div className="rounded bg-white/10 px-3 py-2 text-sm text-slate-300">5:00 target window</div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-white/10">
            <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom className="offline-leaflet-map z-0">
              <ClickCapture onClick={setClicked} />
              {clicked ? <CircleMarker center={[clicked.lat, clicked.lng]} radius={9} pathOptions={{ color: "#35d39f" }} /> : null}
              {submitted ? (
                <CircleMarker center={[challenge.target.lat, challenge.target.lng]} radius={12} pathOptions={{ color: "#ff6b6b" }} />
              ) : null}
            </MapContainer>
            <div className="pointer-events-none absolute inset-0 z-[350]">
              <div className="absolute left-[17%] top-[32%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">North America</div>
              <div className="absolute left-[31%] top-[62%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">South America</div>
              <div className="absolute left-[48%] top-[29%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">Europe</div>
              <div className="absolute left-[53%] top-[52%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">Africa</div>
              <div className="absolute left-[67%] top-[39%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">Asia</div>
              <div className="absolute left-[78%] top-[70%] rounded bg-night/70 px-2 py-1 text-xs text-slate-300">Oceania</div>
            </div>
          </div>
          <div className="mt-2 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
            Offline static mode is active. This page makes no map tile requests, no API requests, and no Netlify function calls.
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-400">
              {clicked ? `Pinned ${clicked.lat.toFixed(2)}, ${clicked.lng.toFixed(2)}` : "Click the map to place your guess."}
            </div>
            <button
              type="button"
              disabled={!clicked}
              onClick={() => setSubmitted(true)}
              className="rounded bg-signal px-4 py-2 font-bold text-night disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit map guess
            </button>
          </div>
          {result ? (
            <div className="mt-4 grid gap-3 rounded-lg border border-white/10 bg-night/70 p-4 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Score</div>
                <div className="font-display text-3xl font-bold text-signal">{result.score}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Distance</div>
                <div className="font-display text-3xl font-bold">{distance}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Why it matters</div>
                <p className="text-sm text-slate-300">{challenge.explanation}</p>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default MapFinder;
