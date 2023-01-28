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

    let parseData = await xml2js.parseStringPromise(data)
    return parseData.ValCurs.Valute
}


async function currencyExchange(charCode, value){
    let arrayCurrency = await start()

    let findCurrency = arrayCurrency.find(element => element.CharCode == charCode)
    if(!findCurrency){
        console.log("Такой валюты нет!")
        return
    }
    let newValue = parseFloat(findCurrency.Value)/parseFloat(findCurrency.Nominal) * value
    console.log(`${value} ${findCurrency.CharCode} - ${newValue} RUB`)
}

currencyExchange('TRY', 1)
