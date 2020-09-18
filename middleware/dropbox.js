const { Dropbox } = require("dropbox");
const fetch = require("node-fetch");
const fs = require("fs")

module.exports = function getDropbox (req, res, next) {

const dbx = new Dropbox({
    fetch,
    accessToken: 'grp0I54Bhy0AAAAAAAAAARLDLpPUKAq6RyM70A1cSOBc697DL3iDlUysO9i1B6Nv'
})

downloadLastPhoto()

async function downloadLastPhoto() {
    const lastPhoto = await getLastPhoto()
    
    const photoDownload = await dbx.filesDownload({
        path:`/${getFormatDate()}/${lastPhoto.name}`
    })
    
    res.lastPhotoMetadata = photoDownload.media_info.metadata

    fs.writeFile("./imgTest/photo.png", photoDownload.fileBinary, ()=>{
        next();
    })
}

async function getLastPhoto() {
    const lastFolder = await dbx.filesListFolder({
        path: `/${getFormatDate()}`
    })
    const lastPhoto = (lastFolder.entries[lastFolder.entries.length-1])
    return lastPhoto
}

function getFormatDate() {
    const date = new Date()
    const year = (date.getUTCFullYear())
    const month = (("0" + (date.getMonth() + 1)).slice(-2))
    const day = (("0" + date.getDate()).slice(-2))
    return(`${year}-${month}-${day}`)
}
}