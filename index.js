const axios = require('axios')
const xml2js = require('xml2js')
let iconv = require('iconv-lite');

let url = 'https://www.cbr.ru/scripts/XML_daily.asp?date_req=20/01/2023'

const start = async() => {
    let data = await axios(url, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary'  
    });
    data = iconv.decode(Buffer.from(data.data), 'WINDOWS-1251')
    
    xml2js.parseString(data, (error, res) =>{
        res.ValCurs.Valute.forEach(element => {
            let str = `${element.Name} - ${element.Value}`
            console.log(str)
        });
        //console.log(res.ValCurs.Valute)

    })
}

start()