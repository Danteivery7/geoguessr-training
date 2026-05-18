import { useCallback, useMemo } from "react";
import type { ProgressState, UserProfile } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { createDefaultProgress } from "./useProgress";

const profilesKey = "geomastery:profiles";
const activeProfileKey = "geomastery:active-profile";

const fallbackId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `profile-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const progressKey = (profileId: string) => `geomastery:progress:${profileId}`;

export const useProfiles = () => {
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(profilesKey, []);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>(activeProfileKey, null);

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? null,
    [activeProfileId, profiles]
  );

  const createProfile = useCallback(
    (name: string, avatar: string, skillLevel: UserProfile["skillLevel"]) => {
      const now = new Date().toISOString();
      const profile: UserProfile = {
        id: fallbackId(),
        name: name.trim() || "New Explorer",
        avatar: avatar.trim() || "GM",
        skillLevel,
        createdAt: now,
        updatedAt: now,
      };

      setProfiles((current) => [...current, profile]);
      localStorage.setItem(progressKey(profile.id), JSON.stringify(createDefaultProgress(profile.id)));
      setActiveProfileId(profile.id);
      return profile;
    },
    [setActiveProfileId, setProfiles]
  );

  const renameProfile = useCallback(
    (profileId: string, name: string) => {
      setProfiles((current) =>
        current.map((profile) =>
          profile.id === profileId ? { ...profile, name: name.trim() || profile.name, updatedAt: new Date().toISOString() } : profile
        )
      );
    },
    [setProfiles]
  );

  const updateProfile = useCallback(
    (profileId: string, updates: Partial<Pick<UserProfile, "avatar" | "skillLevel">>) => {
      setProfiles((current) =>
        current.map((profile) =>
          profile.id === profileId ? { ...profile, ...updates, updatedAt: new Date().toISOString() } : profile
        )
      );
    },
    [setProfiles]
  );

  const deleteProfile = useCallback(
    (profileId: string) => {
      setProfiles((current) => current.filter((profile) => profile.id !== profileId));
      localStorage.removeItem(progressKey(profileId));
      if (activeProfileId === profileId) {
        const nextProfile = profiles.find((profile) => profile.id !== profileId);
        setActiveProfileId(nextProfile?.id ?? null);
      }
    },
    [activeProfileId, profiles, setActiveProfileId, setProfiles]
  );

  const exportProfile = useCallback((profileId: string) => {
    const profile = profiles.find((item) => item.id === profileId);
    const progress = localStorage.getItem(progressKey(profileId));
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        profile,
        progress: progress ? (JSON.parse(progress) as ProgressState) : createDefaultProgress(profileId),
      },
      null,
      2
    );
  }, [profiles]);

  const importProfile = useCallback(
    (raw: string) => {
      const parsed = JSON.parse(raw) as { profile: UserProfile; progress: ProgressState };
      const importedProfile = {
        ...parsed.profile,
        id: parsed.profile.id || fallbackId(),
        updatedAt: new Date().toISOString(),
      };
      setProfiles((current) => {
        const withoutDuplicate = current.filter((profile) => profile.id !== importedProfile.id);
        return [...withoutDuplicate, importedProfile];
      });
      localStorage.setItem(progressKey(importedProfile.id), JSON.stringify(parsed.progress ?? createDefaultProgress(importedProfile.id)));
      setActiveProfileId(importedProfile.id);
    },
    [setActiveProfileId, setProfiles]
  );

  return {
    profiles,
    activeProfile,
    activeProfileId,
    createProfile,
    renameProfile,
    updateProfile,
    deleteProfile,
    setActiveProfileId,
    exportProfile,
    importProfile,
  };
};
