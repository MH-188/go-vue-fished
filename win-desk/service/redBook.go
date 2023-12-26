package service

import (
	"encoding/base64"
	"fmt"
	"github.com/MH-188/clawer/network"
	"github.com/MH-188/clawer/xhs"
	"github.com/labstack/gommon/log"
	"io"
	"net/http"
	"os"
	"time"
)

type outGetXhsBackgroundPictureParam struct {
	Response
	Images     []string `json:"images"`
	ImagesData []string `json:"imagesData"`
}

// GetXhsBackgroundPicture 获取背景图
func (a *App) GetXhsBackgroundPicture(noteUrl string) outGetXhsBackgroundPictureParam {
	images := make([]string, 0)
	imagesData := make([]string, 0)
	out := outGetXhsBackgroundPictureParam{
		Response: GenResponse(200, "success"),
	}

	client := xhs.NewXhsClient()
	images, err := client.GetNotePageInfo(noteUrl)
	if err != nil {
		log.Error(err)
		out.Response = GenResponse(500, err.Error())
		return out
	}

	for i := 0; i < len(images); i++ {
		bytes, err := network.HttpDoRequest(client.HttpClient, "GET", images[i], client.XhsHeader, nil)
		if err != nil {
			log.Error(err)
			out.Response = GenResponse(500, err.Error())
			return out
		}

		base64Str := base64.StdEncoding.EncodeToString(bytes)

		imagesData = append(imagesData, base64Str)
	}

	fmt.Println(len(imagesData))

	out.ImagesData = imagesData
	out.Images = images

	return out
}

// SaveAllPicture 一键保存图片
func (a *App) SaveAllPicture(savePath string, pictureData []string) Response {
	_, err := os.Stat(savePath)
	if err != nil {
		errMsg := fmt.Sprintf("Error: 保存路径不存在 %v", err)
		log.Errorf(errMsg)
		return GenResponse(500, errMsg)
	}

	nowT := time.Now().Unix()
	for i := 0; i < len(pictureData); i++ {
		path := fmt.Sprintf("%s\\%d%d.png", savePath, nowT, i)
		file, err := os.Create(path)
		if err != nil {
			log.Error(err)
			return GenResponse(500, err.Error())
		}

		decodeData, err := base64.StdEncoding.DecodeString(pictureData[i])
		if err != nil {
			log.Error(err)
			return GenResponse(500, err.Error())
		}

		_, err = file.Write(decodeData)
		file.Close()
	}

	return GenResponse(200, "success")
}

// 暂时没有使用
func HttpXhsGet(url string) ([]byte, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Errorf("Error: %v", err)
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	//if response.StatusCode >= 300 && response.StatusCode < 400 {
	//	HttpXhsGet()
	//} else
	if !(response.StatusCode < 300 && response.StatusCode >= 200) {
		err = fmt.Errorf("http response code err：%d", response.StatusCode)
		return nil, err
	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}
