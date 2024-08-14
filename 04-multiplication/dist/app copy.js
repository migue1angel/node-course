"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const base = 5;
const header = `
========================================
            Tabla del  ${base}
========================================
`;
let messageOutput = '';
for (let i = 1; i <= 10; i++) {
    messageOutput +=
        `           ${base} x ${i} = ${base * i}\n`;
}
messageOutput = header + messageOutput;
console.log(messageOutput);
const outputPath = 'outputs';
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFileSync(`${outputPath}/tabla-${base}.txt`, messageOutput);
