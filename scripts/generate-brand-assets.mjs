import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "public", "logo.png");
const publicDir = join(root, "public");

const logo = sharp(logoPath);
const meta = await logo.metadata();
const { width = 1024, height = 1024 } = meta;

// Favicon: crop emblem (top ~52% square region, centered)
const emblemSize = Math.round(Math.min(width, height * 0.52));
const emblemTop = Math.round(height * 0.02);
const emblemLeft = Math.round((width - emblemSize) / 2);

const favicon32 = await sharp(logoPath)
  .extract({ left: emblemLeft, top: emblemTop, width: emblemSize, height: emblemSize })
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const favicon16 = await sharp(favicon32).resize(16, 16).png().toBuffer();

// Minimal ICO container (16 + 32 px PNG entries)
function createIco(buffers) {
  const count = buffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const sizes = [16, 32];
  const entries = buffers.map((buf, i) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[i] === 32 ? 32 : 16, 0);
    entry.writeUInt8(sizes[i] === 32 ? 32 : 16, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buf.length;
    return entry;
  });
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  return Buffer.concat([header, ...entries, ...buffers]);
}

writeFileSync(join(publicDir, "favicon.ico"), createIco([favicon16, favicon32]));

// Apple touch icon
await sharp(favicon32)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
  .png()
  .toFile(join(publicDir, "apple-icon.png"));

// OpenGraph: cinematic 1200x630 composite
const ogWidth = 1200;
const ogHeight = 630;
const logoOgHeight = 480;
const logoOgBuffer = await sharp(logoPath)
  .resize({ height: logoOgHeight, fit: "inside" })
  .png()
  .toBuffer();

const logoOgMeta = await sharp(logoOgBuffer).metadata();
const logoW = logoOgMeta.width ?? 400;
const logoH = logoOgMeta.height ?? logoOgHeight;
const logoX = Math.round((ogWidth - logoW) / 2);
const logoY = Math.round((ogHeight - logoH) / 2);

const glowSvg = `
<svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="rgba(0,255,136,0.22)"/>
      <stop offset="45%" stop-color="rgba(0,255,136,0.08)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
    <radialGradient id="c" cx="30%" cy="70%" r="40%">
      <stop offset="0%" stop-color="rgba(0,240,255,0.06)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#000000"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#c)"/>
  <ellipse cx="${ogWidth / 2}" cy="${ogHeight / 2}" rx="320" ry="280" fill="rgba(0,255,136,0.04)" filter="blur(40px)"/>
</svg>`;

await sharp(Buffer.from(glowSvg))
  .composite([{ input: logoOgBuffer, left: logoX, top: logoY }])
  .png()
  .toFile(join(publicDir, "opengraph-image.png"));

console.log("Generated public/favicon.ico, public/apple-icon.png, public/opengraph-image.png");
