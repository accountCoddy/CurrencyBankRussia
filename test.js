const ttt = require('./index.js')


ttt.currencyExchange('UZS', 1).then(data => console.log(data))

async function GetExchange(){
    let a = await ttt.currencyExchange('UZS', 1)
    console.log(a)
}

GetExchange()

let b = async () =>{
    let h = await ttt.currencyExchange('UZS', 1)
    console.log(h)
}

b()

