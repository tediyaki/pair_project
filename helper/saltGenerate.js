function createSalt(string) {
    const ALL = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789'
    let garam = ''
    let length = Math.ceil(Math.random() * 5) + 5
    for(let i=0; i < length; i++) {
        let randomLetter = ALL[Math.floor(Math.random() * ALL.length)]
        garam += randomLetter
        garam += string[Math.floor(Math.random() * string.length)]
    }
    return garam
}

module.exports = createSalt