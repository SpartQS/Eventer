"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeftRight } from "lucide-react"

interface TimerConfig {
  duration: number
  label: string
  title: string
}

const TIMER_STATES_KEY = 'timer_states'
const CURRENT_TIMER_KEY = 'current_timer_index'
const LAST_UPDATE_KEY = 'last_update_time'

export function ProfileTimer() {
  const timers: TimerConfig[] = [
    {
      duration: 40 * 40,
      label: "Время работы",
      title: "Текущий ивент Хакатон"
    },
    {
      duration: 45 * 60,
      label: "Время отдыха",
      title: "Текущий ивент Алгоритмы"
    }
  ]

  const channelRef = React.useRef<BroadcastChannel | null>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const [currentTimerIndex, setCurrentTimerIndex] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURRENT_TIMER_KEY)
      return saved ? parseInt(saved, 10) : 0
    }
    return 0
  })

  const [timerStates, setTimerStates] = React.useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      // Получаем сохраненные значения таймеров и время последнего обновления
      const savedTimers = localStorage.getItem(TIMER_STATES_KEY)
      const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)

      if (savedTimers && lastUpdate) {
        const timersData = JSON.parse(savedTimers)
        const timePassed = Math.floor((Date.now() - parseInt(lastUpdate, 10)) / 1000)

        // Обновляем значения таймеров с учетом прошедшего времени
        return timersData.map((time: number) => Math.max(0, time - timePassed))
      }
      return [timers[0].duration, timers[1].duration]
    }
    return [timers[0].duration, timers[1].duration]
  })

  // Функция обновления таймеров
  const updateTimers = React.useCallback(() => {
    setTimerStates((prev: number[]) => {
      const newStates = prev.map((time: number) => Math.max(0, time - 1))
      localStorage.setItem(TIMER_STATES_KEY, JSON.stringify(newStates))
      localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString())

      if (channelRef.current) {
        channelRef.current.postMessage({
          type: 'TIMER_UPDATE',
          timers: newStates
        })
      }

      return newStates
    })
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Инициализация BroadcastChannel
      channelRef.current = new BroadcastChannel('timer_sync')

      // Обработка сообщений от других вкладок
      channelRef.current.onmessage = (event) => {
        if (event.data.type === 'TIMER_UPDATE') {
          setTimerStates(event.data.timers)
        }
      }

      // Запуск интервала
      intervalRef.current = setInterval(updateTimers, 1000)

      return () => {
        if (channelRef.current) {
          channelRef.current.close()
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [updateTimers])

  React.useEffect(() => {
    localStorage.setItem(CURRENT_TIMER_KEY, currentTimerIndex.toString())
  }, [currentTimerIndex])

  // Обработчик видимости страницы
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // При возвращении на страницу синхронизируем состояние
        const savedTimers = localStorage.getItem(TIMER_STATES_KEY)
        const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY)

        if (savedTimers && lastUpdate) {
          const timersData = JSON.parse(savedTimers)
          const timePassed = Math.floor((Date.now() - parseInt(lastUpdate, 10)) / 1000)
          const updatedTimers = timersData.map((time: number) => Math.max(0, time - timePassed))
          setTimerStates(updatedTimers)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const switchTimer = () => {
    const nextIndex = (currentTimerIndex + 1) % timers.length
    setCurrentTimerIndex(nextIndex)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-card text-card-foreground border-border h-[450px] flex-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Таймер
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center h-[calc(100%-60px)] space-y-4">
        <div className="text-lg font-medium text-foreground mb-2">
          {timers[currentTimerIndex].title}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="text-6xl font-mono font-bold">
              {formatTime(timerStates[currentTimerIndex])}
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all"></div>
          </div>
          <div className="text-sm text-muted-foreground">
            Время до следующей стадии
          </div>
        </div>
        <button
          onClick={switchTimer}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Сменить ивент
        </button>
      </CardContent>
    </Card>
  )
} 