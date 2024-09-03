
console.log('Inicio de programa');

setTimeout(()=>{
    console.log('Primer callback');
},2);

setTimeout(()=>{
    console.log('Segundo callback');
},1);

console.log('Fin de programa');
