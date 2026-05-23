import sharp from "sharp";
import { copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const posterPath = join(publicDir, "logo-poster.png");
const logoPath = join(publicDir, "logo.png");

const BLACK_THRESHOLD = 28;
const TAGLINE_CUTOFF_RATIO = 0.63;

async function findContentBounds(imagePath) {
  const { data, info } = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (lum > BLACK_THRESHOLD) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return { width, height, minX, minY, maxX, maxY };
}

function findMemegptBottom(data, width, height, channels, searchFromY) {
  let memegptBottom = searchFromY;

  for (let y = searchFromY; y < height; y++) {
    let greenText = 0;
    let whiteText = 0;

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (g > r + 18 && g > 70) greenText++;
      if (r > 190 && g > 190 && b > 190) whiteText++;
    }

    if (whiteText > width * 0.04) break;
    if (greenText > width * 0.02) memegptBottom = y;
  }

  return memegptBottom;
}

async function makeTransparentLogo(sourcePath, outputPath) {
  const bounds = await findContentBounds(sourcePath);
  const { width, height, minX, minY, maxX } = bounds;

  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const memegptBottom = findMemegptBottom(
    data,
    info.width,
    info.height,
    info.channels,
    Math.round(info.height * TAGLINE_CUTOFF_RATIO),
  );

  const padX = Math.round((maxX - minX) * 0.04);
  const padTop = Math.round((memegptBottom - minY) * 0.06);
  const padBottom = Math.round((memegptBottom - minY) * 0.04);

  const left = Math.max(0, minX - padX);
  const top = Math.max(0, minY - padTop);
  const right = Math.min(width - 1, maxX + padX);
  const bottom = Math.min(memegptBottom + padBottom, info.height - 1);
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;

  const cropped = await sharp(sourcePath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = cropped.data;
  const { width: cw, height: ch, channels } = cropped.info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum <= BLACK_THRESHOLD) {
      pixels[i + 3] = 0;
      continue;
    }

    const fade = Math.min(1, (lum - BLACK_THRESHOLD) / 24);
    pixels[i + 3] = Math.round(255 * fade);
  }

  await sharp(pixels, {
    raw: { width: cw, height: ch, channels },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer()
    .then((buffer) =>
      sharp(buffer)
        .trim({ threshold: 12 })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(outputPath),
    );

  const meta = await sharp(outputPath).metadata();
  console.log(
    `Prepared ${outputPath}: ${meta.width}x${meta.height} (cropped from ${width}x${height})`,
  );

  return { width: meta.width, height: meta.height };
}

if (!existsSync(posterPath)) {
  copyFileSync(logoPath, posterPath);
  console.log(`Archived poster source to ${posterPath}`);
}

await makeTransparentLogo(posterPath, logoPath);
