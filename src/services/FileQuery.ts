import { CreateTXT } from './../functions/CreateTxt';
import { createFile } from "../functions/CreateCSV"
import { queueFileRead, queueFileWatcher } from "../lib/queue"

export const FileQuery = async (file: string, type: "read" | "write", contrato: string = '' ) => {   
     queueFileRead.push({file, type, contrato }).then(({ contratos, reproc }) =>  {
        if(type === "write") {
            CreateTXT(reproc, file, contrato)
        } else {
            queueFileWatcher
            .push({name: file, contratos })
                .then(({ data }) => createFile(data, file))
        }
        
     })
}