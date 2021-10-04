import { collection, client } from '../config';
import { FileQuery } from '../services/FileQuery';

export function callMongo(contrato: string, mongoDatabase: string, idx: number, size: number, file: string = '') {
    console.log(`--> [ ${file} ]:  ${contrato} na base ${mongoDatabase}. [${(idx + 1)}/${size}]`)
    return new Promise((resolve, reject) => {
        try {
            client.connect(async (err, client) => {
                if (err) throw err;
                if (mongoDatabase === 'bfconsig') {
                    const database = client?.db(mongoDatabase)
                    const query = database?.collection(collection)
                    let status = 'Sem Status'
                    let situacao = 'Sem Situacao'
                    let resultadoBusca = 'SIM';
                    query?.find({ "indexadores.NumeroContrato": `${contrato}` }).toArray((err, data: any) => {
                        if (err) throw new Error('Erro: ' + err);
                        if (data[0]) {
                            status = data[0]?.status;
                            situacao = data[0]?.situacao;
                        } else {
                            resultadoBusca = 'NAO';
                            FileQuery(file, "write", contrato);
                        }
                        resolve({ contrato, 'bfconsig': resultadoBusca, status, situacao })
                    }
                    )
                } else {
                    const database = client?.db(mongoDatabase)
                    const query = database?.collection(collection)
                    const resultQuery = await query?.find({ "contrato.numero": `${contrato}` }).count() === 1 ? 'SIM' : 'NAO'
                    resolve({ contrato, 'protocolo': resultQuery })
                }
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}