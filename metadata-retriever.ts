const jsforce: any = require('jsforce')

export interface Metadata {
  name: string
  fields: Field[]
}

export interface Field {
  name: string
  type: string
}

export class MetadataRetriever {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  retrieve(sobject_name: string): Promise<Metadata> {
    const conn = new jsforce.Connection();
    return new Promise((resolve, reject)=> {
      conn.login(this.username, this.password, (err: any, res: any) => {
        if (err) {
          reject(err)
          return
        }
        conn.sobject(sobject_name).describe((err: any, meta: Metadata) => {
          if (err) {
            reject(err)
            return
          }
          resolve(meta)
        })
      })
    })
  }
}