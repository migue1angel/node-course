import fs from 'fs'
import { yarg } from './config/plugin/args.plugin'

const {b:base, l:limit, s:showTable} = yarg;

const header : string = `
========================================
            Tabla del  ${base}
========================================
` 
let messageOutput = ''

for(let i=1; i<= limit; i++){
    messageOutput += 
    `           ${base} x ${i} = ${base*i}\n`
}
messageOutput = header + messageOutput
if(showTable)console.log(messageOutput);


const outputPath: string = 'outputs' 
fs.mkdirSync(outputPath, {recursive:true})
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, messageOutput);
console.log('File created!!');