const readline = require('readline');
 
const inputString = prompt =>{
    const readInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise( resolive =>readInterface.question(prompt,
        inputString=>{
            readInterface.close();
            resolive( inputString);
        }));
};
 
(async ()=>{
const string = await inputString("文字列を入力してください >");
 
console.log( string );
})();
