export type HongKongSpawnSlot = {
  id: number;
  title: string;
  mediaUrl?: string;
  posterUrl?: string;
  notes?: string;
  tags: string[];
};

export const hongKongSpawnSlots: HongKongSpawnSlot[] = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;

  return {
    id: number,
    title: `Spawn #${number}`,
    mediaUrl: undefined,
    posterUrl: undefined,
    notes: number <= 9 ? "Video pending" : "Future slot",
    tags: ["hong-kong", "spawn", number <= 9 ? "video-pending" : "future"],
  };
});
