// SPDX-License-Identifier: MIT
import { readdir, readFile, writeFile, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";
import * as prettier from "prettier";
import { parse } from "acorn";

const root = fileURLToPath(new URL("../../", import.meta.url));
const assets = (await readdir(root)).find((name) => name.endsWith("_files"));
const directory = path.join(root, assets);
const extraNames = {
  "3.4.3": "tailwind-3.4.3.js",
  js: "google-tag.js",
  vce701823e78c4301a35b7e07294d87301792088814092: "cloudflare-beacon.js",
  css: "google-fonts.css",
  css2: "google-fonts-2.css",
  "css2(1)": "google-fonts-3.css",
  "menu-effect.min.js.pagespeed.ce.dyRoWHj-SJ.js": "menu-effect.js",
};
const names = await readdir(directory);
const renames = new Map(
  names.map((name) => [
    name,
    extraNames[name] ?? name.replace(/\.min\./g, "."),
  ]),
);
const htmlFiles = [
  path.join(root, "index.html"),
  ...names
    .filter((n) => n.endsWith(".html"))
    .map((n) => path.join(directory, n)),
];
const options = {
  printWidth: 100,
  tabWidth: 2,
  endOfLine: "lf",
  quoteProps: "preserve",
};

function tree(source) {
  return JSON.parse(
    JSON.stringify(
      parse(source, { ecmaVersion: "latest", sourceType: "script" }),
      (key, value) => {
        if (["start", "end", "raw"].includes(key)) return undefined;
        if (key === "body" && Array.isArray(value))
          return value.filter((n) => n.type !== "EmptyStatement");
        if (typeof value === "bigint") return `${value}n`;
        if (value?.type === "LogicalExpression") {
          const operands = [];
          const collect = (node) => {
            if (
              node.type === "LogicalExpression" &&
              node.operator === value.operator
            ) {
              collect(node.left);
              collect(node.right);
            } else operands.push(node);
          };
          collect(value);
          return { type: value.type, operator: value.operator, operands };
        }
        return value;
      },
    ),
  );
}

async function javascript(source, label) {
  const before = tree(source);
  const formatted = await prettier.format(source, {
    ...options,
    parser: "babel",
  });
  const after = tree(formatted);
  function difference(a, b, at = "root") {
    if (JSON.stringify(a) === JSON.stringify(b)) return null;
    if (a && b && typeof a === "object" && typeof b === "object") {
      for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        const found = difference(a[key], b[key], `${at}.${key}`);
        if (found) return found;
      }
    }
    return `${at}: ${JSON.stringify(a)?.slice(0, 150)} -> ${JSON.stringify(b)?.slice(0, 150)}`;
  }
  const changed = difference(before, after);
  assert.ok(!changed, `JavaScript AST changed: ${label}: ${changed}`);
  return formatted;
}

// Validate everything before writing or renaming any archive files.
const writes = [];
let javascriptCount = 0;
let inlineCount = 0;
for (const [oldName, newName] of renames) {
  const file = path.join(directory, oldName);
  if (!/\.(js|css)$/.test(newName)) continue;
  const original = await readFile(file, "utf8");
  const formatted = newName.endsWith(".js")
    ? await javascript(original, oldName)
    : await prettier.format(original, { ...options, parser: "css" });
  if (newName.endsWith(".js")) javascriptCount++;
  writes.push([file, formatted]);
}
for (const file of htmlFiles) {
  let html = await readFile(file, "utf8");
  for (const [oldName, newName] of renames) {
    if (oldName !== newName) {
      for (const quote of ['"', "'"])
        html = html.split("/" + oldName + quote).join("/" + newName + quote);
    }
  }
  const pattern = /(<script\b[^>]*>)([\s\S]*?)(<\/script\s*>)/gi;
  let output = "";
  let cursor = 0;
  for (const match of html.matchAll(pattern)) {
    output += html.slice(cursor, match.index) + match[1];
    const type = match[1].match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1];
    if (
      match[2].trim() &&
      (!type || /^(text|application)\/javascript$/.test(type))
    ) {
      output += "\n" + (await javascript(match[2], path.basename(file)));
      inlineCount++;
    } else output += match[2];
    output += match[3];
    cursor = match.index + match[0].length;
  }
  output += html.slice(cursor);
  writes.push([file, output.replace(/\r\n?/g, "\n")]);
}
for (const [file, contents] of writes) await writeFile(file, contents);
for (const [oldName, newName] of renames) {
  if (oldName !== newName)
    await rename(path.join(directory, oldName), path.join(directory, newName));
}
console.log(
  `Formatted ${javascriptCount} JavaScript files and ${inlineCount} inline scripts; AST equivalence verified. Formatted CSS and updated HTML references.`,
);
