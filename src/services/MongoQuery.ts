import { queueMongo } from '../lib/queue'

let queryMongoBfconsig: any = []
let queryMongoProtocolos: any = []

export async function mongoQuery(contratos: string[], name: string) {
    console.log(`--> Encontrado: ${contratos.length} contratos, iniciando query...`)
    return new Promise((resolve, reject) => {
        contratos.forEach(async (contrato, idx) => {
            await queueMongo.push({ contrato, database: 'bfconsig', idx, size: contratos.length * 2, file: name })
                .then((data) => {
                    queryMongoBfconsig.push(data)
                })
            await queueMongo.push({ contrato, database: 'protocolo', idx: contratos.length + idx + 1, size: contratos.length * 2, file: name })
                .then((data) => {
                    queryMongoProtocolos.push(data)
                })
            if (contratos.length === (idx + 1)) {
                resolve({ data: queryMongoBfconsig.map((bfconsig: any) => ({ ...bfconsig, ...queryMongoProtocolos.find((protocolo: any) => protocolo.contrato === bfconsig.contrato) })), name })
                queryMongoBfconsig = [];
                queryMongoProtocolos = [];
            }
        })
    })

}