require('dotenv').config()
const cloudinary = require('cloudinary').v2

// Configure
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log('--- CLOUDINARY CONFIG ---')
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '*** Present ***' : 'MISSING')
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '*** Present ***' : 'MISSING')

// Test Upload
// We need a dummy image. checking if we have one or create a text file.
const fs = require('fs')
const testFile = 'test_upload.txt'
fs.writeFileSync(testFile, 'This is a test upload for Cloudinary')

console.log('\nAttempting upload...')

cloudinary.uploader.upload(testFile, { resource_type: 'raw' }, (error, result) => {
    if (error) {
        console.error('❌ UPLOAD FAILED:')
        console.error(error)
    } else {
        console.log('✅ UPLOAD SUCCESS!')
        console.log('URL:', result.secure_url)
    }

    // Cleanup
    fs.unlinkSync(testFile)
})
