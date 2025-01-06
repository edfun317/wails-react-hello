import { useState, useEffect } from 'react'
// 修改導入路徑
import { GetHello, NowTime } from '../../wailsjs/go/main/App'
import { EventsOn } from '../../wailsjs/runtime/runtime'

function Home() {
  const [greeting, setGreeting] = useState("等待問候...")
  const [name, setName] = useState("")
  const [backendMessage, setBackendMessage] = useState("")
  const [now, setNow] = useState("")

  useEffect(() => {
    // 監聽後端發送的訊息
    const cleanup = EventsOn('backend-message', (message) => {
      setBackendMessage(message)
    })
    return () => cleanup()
  }, [])

  const handleGetHello = async () => {
    try {
      const result = await GetHello(name)
      setGreeting(result)
     
      const t = await NowTime()
      setNow(t)

    } catch (err) {
      console.error(err)
      setGreeting("發生錯誤")
    }
  }

  return (
    <div className="container">
      <h1>Wails + React 示例</h1>
      <div className="input-group">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="輸入你的名字"
        />
        <button onClick={handleGetHello}>取得問候</button>
      </div>
      <p className="greeting">{greeting}</p>
      <p> time is :{now}</p>
      {backendMessage && (
        <p className="backend-message">{backendMessage}</p>
      )}
    </div>
  )
}

export default Home