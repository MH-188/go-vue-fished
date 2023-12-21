//分解文件路径
export function getPathInfo(filePath) {
    let lastSlashIndex = filePath.lastIndexOf('\\');// 获取最后一个斜杠的索引
    // 分离目录路径和文件名
    let directoryPath = filePath.substring(0, lastSlashIndex ) // 不包含斜杠
    let fileInfo=filePath.substring(lastSlashIndex + 1)//带有文件后缀的名字
    let lastPoint=fileInfo.lastIndexOf('.')
    let fileName = fileInfo.substring(0,lastPoint)//不带有后缀的名字
    let fileType=fileInfo.substring(lastPoint+1)//文件后缀
    return {
        directoryPath:directoryPath,
        fileName:fileName,
        fileType:fileType
    }
}