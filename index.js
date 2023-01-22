const axios = require('axios')
const xml2js = require('xml2js')
const iconv = require('iconv-lite')
let url = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=22/01/2023'


async function start(){
    let data = await axios.get(url, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    })
    data = data.data
    data = iconv.decode(Buffer.from(data), 'windows-1251')

    xml2js.parseString(data, (error, result)=>{
        let arrayCurrency = result.ValCurs.Valute
        arrayCurrency.forEach(element => {
            let str = `${element.Name} - ${element.CharCode}, значение ${element.Value}\n`
            //console.log(str)
        });
        return result
    })
}

async function currencyExchange(charCode, value){
    let arrayCurrency = await start()
    console.log(arrayCurrency)
    // arrayCurrency.forEach(element => {
    //     if(element.CharCode == charCode){
    //         let newValue = element.Value * value
    //         console.log(newValue)
    //         return
    //     }
    // });
}

//start()
currencyExchange('USD', 10)
