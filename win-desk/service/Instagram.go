package service

import (
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/labstack/gommon/log"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"runtime"
	"strings"
)

type outGetInsBackgroundPictureParam struct {
	Response
	Images     []string `json:"images"`
	ImagesData []string `json:"imagesData"`
}

// GetInsBackgroundPicture 获取背景图
func (a *App) GetInsBackgroundPicture(noteUrl string) outGetInsBackgroundPictureParam {
	images := make([]string, 0)
	imagesData := make([]string, 0)
	out := outGetInsBackgroundPictureParam{
		Response: GenResponse(200, "success"),
	}

	resourceUrl := strings.TrimSpace(noteUrl)

	code := ""
	if len(resourceUrl) > 28 {
		//提取短code https://www.instagram.com/p/C22FuIKPIV6/?igsh=MWUxNXgyNnVoY2F3Mw==
		index := strings.Index(resourceUrl, "https://www.instagram.com/p/") //+28

		if index < 0 {
			err := errors.New("输入链接错误")
			log.Error(err)
			out.Response = GenResponse(500, err.Error())
			return out
		}

		beginIndex := index + 28
		index = strings.Index(resourceUrl[beginIndex+1:], "/")

		if index < 0 {
			err := errors.New("输入链接错误")
			log.Error(err)
			out.Response = GenResponse(500, err.Error())
			return out
		}

		endIndex := index + beginIndex + 1
		log.Debug(beginIndex, endIndex)
		code = resourceUrl[beginIndex:endIndex]
		log.Debug(code)
	}

	//D:\GoogleDownload\instaloader-v4.10.3-windows-standalone\ -- -B_K4CykAOtf
	_, filename, _, _ := runtime.Caller(0)
	ptPath := path.Dir(filename)
	fmt.Println("----------------------------------> ptPath:", ptPath)
	dir := fmt.Sprintf("-%s", code)
	cmd := exec.Command(ptPath+"/script/"+"instaloader", "--", dir)
	cmd.Dir = "./download"
	// 设置输出到标准输出和标准错误
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	//运行命令
	err := cmd.Run()
	if err != nil {
		log.Error(err)
		out.Response = GenResponse(500, err.Error())
		return out
	}

	fileDir := fmt.Sprintf("./download/%s", dir)
	files, err := ioutil.ReadDir(fileDir)
	for _, file := range files {
		jpgIndex := strings.Index(file.Name(), ".jpg")
		if jpgIndex > 0 {
			filePath := fmt.Sprintf("%s/%s", fileDir, file.Name())
			log.Debug(filePath)
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				log.Error("Error reading file:", filePath, "-", err)
				out.Response = GenResponse(500, err.Error())
				return out
			}
			//将图片数据返回给页面展示
			base64Str := base64.StdEncoding.EncodeToString(content)
			imagesData = append(imagesData, base64Str)
		}

	}

	out.ImagesData = imagesData
	out.Images = images

	return out
}
