const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const files = ['index.html', 'main.js']
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const options = { partSize: 10 * 1024 * 1024, queueSize: 1 }

const upload = () => {
    return files.map(file => {
        const content = fs.readFileSync(`dist/${file}`)
        const params = {
            Bucket: 'movies-app-demo',
            Key: file,
            Body: JSON.stringify(content)
        }
        s3.upload(params, options, err => !err)
    })
}
upload()