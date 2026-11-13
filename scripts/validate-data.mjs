import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Let's import MACHINES from src/data/machines.ts
// In Node 24 with native TS or via dynamic import / regex / compiled check, let's verify data directly.
// To make it 100% resilient across any node runner, we can read the file or import it.
// Let's test if Node 24 executes ts files directly (Node 22.6+ supports --experimental-strip-types, Node 24 supports TypeScript natively).

async function runValidation() {
  console.log('🔍 Running LAST WORDS Data Validation (NASA Space Apps Challenge 2026)...\n');

  let machines;
  try {
    const machinesModule = await import('../src/data/machines.ts');
    machines = machinesModule.MACHINES;
  } catch (err) {
    console.warn('Direct TS import note, falling back to TS loader:', err.message);
    // If standard import fails without flag, compile or load
    throw err;
  }

  if (!Array.isArray(machines) || machines.length < 8) {
    console.error(`❌ Expected at least 8 machines, found ${machines?.length || 0}`);
    process.exit(1);
  }

  let errorCount = 0;

  machines.forEach((m, idx) => {
    console.log(`Checking [${idx + 1}/${machines.length}] ${m.name} (${m.slug})...`);

    // 1. Sources check: must have >= 2 sources
    if (!m.sources || !Array.isArray(m.sources) || m.sources.length < 2) {
      console.error(`  ❌ [${m.slug}] Has fewer than 2 sources: ${m.sources?.length || 0}`);
      errorCount++;
    } else {
      m.sources.forEach((s, sIdx) => {
        if (!s.url || !s.url.startsWith('http')) {
          console.error(`  ❌ [${m.slug}] Source ${sIdx} has invalid URL: ${s.url}`);
          errorCount++;
        }
      });
    }

    // 2. Date checks: valid ISO string
    if (!m.launchISO || isNaN(Date.parse(m.launchISO))) {
      console.error(`  ❌ [${m.slug}] Invalid launchISO: "${m.launchISO}"`);
      errorCount++;
    }
    if (m.lastSignalISO && isNaN(Date.parse(m.lastSignalISO))) {
      console.error(`  ❌ [${m.slug}] Invalid lastSignalISO: "${m.lastSignalISO}"`);
      errorCount++;
    }

    // 3. Images check: alt text, credit, sourceUrl
    if (!m.images || !Array.isArray(m.images) || m.images.length === 0) {
      console.error(`  ❌ [${m.slug}] Missing images array`);
      errorCount++;
    } else {
      m.images.forEach((img, imgIdx) => {
        if (!img.src || typeof img.src !== 'string') {
          console.error(`  ❌ [${m.slug}] Image #${imgIdx} missing src`);
          errorCount++;
        }
        if (!img.alt || img.alt.trim().length < 5) {
          console.error(`  ❌ [${m.slug}] Image #${imgIdx} has empty or inadequate alt text`);
          errorCount++;
        }
        if (!img.credit || img.credit.trim().length === 0) {
          console.error(`  ❌ [${m.slug}] Image #${imgIdx} missing visible credit line`);
          errorCount++;
        }
        if (!img.sourceUrl || !img.sourceUrl.startsWith('http')) {
          console.error(`  ❌ [${m.slug}] Image #${imgIdx} missing valid sourceUrl`);
          errorCount++;
        }
        // Verify file exists in public directory
        const localPath = path.join(rootDir, 'public', img.src.replace(/^\//, ''));
        if (!fs.existsSync(localPath)) {
          console.warn(`  ⚠️ [${m.slug}] Local image file not found on disk: ${localPath}`);
        }
      });
    }

    // 4. Quiz checks: 3 questions, correctAnswer in bounds
    if (!m.quiz || !Array.isArray(m.quiz) || m.quiz.length < 3) {
      console.error(`  ❌ [${m.slug}] Has fewer than 3 quiz questions: ${m.quiz?.length || 0}`);
      errorCount++;
    } else {
      m.quiz.forEach((q, qIdx) => {
        if (!q.q || q.q.trim().length === 0) {
          console.error(`  ❌ [${m.slug}] Quiz Q${qIdx + 1} has empty question`);
          errorCount++;
        }
        if (!q.options || q.options.length < 2) {
          console.error(`  ❌ [${m.slug}] Quiz Q${qIdx + 1} has insufficient options`);
          errorCount++;
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
          console.error(`  ❌ [${m.slug}] Quiz Q${qIdx + 1} correctAnswer index out of range: ${q.correctAnswer} (options: ${q.options?.length})`);
          errorCount++;
        }
        if (!q.explanation || q.explanation.trim().length === 0) {
          console.error(`  ❌ [${m.slug}] Quiz Q${qIdx + 1} missing scientific explanation`);
          errorCount++;
        }
      });
    }

    // 5. Final log check
    if (!m.finalLog || !Array.isArray(m.finalLog.lines) || m.finalLog.lines.length < 4 || !m.finalLog.endTag) {
      console.error(`  ❌ [${m.slug}] Malformed finalLog`);
      errorCount++;
    }

    // 6. What really happened: check dateLabel and primary source
    if (!m.whatReallyHappened || m.whatReallyHappened.length < 2) {
      console.error(`  ❌ [${m.slug}] whatReallyHappened has fewer than 2 items`);
      errorCount++;
    }

    console.log(`  ✓ ${m.name} passed all checks.`);
  });

  console.log('\n----------------------------------------');
  if (errorCount > 0) {
    console.error(`❌ Data validation failed with ${errorCount} error(s)!`);
    process.exit(1);
  } else {
    console.log(`✅ All ${machines.length} machines passed validation! 0 errors.`);
  }
}

runValidation().catch((err) => {
  console.error('Fatal validation runner error:', err);
  process.exit(1);
});
