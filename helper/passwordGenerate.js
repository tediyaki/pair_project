const crypto = require('crypto')

function saltThePassword(pass, secret) {
    const hash = crypto.createHmac('sha256', secret)
                        .update(pass)
                        .digest('hex')
    return hash
}

module.exports = saltThePassword