package service

import (
	"fmt"
	"github.com/labstack/gommon/log"
	"io"
	"os"
	"strings"
)

type RenameInfo struct {
	FilePath            string `json:"filePath"`
	Rename              string `json:"rename"`
	OutPutDirectoryPath string `json:"outPutDirectoryPath"`
}

// FilesRename 批量重命名
func (a *App) FilesRename(renameList []RenameInfo) Response {

	fmt.Println(renameList)

	for i := 0; i < len(renameList); i++ {
		//最后一个 反斜杠\
		lastIndex := strings.LastIndex(renameList[i].FilePath, "\\")
		if lastIndex <= 0 {
			log.Error(fmt.Errorf("文件路径错误"))
			return GenResponse(500, "文件路径错误")
		}
		srcFilePath := renameList[i].FilePath[:lastIndex]
		log.Debug("原来的路径：", srcFilePath)
		log.Debug("输出路径：", renameList[i].OutPutDirectoryPath)
		if srcFilePath == renameList[i].OutPutDirectoryPath {
			fmt.Println("重命名源文件: ", renameList[i].FilePath, fmt.Sprintf("%s\\%s", renameList[i].OutPutDirectoryPath, renameList[i].Rename))
			err := os.Rename(renameList[i].FilePath, fmt.Sprintf("%s\\%s", renameList[i].OutPutDirectoryPath, renameList[i].Rename))
			if err != nil {
				log.Error(err)
				return GenResponse(500, err.Error())
			}
		} else {
			fmt.Println("拷贝源文件输出到新的路径")
			sourceFile, err := os.Open(renameList[i].FilePath)
			if err != nil {
				log.Error(err)
				return GenResponse(500, err.Error())
			}

			destinationFile, err := os.Create(fmt.Sprintf("%s\\%s", renameList[i].OutPutDirectoryPath, renameList[i].Rename))
			if err != nil {
				log.Error(err)
				return GenResponse(500, err.Error())
			}

			_, err = io.Copy(destinationFile, sourceFile)
			if err != nil {
				log.Error(err)
				return GenResponse(500, err.Error())
			}

			sourceFile.Close()
			destinationFile.Close()
		}
	}

	return GenResponse(200, "success")
}
