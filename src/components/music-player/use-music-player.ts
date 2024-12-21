import { isBrowser } from '@bassist/utils'

export const timeDisplay = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const formattedMinutes = minutes.toString().padStart(2, '0')

  const seconds = Math.floor(duration % 60)
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [loading, setLoading] = useState(true)

  /**
   * Control
   */

  const [playing, setPlaying] = useState(false)
  const hasUserInteracted = useRef(false)

  const togglePlay = () => setPlaying((v) => !v)

  useEffect(() => {
    const audio = audioRef.current
    if (!playing) {
      audio?.pause()
      return
    }

    audio?.play().catch((e) => {
      console.error('[Cache audio play]', e)

      if (e.name === 'NotAllowedError' && hasUserInteracted.current) {
        hasUserInteracted.current = false
      }

      setPlaying(false)
    })
  }, [playing])

  // Auto play
  useEffect(() => {
    if (!isBrowser) return

    const run = () => {
      if (!playing && !hasUserInteracted.current) {
        hasUserInteracted.current = true
        setPlaying(true)
      }
    }

    document.addEventListener('touchstart', run)
    document.addEventListener('click', run)

    return () => {
      document.removeEventListener('touchstart', run)
      document.removeEventListener('click', run)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Duration
   */

  const [duration, setDuration] = useState(0)

  const [currentTime, setCurrentTime] = useState(0)

  const progress = useMemo(
    () => (duration > 0 ? (currentTime / duration) * 100 : 0),
    [currentTime, duration],
  )

  return {
    audioRef,

    loading,
    setLoading,

    playing,
    togglePlay,

    duration,
    setDuration,
    currentTime,
    setCurrentTime,
    progress,
  }
}
