const path = require('node:path');
const fs = require('node:fs/promises');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'lp-5d', 'v9', 'assets');
const hero = path.join(root, 'fotos', 'geradas-ia', 'kali-hero-autoridade-horizontal-02.png');
const portrait = path.join(root, 'fotos', 'geradas-ia', 'kali-expansao-editorial-vertical-01.png');

(async () => {
  await fs.mkdir(output, { recursive: true });
  await Promise.all([
    sharp(hero).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(output, 'kali-hero-1600.webp')),
    sharp(hero).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(output, 'kali-hero-960.webp')),
    sharp(hero).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(output, 'kali-social.jpg')),
    sharp(portrait).webp({ quality: 85 }).toFile(path.join(output, 'kali-presenca.webp')),
  ]);
  for (const name of await fs.readdir(output)) {
    const file = path.join(output, name);
    const metadata = await sharp(file).metadata();
    console.log(`${name}: ${metadata.width}x${metadata.height}, ${(await fs.stat(file)).size} bytes`);
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
