const http = require("http")
const https = require("https")

const bodyParser = async (body, headers)=>{
     if(headers && headers['Content-Type']==='application/json'){
         return JSON.stringify(body)
     }

     return body
}


const request = ({requestType}) => async ({host, port=null, path=null, method, body = null, headers=null, options: {timeout=null , rejectUnauthorized=false}} )=>{
    let payload = null

    const options = {
        hostname: host,
        port,
        path,
        method,
        headers: headers || {'Content-Type': 'text/html'},
        timeout: timeout || 3000,
        rejectUnauthorized
    }

    if(body){
        payload = await bodyParser(body)
        options.headers['Content-Length'] = Buffer.byteLength(payload)
    }

    return new Promise((resolve, reject)=>{

        const req = requestType.request(options, res=>{
            res.setEncoding('utf8')
            let response = ''
            res.on('data', chunk=>{
                response += chunk
            })

            res.on('end', chunk =>{
                response += chunk
                resolve(response)
            })
        })

        req.on('error', error=>{
            reject(error)
        })
        if(payload){
            req.write(payload)
        }
        req.on('timeout', ()=>{
            req.abort()
            reject("timeout error")
        })

        req.end()

    })
}

module.exports ={
    https: request({requestType: https}),
    http: request({requestType: http})
}

