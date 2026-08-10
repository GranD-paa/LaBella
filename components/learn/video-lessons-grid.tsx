"use client";

import Image from "next/image";
import { ExternalLink, PlayCircle, Video } from "lucide-react";
import { useState } from "react";

import { useTranslations } from "@/components/providers/locale-provider";
import { toVideoEmbed } from "@/lib/learn/video-embed";
import type { VideoLesson } from "@/types";

/**
 * Video lessons for one level.
 *
 * Players load only after the learner presses play. A grid of autoloaded
 * iframes would pull megabytes of third-party scripts on every page view and
 * hand each platform a tracking hook before anyone watched anything — so each
 * card starts as a still image and swaps itself for a player on click.
 */
export function VideoLessonsGrid({ videos }: { videos: VideoLesson[] }) {
  const { t } = useTranslations();

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <Video className="h-8 w-8" />
        <p>{t("learn.videoEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoCard({ video }: { video: VideoLesson }) {
  const { t } = useTranslations();
  const [playing, setPlaying] = useState(false);
  const embed = toVideoEmbed(video.video_url);

  return (
    <article className="brand-surface flex flex-col overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-video w-full bg-black/40">
        {playing && embed ? (
          <iframe
            src={`${embed.embedUrl}${embed.provider === "youtube" ? "?autoplay=1" : ""}`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            // The player is third-party content: deny it same-origin access
            // and anything else it does not need to play a video.
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        ) : (
          <VideoPoster
            video={video}
            canPlayInline={Boolean(embed)}
            onPlay={() => setPlaying(true)}
          />
        )}
      </div>

      <div className="space-y-1 p-4">
        <h3 className="font-semibold leading-tight">{video.title}</h3>
        {video.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {video.description}
          </p>
        ) : null}
        {!embed ? (
          <a
            href={video.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-brand-accent hover:underline"
          >
            {t("learn.videoOpenExternal")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function VideoPoster({
  video,
  canPlayInline,
  onPlay,
}: {
  video: VideoLesson;
  canPlayInline: boolean;
  onPlay: () => void;
}) {
  const { t } = useTranslations();

  const poster = video.thumbnail_url ? (
    <Image
      src={video.thumbnail_url}
      alt=""
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      className="object-cover"
    />
  ) : (
    <div className="absolute inset-0 bg-brand-gradient opacity-60" />
  );

  // An unrecognised host cannot be framed, so the poster becomes a link out
  // rather than a play button that would do nothing.
  if (!canPlayInline) {
    return (
      <a
        href={video.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute inset-0 flex items-center justify-center"
        aria-label={t("learn.videoOpenExternal")}
      >
        {poster}
        <ExternalLink className="relative h-12 w-12 text-white/90 transition-transform group-hover:scale-110" />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group absolute inset-0 flex items-center justify-center"
      aria-label={t("learn.videoPlay", { title: video.title })}
    >
      {poster}
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/15" />
      <PlayCircle className="relative h-14 w-14 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
    </button>
  );
}
