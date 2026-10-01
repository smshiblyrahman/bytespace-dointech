"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type LessonVideoPlayerProps = {
  poster: string;
  title: string;
  /** Minutes. */
  duration: number;
  className?: string;
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Presentational player in the style of the course preview frame. There is no media source yet,
 * so playback advances a simulated clock that drives the controls.
 */
export function LessonVideoPlayer({ poster, title, duration, className }: LessonVideoPlayerProps) {
  const total = duration * 60;
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTime((t) => {
        if (t + 1 >= total) {
          setPlaying(false);
          return total;
        }
        return t + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, total]);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const progress = (time / total) * 100;

  return (
    <div
      ref={frameRef}
      className={cn("group relative aspect-[720/479] w-full overflow-hidden rounded-3xl bg-[#443131] xl:w-[720px]", className)}
    >
      <Image src={poster} alt="" fill preload sizes="(min-width: 1024px) 720px, 100vw" className="object-contain" />

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        className={cn(
          "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-black-700 bg-[rgb(61_61_61/0.24)] p-4 backdrop-blur-[20px] transition-[opacity,scale] duration-300 hover:scale-110 max-sm:scale-75",
          playing && "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100",
        )}
      >
        {playing ? (
          <svg width={72} height={72} viewBox="0 0 72 72" aria-hidden>
            <circle cx="36" cy="36" r="36" fill="#F5F5F6" fillOpacity=".92" />
            <rect x="25" y="22" width="8" height="28" rx="2" fill="#4B4C53" />
            <rect x="39" y="22" width="8" height="28" rx="2" fill="#4B4C53" />
          </svg>
        ) : (
          <Image src="/assets/icons/play.svg" alt="" width={72} height={72} />
        )}
      </button>

      {/* Control bar */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/60 to-transparent px-3 pt-8 pb-1 sm:gap-2 sm:px-6 sm:pt-10 sm:pb-3">
        <input
          type="range"
          min={0}
          max={total}
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          aria-label="Seek"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-3xl bg-white/30 accent-lime-400"
          style={{ background: `linear-gradient(to right, #d4fb20 ${progress}%, rgb(255 255 255 / 0.3) ${progress}%)` }}
        />
        <div className="flex items-center justify-between font-body text-xs text-white sm:text-sm">
          <div className="flex items-center sm:gap-2">
            <button type="button" onClick={() => setPlaying((p) => !p)} className="min-h-11 px-2 font-medium hover:text-lime-400">
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-pressed={muted}
              className="min-h-11 px-2 hover:text-lime-400"
            >
              {muted ? "Unmute" : "Mute"}
            </button>
            <span className="px-2 tabular-nums whitespace-nowrap">
              {fmt(time)} / {fmt(total)}
            </span>
          </div>
          <button type="button" onClick={toggleFullscreen} className="min-h-11 px-2 hover:text-lime-400">
            Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
