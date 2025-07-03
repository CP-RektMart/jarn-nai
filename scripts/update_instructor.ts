import fs from 'fs';
import util from 'util';
import path from 'path';

const file = path.resolve('src/db', 'data.ts');
let content = fs.readFileSync(file, 'utf8');

function parseIssueBody(body: string | undefined) {
  if (!body)
    return {
      ABBREVIATION: '',
      FULLNAME: '',
      FACULTY: '',
      DEPARTMENT: '',
    };

  const regex =
    /### Abbreviation\s+([\s\S]*?)\s+### Full Name\s+([\s\S]*?)\s+### Faculty\s+([\s\S]*?)\s+### Department\s+([\s\S]*?)(?:\s+###|$)/i;
  const match = body.match(regex);
  if (!match) throw new Error('Failed to parse issue body');
  const [, abbreviation, fullName, faculty, department] = match;
  return {
    ABBREVIATION: abbreviation.trim().toUpperCase(),
    FULLNAME: fullName
      .trim()
      .split(' ')
      .map((e) => e.charAt(0).toUpperCase().concat(e.slice(1, e.length)))
      .join(' '),
    FACULTY: faculty
      .trim()
      .trim()
      .split(' ')
      .map((e) => e.charAt(0).toUpperCase().concat(e.slice(1, e.length)))
      .join(' '),
    DEPARTMENT: department
      .trim()
      .trim()
      .split(' ')
      .map((e) => e.charAt(0).toUpperCase().concat(e.slice(1, e.length)))
      .join(' '),
  };
}

const { ABBREVIATION, FULLNAME, FACULTY, DEPARTMENT } = parseIssueBody(
  process.env.BODY
);

if (!ABBREVIATION || !FULLNAME || !FACULTY || !DEPARTMENT) process.exit(1);

const newObj = {
  abbreviation: ABBREVIATION,
  fullName: FULLNAME,
  faculty: FACULTY,
  department: DEPARTMENT,
};

const formatted = util.inspect(newObj, {
  depth: null,
  compact: false,
  sorted: true,
});

const newItem = `  ${formatted},\n`;

content = content.replace(
  /(export const instructors\s*=\s*\[)([\s\S]*?)(\];)/,
  (_, start, body, end) => `${start}${body}${newItem}${end}`
);

fs.writeFileSync(file, content);
