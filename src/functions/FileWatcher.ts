import chokidar from 'chokidar'
import { FileQuery } from '../services/FileQuery';

export const fileWatcher = () => {
    console.log('--> Aguardando arquivo [.txt]...')
    const watcher = chokidar.watch(['**.txt', '**.TXT'], {
        ignored: ['node_modules', 'concluido'],
        persistent: true
    });
    watcher
        .on('add', file => { console.log(`--> Arquivo ${file} foi adicionado`); FileQuery(file, "read") })
}