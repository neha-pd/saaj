import "server-only";
import fs from "node:fs";
import path from "node:path";
import { reelList, type Reel } from "./reels";

const dir = path.join(process.cwd(), "public", "reels");

/** Resolved once per build: attaches local video files that have been added. */
const reels: Reel[] = reelList.map((reel) => {
  const file = `${reel.code}.mp4`;
  return fs.existsSync(path.join(dir, file)) ? { ...reel, video: `/reels/${file}` } : reel;
});

export function getReels() {
  return reels;
}
