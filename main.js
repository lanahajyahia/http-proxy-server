//promise based HTTP client for the browser
const axios = require('axios');
const https = require('https');
let httpProxy = require('hoxy');

// start listening at port 3000
let proxy = httpProxy.createServer().listen(3000);
try {
    proxy.intercept({ phase: 'request', as: 'string' }, async req => {
        const body = req.string;
        await sendData({
            host: req.hostname,
            url: req.url,
            method: req.method,
            body_string: body,
            headers: req.headers
        });

        console.log("REQUEST method", { host: req.hostname, url: req.url, method: req.method, headers: req.headers, body_string: body, query: req.query });

        req.headers['x-unicorns'] = 'unicorns';

    });
} catch (e) {
    console.error({ e });
}

async function sendData(data) {
    try {
        const response = await axios.post('https://localhost//models/HTTPanalyse.php', data, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        console.log(response);
    } catch (e) {
        console.error({ e });
    }

}