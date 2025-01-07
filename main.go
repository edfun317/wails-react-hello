package main

import (
	"context"
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed frontend/dist
var assets embed.FS

// GetHello 是一個示例方法，展示前後端溝通
func (a *App) GetHello(name string) string {
	// 記錄收到的請求，這在開發時很有幫助
	runtime.LogInfo(a.ctx, fmt.Sprintf("Received GetHello request with name: %s", name))

	if name == "" {
		name = "World"
	}
	return fmt.Sprintf("Hello %s!", name)
}

func main() {
	// 創建一個新的應用程式實例
	app := NewApp()

	// 配置並啟動應用程式
	err := wails.Run(&options.App{
		Title:            "Wails React Hello",
		Width:            1024,
		Height:           768,
		OnStartup:        app.startup,
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		Menu:             makeMenu(app),
		AssetServer: &assetserver.Options{
			// 在開發模式下，這個設置允許 Wails 正確處理前端資產
			Assets: assets,
		},
		OnDomReady: func(ctx context.Context) {
			// 當前端 DOM 準備就緒時被調用
			runtime.LogInfo(ctx, "Application DOM is ready")
		},
		// 綁定後端方法，使其可以被前端調用
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		// 如果應用程式啟動失敗，輸出錯誤信息
		fmt.Println("Error starting application:", err)
	}
}
