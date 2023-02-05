const axios = require('axios')
const xml2js = require('xml2js')
const iconv = require('iconv-lite')
let url = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req='


async function start(){
    let date = new Date()
    let currentDate = formatterDate(date)
    
    url += currentDate
    //console.log(url)
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
        console.log('Такой валют нет!')
        return
    }
    let newValue = (parseFloat(findCurrency.Value)/ findCurrency.Nominal)* value
    let formatString = `${value} ${charCode} - ${newValue} RUB`
    return formatString
    //console.log(formatString)
}

function formatterDate(date){
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    if(day < 10) day = '0' + day
    if(month < 10) month = '0' + month
    return `${day}/${month}/${year}`
}

module.exports = {
    currencyExchange
}
//currencyExchange('UZS', 1)
