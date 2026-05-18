import { Clapperboard, FolderOpen, Plus } from "lucide-react";
import { hongKongSpawnSlots } from "../data/hongKongSpawns";

const isBundledMediaUrl = (url?: string) =>
  Boolean(url && (url.startsWith("/") || url.startsWith("./") || url.startsWith("../") || url.startsWith("data:")));

const HongKongSpawns = () => (
  <div className="space-y-5">
    <section className="map-texture glass rounded-lg p-6 sm:p-8">
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-signal">Local media wall</div>
          <h1 className="mt-2 font-display text-5xl font-black">Hong Kong Spawns</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Empty slots for your spawn clips. Add videos later under <span className="text-slate-100">public/assets/training/hong-kong-spawns/</span>.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-night/70 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2 font-semibold text-slate-100">
            <FolderOpen size={16} /> Ready for growth
          </div>
          <div className="mt-1">10 starter slots, data-driven list.</div>
        </div>
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {hongKongSpawnSlots.map((slot) => (
        <article key={slot.id} className="glass hover-lift overflow-hidden rounded-lg">
          <div className="aspect-video border-b border-white/10 bg-grid bg-[length:32px_32px]">
            {isBundledMediaUrl(slot.mediaUrl) ? (
              <video className="h-full w-full object-cover" controls preload="metadata" poster={slot.posterUrl}>
                <source src={slot.mediaUrl} />
              </video>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
                <div className="rounded-full bg-white/10 p-4 text-signal">
                  <Clapperboard size={34} />
                </div>
                <div>
                  <div className="font-display text-3xl font-black">{slot.title}</div>
                  <div className="mt-1 text-sm text-slate-400">Video slot empty</div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold">{slot.title}</h2>
                <p className="text-sm text-slate-400">{slot.notes}</p>
              </div>
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-slate-300">HK</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {slot.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/[0.06] px-2 py-1 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
      <article className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.03] p-6 text-center text-slate-400">
        <div>
          <Plus className="mx-auto mb-3 text-signal" />
          Add more slots in <span className="text-slate-200">src/data/hongKongSpawns.ts</span>
        </div>
      </article>
    </section>
  </div>
);

export default HongKongSpawns;
