package service

import (
	"fmt"
	"github.com/labstack/gommon/log"
	"io"
	"net/http"
)

// FilesRename 批量重命名
func (a *App) GetXhsBackgroundPicture() {

}

func GetBackGroundPictureNoLogin(url string) {

}

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
