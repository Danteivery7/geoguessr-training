import { Download, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import type { UserProfile } from "../types";

type ProfileSelectProps = {
  profiles: UserProfile[];
  activeProfileId: string | null;
  createProfile: (name: string, avatar: string, skillLevel: UserProfile["skillLevel"]) => UserProfile;
  renameProfile: (profileId: string, name: string) => void;
  updateProfile: (profileId: string, updates: Partial<Pick<UserProfile, "avatar" | "skillLevel">>) => void;
  deleteProfile: (profileId: string) => void;
  setActiveProfileId: (profileId: string | null) => void;
  exportProfile: (profileId: string) => string;
  importProfile: (raw: string) => void;
};

const downloadJson = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const ProfileSelect = ({
  profiles,
  activeProfileId,
  createProfile,
  renameProfile,
  updateProfile,
  deleteProfile,
  setActiveProfileId,
  exportProfile,
  importProfile,
}: ProfileSelectProps) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("GM");
  const [skillLevel, setSkillLevel] = useState<UserProfile["skillLevel"]>("Rookie");

  const handleImport = async (file?: File) => {
    if (!file) return;
    importProfile(await file.text());
  };

  return (
    <main className="map-texture flex min-h-screen items-center justify-center p-4">
      <section className="relative z-10 grid w-full max-w-6xl gap-5 lg:grid-cols-[1fr_380px]">
        <div className="glass rounded-lg p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-signal">GeoMastery Trainer</div>
          <h1 className="mt-2 font-display text-5xl font-black sm:text-6xl">Choose a save slot</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Local video-game style profiles keep progress, badges, mistakes, settings, custom tests, and assets separate.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {profiles.map((profile) => (
              <div key={profile.id} className={`rounded-lg border p-4 ${profile.id === activeProfileId ? "border-signal/60 bg-signal/10" : "border-white/10 bg-white/[0.04]"}`}>
                <button type="button" onClick={() => setActiveProfileId(profile.id)} className="flex w-full items-center gap-3 text-left">
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-white/10 font-display text-xl font-bold">{profile.avatar}</span>
                  <span>
                    <span className="block font-display text-2xl font-bold">{profile.name}</span>
                    <span className="text-sm text-slate-400">{profile.skillLevel}</span>
                  </span>
                </button>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => {
                    const next = prompt("Rename profile", profile.name);
                    if (next) renameProfile(profile.id, next);
                  }} className="inline-flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs">
                    <Pencil size={13} /> Rename
                  </button>
                  <button type="button" onClick={() => downloadJson(`${profile.name}-geomastery-profile.json`, exportProfile(profile.id))} className="inline-flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs">
                    <Download size={13} /> Export
                  </button>
                  <button type="button" onClick={() => updateProfile(profile.id, { avatar: profile.avatar === "GM" ? "PX" : "GM" })} className="rounded border border-white/10 px-2 py-1 text-xs">
                    Avatar
                  </button>
                  <button type="button" onClick={() => deleteProfile(profile.id)} className="inline-flex items-center gap-1 rounded border border-coral/40 px-2 py-1 text-xs text-coral">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="glass rounded-lg p-6">
          <h2 className="font-display text-3xl font-bold">Create profile</h2>
          <div className="mt-4 space-y-3">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Profile name" className="w-full rounded border border-white/10 bg-night px-3 py-2 outline-none focus:border-signal/60" />
            <input value={avatar} maxLength={3} onChange={(event) => setAvatar(event.target.value.toUpperCase())} placeholder="Avatar code" className="w-full rounded border border-white/10 bg-night px-3 py-2 outline-none focus:border-signal/60" />
            <select value={skillLevel} onChange={(event) => setSkillLevel(event.target.value as UserProfile["skillLevel"])} className="w-full rounded border border-white/10 bg-night px-3 py-2">
              {["Rookie", "Explorer", "Analyst", "Specialist", "Pro"].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <button type="button" onClick={() => createProfile(name, avatar, skillLevel)} className="inline-flex w-full items-center justify-center gap-2 rounded bg-signal px-4 py-3 font-bold text-night">
              <Plus size={18} /> Create save slot
            </button>
            <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-white/10 px-4 py-3 text-sm">
              <Upload size={16} /> Import profile JSON
              <input type="file" accept="application/json" className="hidden" onChange={(event) => void handleImport(event.target.files?.[0])} />
            </label>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ProfileSelect;
