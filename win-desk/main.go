package main

import (
	"changeme/service"
	"embed"
	"github.com/labstack/gommon/log"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"os"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := service.NewApp()

	dirPath := "./download"
	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
		// 目录不存在，创建目录
		err = os.MkdirAll(dirPath, os.ModePerm)
		if err != nil {
			log.Error("Error:", err)
			return
		}
		log.Debug("Directory created successfully.")
	} else {
		log.Debug("Directory already exists.")
	}

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "AiTeTool",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
