import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { CONNECT_CARD, PUBLIC_CONTACT_PROFILE } from '../src/data/site.js';

const vCardPath = fileURLToPath(new URL('../public/collin-wilkins.vcf', import.meta.url));
const qrPath = fileURLToPath(new URL('../public/connect-business-card-qr.svg', import.meta.url));

function escapeVCardValue(value) {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('\n', '\\n')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,');
}

function foldVCardLine(line) {
  if (Buffer.byteLength(line, 'utf8') <= 75) return line;

  const folded = [];
  let remaining = line;
  let firstLine = true;

  while (remaining.length > 0) {
    const limit = firstLine ? 75 : 74;
    let end = Math.min(limit, remaining.length);

    while (Buffer.byteLength(remaining.slice(0, end), 'utf8') > limit) end -= 1;
    folded.push(`${firstLine ? '' : ' '}${remaining.slice(0, end)}`);
    remaining = remaining.slice(end);
    firstLine = false;
  }

  return folded.join('\r\n');
}

const note = 'AI systems, backend automation, and technical advisory for teams solving recurring workflow, reporting, and AI-adoption problems.';
const vCardLines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${escapeVCardValue(PUBLIC_CONTACT_PROFILE.familyName)};${escapeVCardValue(PUBLIC_CONTACT_PROFILE.givenName)};;;`,
  `FN:${escapeVCardValue(PUBLIC_CONTACT_PROFILE.name)}`,
  `TITLE:${escapeVCardValue(PUBLIC_CONTACT_PROFILE.title)}`,
  `EMAIL;TYPE=INTERNET,WORK:${PUBLIC_CONTACT_PROFILE.email}`,
  `URL;TYPE=WORK:${PUBLIC_CONTACT_PROFILE.website}`,
  `ADR;TYPE=WORK:;;;${escapeVCardValue(PUBLIC_CONTACT_PROFILE.locality)};${escapeVCardValue(PUBLIC_CONTACT_PROFILE.region)};;`,
  `X-SOCIALPROFILE;TYPE=linkedin:${PUBLIC_CONTACT_PROFILE.linkedin}`,
  `NOTE:${escapeVCardValue(note)}`,
  'END:VCARD',
];
const vCard = `${vCardLines.map(foldVCardLine).join('\r\n')}\r\n`;

const qrSvg = await QRCode.toString(CONNECT_CARD.qrUrl, {
  type: 'svg',
  errorCorrectionLevel: 'Q',
  margin: 4,
  color: {
    dark: '#181712',
    light: '#FFFFFF',
  },
});

await Promise.all([
  writeFile(vCardPath, vCard, 'utf8'),
  writeFile(qrPath, `${qrSvg.trim()}\n`, 'utf8'),
]);

console.log(`Generated ${vCardPath}`);
console.log(`Generated ${qrPath} -> ${CONNECT_CARD.qrUrl}`);
