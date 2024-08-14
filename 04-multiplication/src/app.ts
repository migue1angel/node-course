import fs from 'fs'

const base: number = 5
const header : string = `
========================================
            Tabla del  ${base}
========================================
` 
let messageOutput = ''

for(let i=1; i<= 10; i++){
    messageOutput += 
    `           ${base} x ${i} = ${base*i}\n`
}
messageOutput = header + messageOutput
console.log(messageOutput);

const outputPath: string = 'outputs' 
fs.mkdirSync(outputPath, {recursive:true})
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, messageOutput);