function bridge(muneem, express_mw){
    muneem.after("route", (asked, answer) => {
        express_mw(asked, answer, (err) => {
            if( err && typeof err !== 'string') throw Error(err);
        })
    })
}

module.exports = bridge;