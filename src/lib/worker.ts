import { callMongo } from "../functions/CallerMongo";
import { lineByLine } from "../functions/ReadTxt";
import { mongoQuery } from "../services/MongoQuery";
import { QueueFileRead, QueueFileWatcher, QueueMongo } from "./queue";

export async function workerMongo({ contrato, database, idx, size, file }: QueueMongo) {
  return await new Promise<any>((resolve, reject) => {
    callMongo(contrato, database, idx, size, file)
      .then((data: any) => resolve(data))
      .catch(reject)
  })
}

export async function workerFileWatcher({ contratos, name }: QueueFileWatcher) {
  return await new Promise<any>((resolve, reject) => {
    mongoQuery(contratos, name)
      .then((data: any) => resolve(data))
      .catch(reject)
  })
}

export async function workerFileRead({ file, type, contrato }: QueueFileRead) {
  return await new Promise<any>((resolve, reject) => {
    lineByLine(file, type, contrato)
      .then((data: any) => resolve(data))
      .catch(reject)
  })
}