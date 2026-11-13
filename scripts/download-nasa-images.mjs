import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicImagesDir = path.join(rootDir, 'public', 'images');

const imageRequests = [
  {
    slug: 'surveyor-3',
    kind: 'then',
    query: 'Surveyor 3 first picture moon surface',
    nasaIdFallback: 'PIA00327',
    alt: 'Surveyor 3 camera view of the lunar surface in Ocean of Storms, 1967',
    credit: 'NASA / JPL',
    sourceUrl: 'https://images.nasa.gov/details/PIA00327',
    filename: 'then.jpg'
  },
  {
    slug: 'surveyor-3',
    kind: 'now',
    query: 'Apollo 12 Conrad Surveyor III crater',
    nasaIdFallback: 'as12-48-7133',
    alt: 'Apollo 12 astronaut Pete Conrad inspects Surveyor 3 with the Lunar Module in the distance, November 1969',
    credit: 'NASA / Apollo 12',
    sourceUrl: 'https://images.nasa.gov/details/as12-48-7133',
    filename: 'now.jpg'
  },
  {
    slug: 'apollo-17-alsep',
    kind: 'then',
    query: 'Apollo 17 ALSEP deployment Taurus Littrow',
    nasaIdFallback: 'as17-134-20490',
    alt: 'Apollo 17 astronaut deploys the ALSEP science station at Taurus-Littrow, December 1972',
    credit: 'NASA / Apollo 17',
    sourceUrl: 'https://images.nasa.gov/details/as17-134-20490',
    filename: 'then.jpg'
  },
  {
    slug: 'apollo-17-alsep',
    kind: 'now',
    query: 'Apollo 17 landing site LRO',
    nasaIdFallback: 'PIA13543',
    alt: 'LRO high-resolution orbital view of the Apollo 17 landing site showing ALSEP package and astronaut tracks',
    credit: 'NASA / GSFC / Arizona State University',
    sourceUrl: 'https://images.nasa.gov/details/PIA13543',
    filename: 'now.jpg'
  },
  {
    slug: 'apollo-11-laser-reflector',
    kind: 'then',
    query: 'Apollo 11 laser ranging retroreflector Aldrin',
    nasaIdFallback: 'as11-40-5952',
    alt: 'Buzz Aldrin sets up the Early Apollo Scientific Experiments Package (EASEP) containing the Laser Ranging Retroreflector, July 1969',
    credit: 'NASA / Neil Armstrong',
    sourceUrl: 'https://images.nasa.gov/details/as11-40-5952',
    filename: 'then.jpg'
  },
  {
    slug: 'apollo-11-laser-reflector',
    kind: 'now',
    query: 'Lunar Laser Ranging telescope laser beam',
    nasaIdFallback: 'PIA13915',
    alt: 'Green laser pulses directed from Earth observatory toward the Moon retroreflectors',
    credit: 'NASA / Goddard Space Flight Center',
    sourceUrl: 'https://images.nasa.gov/details/PIA13915',
    filename: 'now.jpg'
  },
  {
    slug: 'opportunity',
    kind: 'then',
    query: 'Opportunity rover selfie Endeavour',
    nasaIdFallback: 'PIA18596',
    alt: 'Opportunity rover clean panoramic view on the rim of Endeavour Crater',
    credit: 'NASA / JPL-Caltech / Cornell / ASU',
    sourceUrl: 'https://images.nasa.gov/details/PIA18596',
    filename: 'then.jpg'
  },
  {
    slug: 'opportunity',
    kind: 'now',
    query: 'Opportunity Perseverance Valley MRO',
    nasaIdFallback: 'PIA22228',
    alt: 'Mars Reconnaissance Orbiter HiRISE image spotting Opportunity in Perseverance Valley during the 2018 dust storm',
    credit: 'NASA / JPL-Caltech / Univ. of Arizona',
    sourceUrl: 'https://images.nasa.gov/details/PIA22228',
    filename: 'now.jpg'
  },
  {
    slug: 'insight',
    kind: 'then',
    query: 'InSight lander selfie clean',
    nasaIdFallback: 'PIA22874',
    alt: 'InSight lander fresh on Mars in December 2018 with clean solar panels',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA22874',
    filename: 'then.jpg'
  },
  {
    slug: 'insight',
    kind: 'now',
    query: 'InSight final selfie dust Sol 1211',
    nasaIdFallback: 'PIA25287',
    alt: 'InSight lander covered in thick reddish Martian dust in its final April 2022 selfie (Sol 1211)',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA25287',
    filename: 'now.jpg'
  },
  {
    slug: 'ingenuity',
    kind: 'then',
    query: 'Ingenuity helicopter airfield Jezero',
    nasaIdFallback: 'PIA24495',
    alt: 'Ingenuity Mars Helicopter standing on its landing legs in Jezero Crater before its historic first flight',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA24495',
    filename: 'then.jpg'
  },
  {
    slug: 'ingenuity',
    kind: 'now',
    query: 'Ingenuity flight 72 rotor shadow',
    nasaIdFallback: 'PIA26244',
    alt: 'Ingenuity navigation camera view after Flight 72 showing the broken shadow tip of a damaged rotor blade',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA26244',
    filename: 'now.jpg'
  },
  {
    slug: 'pioneer-10',
    kind: 'then',
    query: 'Pioneer 10 spacecraft plaque Sagan',
    nasaIdFallback: 'AC72-1542',
    alt: 'Pioneer 10 with the iconic gold-anodized aluminum message plaque attached prior to launch, 1972',
    credit: 'NASA Ames Research Center',
    sourceUrl: 'https://images.nasa.gov/details/AC72-1542',
    filename: 'then.jpg'
  },
  {
    slug: 'pioneer-10',
    kind: 'now',
    query: 'Pioneer 10 Jupiter Great Red Spot',
    nasaIdFallback: 'PIA01403',
    alt: 'Historic close-up view of Jupiter taken by Pioneer 10 in December 1973',
    credit: 'NASA / Ames Research Center',
    sourceUrl: 'https://images.nasa.gov/details/PIA01403',
    filename: 'now.jpg'
  },
  {
    slug: 'voyager-1',
    kind: 'then',
    query: 'Voyager 1 spacecraft full scale model',
    nasaIdFallback: 'PIA01391',
    alt: 'Full-scale model of the Voyager spacecraft showing high-gain dish antenna and RTG power boom',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA01391',
    filename: 'then.jpg'
  },
  {
    slug: 'voyager-1',
    kind: 'now',
    query: 'Voyager interstellar mission artist concept',
    nasaIdFallback: 'PIA17001',
    alt: 'Artist concept of Voyager 1 crossing into interstellar space beyond the solar heliosphere',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA17001',
    filename: 'now.jpg'
  }
];

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrayBuffer));
}

