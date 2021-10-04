
import fastq, { queueAsPromised } from "fastq"
import { workerFileRead, workerFileWatcher, workerMongo } from './worker'
export type QueueMongo = {
    contrato: string;
    database: string;
    idx: number;
    size: number;
    file?: string;
}

export type QueueFileWatcher = {
    contratos: string[];
    name: string;
    file?: string;
}

export type QueueFileRead = {
    file: string;
    type?: "read" | "write";
    contrato?: string;
}

const CONCURRENCY = 1;

export const queueMongo: queueAsPromised<QueueMongo> = fastq.promise(workerMongo, CONCURRENCY)
export const queueFileWatcher: queueAsPromised<QueueFileWatcher> = fastq.promise(workerFileWatcher, CONCURRENCY)
export const queueFileRead: queueAsPromised<QueueFileRead> = fastq.promise(workerFileRead, CONCURRENCY)