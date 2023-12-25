(function (fs, exec) {
    if (fs.existsSync('./src/server/build')) {
        fs.rmdirSync('./src/server/build', {recursive: true})
    }
    if (fs.existsSync('./src/client/build')) {
        fs.rmdirSync('./src/client/build', {recursive: true})
    }
    exec('npm run build:client')
      .then(function(r) {
        return exec('npm run build:server')
    }).then(function(r) {
        if (fs.existsSync('./build')) {
            fs.rmdirSync('./build', {recursive: true})
        }
        fs.mkdirSync('./build')
        fs.cpSync('./src/server/build', './build', {recursive: true})
        fs.cpSync('./src/client/build', './build/client', {recursive: true})
    }).then(function(r) {
        return exec('npm run build:package')
    }).then(function(r) {
        fs.rmdirSync('./build/Forza', {recursive: true})
        fs.rmSync('./build/main.js')
        fs.rmSync('./build/main.js.map')
    })
})(require('fs'), require('util').promisify(require('child_process').exec))



