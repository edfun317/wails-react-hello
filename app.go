package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) NowTime() string {

	return time.Now().UTC().Format(time.RFC3339)
}

// CardIDSettings 結構體用於接收前端數據
type CardIDSettings struct {
	ID       int    `json:"id"`
	CustomID string `json:"customId"`
}

// App 結構體中添加新方法
func (a *App) SaveCardSettings(settings []CardIDSettings) error {
	// TODO: 實現您的儲存邏輯，例如：
	// - 儲存到數據庫
	// - 寫入文件
	// - 更新配置等

	// 示例：打印接收到的設定
	log.Printf("Received card settings: %+v", settings)

	// 可以在這裡添加數據驗證
	for _, setting := range settings {
		if setting.CustomID == "" {
			return fmt.Errorf("custom ID cannot be empty for card %d", setting.ID)
		}
	}

	// 發送成功事件回前端
	runtime.EventsEmit(a.ctx, "card-settings-saved", true)

	return nil
}
