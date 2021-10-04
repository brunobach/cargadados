import fs from 'fs-extra';
export const CreateTXT = (data: any, path: string, contrato: string) => {
    let path_reproc = './concluido/reproc/' + path.slice(0, -4) + '_reproc.txt'
    if (!fs.existsSync('./concluido/reproc')) {
        fs.mkdirSync('./concluido/reproc', { recursive: true })
    }
    if (fs.existsSync(path_reproc)) {
        let _fileRead = fs.readFileSync(path_reproc).toString()
        const reContrato = new RegExp(contrato, "g")
        if (_fileRead.search(reContrato) === -1) {
            _fileRead = `${_fileRead}\n${data}`
            fs.writeFileSync(path_reproc, _fileRead);
        }
    } else {
        fs.writeFileSync(path_reproc, data);
    }
}