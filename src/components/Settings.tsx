import type { ProgressState, UserProfile } from "../types";

type SettingsProps = {
  profile: UserProfile;
  progress: ProgressState;
  updateSettings: (settings: Partial<ProgressState["savedSettings"]>) => void;
  onSwitchProfile: () => void;
};

const Settings = ({ profile, progress, updateSettings, onSwitchProfile }: SettingsProps) => (
  <div className="space-y-5">
    <div>
      <div className="text-xs uppercase tracking-[0.22em] text-signal">Local only</div>
      <h1 className="font-display text-5xl font-black">Settings</h1>
    </div>
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="glass rounded-lg p-5">
        <h2 className="font-display text-3xl font-bold">Profile</h2>
        <p className="mt-2 text-slate-400">{profile.name} / {profile.skillLevel} / save slot {profile.id.slice(0, 8)}</p>
        <button type="button" onClick={onSwitchProfile} className="mt-4 rounded bg-signal px-4 py-2 font-bold text-night">
          Switch profile
        </button>
      </div>
      <div className="glass rounded-lg p-5">
        <h2 className="font-display text-3xl font-bold">Training preferences</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] p-3">
            Close answer mode
            <input type="checkbox" checked={progress.savedSettings.closeAnswerMode} onChange={(event) => updateSettings({ closeAnswerMode: event.target.checked })} />
          </label>
          <label className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] p-3">
            Visual-only mode
            <input type="checkbox" checked={progress.savedSettings.visualOnlyMode} onChange={(event) => updateSettings({ visualOnlyMode: event.target.checked })} />
          </label>
          <label className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] p-3">
            Reduce motion
            <input type="checkbox" checked={progress.savedSettings.reduceMotion} onChange={(event) => updateSettings({ reduceMotion: event.target.checked })} />
          </label>
          <label className="block rounded border border-white/10 bg-white/[0.04] p-3">
            Distance unit
            <select value={progress.savedSettings.distanceUnit} onChange={(event) => updateSettings({ distanceUnit: event.target.value as "km" | "mi" })} className="mt-2 w-full rounded bg-night px-3 py-2">
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </label>
        </div>
      </div>
    </section>
    <section className="glass rounded-lg p-5">
      <h2 className="font-display text-3xl font-bold">Compliance guardrails</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {["No GeoGuessr account login", "No scraping Google Maps or training sites", "Local save-slot profiles only"].map((item) => (
          <div key={item} className="rounded border border-signal/20 bg-signal/10 p-3 text-sm text-slate-200">{item}</div>
        ))}
      </div>
    </section>
  </div>
);

export default Settings;
