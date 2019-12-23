import { renderFile } from 'ejs'
import { Metadata } from './metadata-retriever'

export default class SObjectCreator {
  async convert(template: string, metadata: Metadata) {
    return new Promise((resolve, reject) => {
      renderFile(template, metadata, {}, (err: any, str: string) => {
        if (err) {
          reject(err)
          return
        }
        resolve(str)
      })
    })
  }
}