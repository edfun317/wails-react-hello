package main

import (
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// 建立選單並處理回調
func makeMenu(app *App) *menu.Menu {
	appMenu := menu.NewMenu()

	// 檔案選單
	fileMenu := appMenu.AddSubmenu("檔案")

	// 新增檔案
	fileMenu.AddText("新增檔案", keys.CmdOrCtrl("n"), func(_ *menu.CallbackData) {
		// 開啟檔案對話框
		filePath, err := runtime.OpenFileDialog(app.ctx, runtime.OpenDialogOptions{
			Title: "選擇要開啟的檔案",
			Filters: []runtime.FileFilter{
				{
					DisplayName: "文字檔案 (*.txt)",
					Pattern:     "*.txt",
				},
			},
		})

		if err != nil {
			runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
				Type:    runtime.ErrorDialog,
				Title:   "錯誤",
				Message: "開啟檔案失敗：" + err.Error(),
			})
			return
		}

		if filePath != "" {
			// 處理選擇的檔案
			runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
				Type:    runtime.InfoDialog,
				Title:   "成功",
				Message: "已選擇檔案：" + filePath,
			})
		}
	})

	// 儲存檔案
	fileMenu.AddText("儲存", keys.CmdOrCtrl("s"), func(_ *menu.CallbackData) {
		filePath, err := runtime.SaveFileDialog(app.ctx, runtime.SaveDialogOptions{
			Title: "儲存檔案",
			Filters: []runtime.FileFilter{
				{
					DisplayName: "文字檔案 (*.txt)",
					Pattern:     "*.txt",
				},
			},
		})

		if err != nil {
			runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
				Type:    runtime.ErrorDialog,
				Title:   "錯誤",
				Message: "儲存檔案失敗：" + err.Error(),
			})
			return
		}

		if filePath != "" {
			runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
				Type:    runtime.InfoDialog,
				Title:   "成功",
				Message: "檔案已儲存至：" + filePath,
			})
		}
	})

	// 分隔線
	fileMenu.AddSeparator()

	// 退出應用
	fileMenu.AddText("退出", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		runtime.Quit(app.ctx)
	})

	// 編輯選單
	editMenu := appMenu.AddSubmenu("視窗")

	// 最小化視窗
	editMenu.AddText("最小化", keys.CmdOrCtrl("m"), func(_ *menu.CallbackData) {
		runtime.WindowMinimise(app.ctx)
	})

	// 最大化視窗
	editMenu.AddText("最大化", keys.CmdOrCtrl("w"), func(_ *menu.CallbackData) {
		runtime.WindowMaximise(app.ctx)
	})

	// 全螢幕
	editMenu.AddText("全螢幕", keys.Key("F11"), func(_ *menu.CallbackData) {
		runtime.WindowFullscreen(app.ctx)
	})

	// 在 makeMenu 函數中添加設定選單
	settingsMenu := appMenu.AddSubmenu("設定")
	settingsMenu.AddText("顯示配置面板", keys.CmdOrCtrl(","), func(_ *menu.CallbackData) {
		runtime.EventsEmit(app.ctx, "toggle-config-panel")
	})
	settingsMenu.AddText("卡片 ID 設定", keys.CmdOrCtrl("i"), func(_ *menu.CallbackData) {
		runtime.EventsEmit(app.ctx, "open-card-id-settings")
	})
	return appMenu
}
