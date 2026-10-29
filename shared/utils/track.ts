import type { AudiusTrackDto } from "#shared/types/audius";
import type { Track } from "#shared/types/track";

export function isAudiusTrack(value: unknown): value is AudiusTrackDto {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" && typeof candidate.title === "string"
  );
}

export function toTrack(dto: AudiusTrackDto): Track {
  return {
    id: String(dto.id),
    title: dto.title,
    artist: dto.user?.name ?? "Unknown Artist",
    duration: Number(dto.duration ?? 0),
    artwork: dto.artwork?.["150x150"] ?? dto.artwork?.["480x480"],
  };
}

export function toTracks(items: unknown): Track[] {
  if (!Array.isArray(items)) return [];

  const tracks = items.filter(isAudiusTrack).map(toTrack);
  const dropped = items.length - tracks.length;

  if (dropped > 0) {
    console.warn(`Dropped ${dropped} invalid track(s) from response`);
  }

  return tracks;
}
