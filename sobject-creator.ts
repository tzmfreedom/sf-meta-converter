import { render } from 'ejs'
import { Metadata } from './metadata-retriever'
import {readFile} from "fs";
import {promisify} from "util";
import {parse} from 'url';
const rp = require('request-promise');

export default class SObjectCreator {
  async convert(filepath: string, metadata: Metadata) {
    const template = await this.readData(filepath)
    return render(template, metadata, {})
  }

  async readData(template: string) {
    const uri = parse(template)
    if (uri.protocol === 'http:' || uri.protocol === 'https:') {
      return rp(template)
    }
    return promisify(readFile)(template, {}).then((data) => data.toString())
  }
}