import SObjectCreator from "./sobject-creator";
import { Command } from 'commander'
import { MetadataRetriever, Metadata } from "./metadata-retriever"
import { statSync } from 'fs'

const p = (() => {
  try {
    statSync(__dirname + '/../package.json')
    return require(__dirname + '/../package.json')
  } catch (e) {
    return require(__dirname + '/package.json')
  }
})()

const program = new Command()
program
  .version(p.version)
  .option('-d, --debug', 'output extra debugging')
  .option('-t, --template <template>', 'ejs template', './templates/sobject.js.ejs')
  .option('-T, --type <type>', 'SObject Type (e.g. Account)')
program.parse(process.argv)

const user = process.env.SALESFORCE_USERNAME
const pass = process.env.SALESFORCE_PASSWORD;
const templateAlias: any = {
  ts: './templates/sobject.ts.ejs',
  js: './templates/sobject.js.ejs',
  apex: './templates/sobject.cls.ejs',
};

(async () => {
  const retriever = new MetadataRetriever(user!, pass!)
  const metadata = await retriever.retrieve(program.type)
  const creator = new SObjectCreator()
  let template = templateAlias.js
  if (templateAlias[program.template]) {
    template = templateAlias[program.template]
  }
  const str = await creator.convert(template, metadata)
  console.log(str)
})()