async function fetchNasaImageUrl(nasaId, query) {
  // First try direct asset manifest for the known NASA ID
  try {
    const assetRes = await fetch(`https://images-api.nasa.gov/asset/${nasaId}`);
    if (assetRes.ok) {
      const assetData = await assetRes.json();
      const items = assetData.collection?.items || [];
      const medium = items.find(i => i.href.includes('~medium.jpg') || i.href.includes('~orig.jpg') || i.href.endsWith('.jpg'));
      if (medium) return medium.href;
    }
  } catch (err) {
    console.warn(`Asset lookup failed for ${nasaId}:`, err.message);
  }

  // Fallback to search query
  try {
    const searchRes = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const firstItem = searchData.collection?.items?.[0];
      if (firstItem?.links?.[0]?.href) {
        return firstItem.links[0].href;
      }
    }
  } catch (err) {
    console.warn(`Search lookup failed for ${query}:`, err.message);
  }

  return null;
}

async function run() {
  console.log('Fetching and downloading NASA images...');
  const manifest = [];

  for (const item of imageRequests) {
    const targetDir = path.join(publicImagesDir, item.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, item.filename);

    console.log(`Processing ${item.slug} (${item.kind})...`);
    let imageUrl = await fetchNasaImageUrl(item.nasaIdFallback, item.query);

    if (imageUrl) {
      try {
        console.log(`  Downloading from: ${imageUrl}`);
        await downloadFile(imageUrl, targetPath);
        const stats = fs.statSync(targetPath);
        console.log(`  Saved ${targetPath} (${Math.round(stats.size / 1024)} KB)`);
        manifest.push({
          ...item,
          downloaded: true,
          relativePath: `/images/${item.slug}/${item.filename}`,
          sizeBytes: stats.size
        });
      } catch (e) {
        console.error(`  Download error for ${item.slug}:`, e.message);
        manifest.push({ ...item, downloaded: false, error: e.message });
      }
    } else {
      console.warn(`  Could not find image for ${item.slug} (${item.nasaIdFallback})`);
      manifest.push({ ...item, downloaded: false, error: 'Not found' });
    }
  }

  fs.writeFileSync(
    path.join(rootDir, 'src', 'data', 'images-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Done! Wrote manifest to src/data/images-manifest.json');
}

run().catch(console.error);
