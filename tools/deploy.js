const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const files = [
  { name: 'index.html', contentType: 'text/html' },
  { name: 'main.js', contentType: 'text/javascript' }
]
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const upload = () => {
  return files.map((file) => {
    const params = {
      ACL: 'public-read',
      Bucket: 'movies-app-demo',
      Key: file.name,
      Body: fs.readFileSync(`dist/${file.name}`),
      ContentType: file.contentType
    }
    s3.upload(params, null, (err) => !err)
  })
}
upload()
