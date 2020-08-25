const http = require("http")
const https = require("https")

const request = ({requestType}) => ({host, port, path, method, body = null, headers, timeout=null})=>{
    let payload = null
    const options = {
        hostname: host,
        port,
        path,
        method,
        headers,
        timeout: timeout || 3000
    }

    if(body){
        payload = (body instanceof Object) ? JSON.stringify(body) : body
        options.headers['Content-Length'] = Buffer.byteLength(payload)
    }

    return new Promise((resolve, reject)=>{
        const req = requestType.request(options, res=>{
            res.setEncoding('utf8')
            let response = ''
            if(payload){
                res.write(payload)
            }
            res.on('data', chunk=>{
                response += chunk
            })

            res.on('end', () =>{
                resolve(response)
            })

            res.on('error', error=>{
                reject(error)
            })

            req.end()

            req.on('timeout', ()=>{
                req.abort()
                reject("timeout error")
            })

        })

    })
}

module.exports ={
    https: request({requestType: https}),
    http: request({requestType: http})
}

