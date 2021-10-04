import fs from 'fs'
import readline from 'readline'

const closefile = async (rl: any) => {
    return new Promise((res: any, rej) => {
        rl.once("close", () => {
            res();
        })
    })
}

export const lineByLine = (path: string, type: string = 'read', contrato: string = '') => {
    let contratos: string[] = []
    return new Promise((resolve, reject) => {
        try {
            let instream = fs.createReadStream(path);
            let rl = readline.createInterface(instream);
            rl.on("line", function (this: any, line: any) {
                this.emit("pause", line);
            });
            rl.on("pause", function (this: any, line: any) {
                if (type === "read") {
                    const reContrato = new RegExp(/[8][1][0-9]{7}/)
                    if (line != undefined && line.toString().match(reContrato)) {
                        contratos.push(line.toString().match(reContrato)[0])
                    }
                } else {
                    const reContratoFind = new RegExp(contrato, "g");
                    if (line != undefined && line.toString().match(reContratoFind)) {
                        resolve({ reproc: line.toString() })
                    }
                }
                this.emit("resume");
            });
            rl.on("close", function () {
                resolve({ contratos, path })

            });
            closefile(rl);
        } catch (e) {
            reject(e)
        }
    })

}
