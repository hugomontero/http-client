const request = require("./libs/request")
const HTTPS = 'https'
const HTTP = 'http'

const methods= {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

const get = request_type => async ({host, port, path, headers})=>{
    return await request[request_type]({host, port, path, headers, method: methods.GET})
}

const post = request_type => async ({host, port, path, headers, body})=>{
    return await request[request_type]({host, port, path, headers, body, method: methods.POST})
}

const put = request_type => async ({host, port, path, headers, body})=>{
    return await request[request_type]({host, port, path, headers, body, method: methods.PUT})
}

const patch = request_type => async ({host, port, path, headers, body})=>{
    return await request[request_type]({host, port, path, headers, body, method: methods.PATCH})

}

const del = request_type => async ({host, port, path, headers})=>{
    return await request[request_type]({host, port, path, headers,  method: methods.DELETE})
}




module.exports = {
    https:{
        get: get(HTTPS),
        post: post(HTTPS),
        put: put(HTTPS),
        patch: patch(HTTPS),
        delete: del(HTTPS)
    },
    http:{
        get: get(HTTP),
        post: post(HTTP),
        put: put(HTTP),
        patch: patch(HTTP),
        delete: del(HTTP)
    }

}
