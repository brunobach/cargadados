import { queueMongo } from './../lib/queue';
const csv = require('json-csv')
import fs from 'fs-extra';
import { Readable } from 'stream'
import { client } from '../config'
const options = {
  fields: [
    {
      name: 'contrato',
      label: 'Contrato'
    },
    {
      name: 'bfconsig',
      label: 'Criado no bfconsig',
    },
    {
      name: 'protocolo',
      label: 'Criado no protocolos',
    },
    {
      name: 'status',
      label: 'Status bfconsig'
    },
    {
      name: 'situacao',
      label: 'Situacao bfconsig'
    }
  ]
}

export function createFile(data: any, name: string) {
  console.log('--> Criando Planilha!!!')
  clearInterval(logInterval());
  if (!fs.existsSync('./concluido')) {
    fs.mkdirSync('./concluido', { recursive: true })
  }
  let out = fs.createWriteStream(`./concluido/${name.slice(0, -4)}.csv`, { encoding: 'utf-8' })
  let readable = Readable.from(data)

  readable
    .pipe(csv.stream(options))
    .pipe(out)

  if (!fs.existsSync(`./concluido/${name}`)) {
    fs.move(`${name}`, `./concluido/${name}`).then(_ => console.log(`--> Arquivo [ ${name} ] movido para [ ./concluido ].`))
  }
  if (queueMongo.length() === 0) {
    client.close();
    logInterval();
  }
}

export const logInterval = () => {
  return setInterval(() => {
    console.log('--> Aguardando arquivo [.txt] ...')
  }, 5000)
}