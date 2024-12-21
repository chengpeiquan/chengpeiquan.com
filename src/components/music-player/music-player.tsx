import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Progress,
} from 'blackwork'
import { CD, Paused, Play } from 'blackwork/icons'
import { cn } from '@/utils'
import { getBrbStyle, getBrbVariant } from '@/config/style-config'
import { type BgmConfig } from '@/config/content-config'
import { timeDisplay, useMusicPlayer } from './use-music-player'

interface MusicPlayerProps
  extends Omit<React.AudioHTMLAttributes<HTMLAudioElement>, 'src' | 'title'>,
    BgmConfig {
  isMobile: boolean
}

interface MusicDiscProps
  extends Required<
    Pick<
      MusicPlayerProps,
      'title' | 'musician' | 'albumCover' | 'style' | 'isMobile'
    >
  > {
  playing: boolean
  togglePlay: () => void
}

const MusicDisc: React.FC<MusicDiscProps> = ({
  isMobile,
  musician,
  title,
  albumCover,
  style,
  playing,
  togglePlay,
}) => {
  const ButtonIcon = playing ? Paused : Play
  const fullName = `${title}-${musician}`

  return (
    <div
      className={cn(
        'relative flex shrink-0 rounded-full overflow-hidden',
        isMobile ? 'w-[90px] h-[90px]' : 'w-[66px] h-[66px]',
      )}
    >
      <Avatar
        className={cn(
          'w-full h-full',
          'border border-solid border-input p-3 box-border',
          { 'animate-spin': playing },
        )}
        style={{
          ...style,
          backgroundImage: `url('https://cdn.chengpeiquan.com/img/2024/11/202412212136847.png?x-oss-process=image/interlace,1')`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <AvatarImage
          className="border border-solid border-input box-border rounded-full overflow-hidden"
          src={albumCover}
          alt={fullName}
        />
        <AvatarFallback>{fullName}</AvatarFallback>
      </Avatar>

      <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full z-10">
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-full !bg-transparent"
          onClick={togglePlay}
        >
          <ButtonIcon className={cn(isMobile ? 'size-10' : 'size-6')} />
        </Button>
      </div>
    </div>
  )
}

const Musician: React.FC<
  Pick<MusicPlayerProps, 'title' | 'musician' | 'isMobile'>
> = ({ isMobile, title, musician }) => {
  return (
    <div
      className={cn('flex gap-2 overflow-hidden', {
        'flex-1 justify-center flex-col': isMobile,
        'items-center': !isMobile,
      })}
    >
      <span className="text-foreground text-base font-medium line-clamp-2">
        {title}
      </span>

      {musician && (
        <span className="text-muted-foreground text-xs truncate">
          {musician}
        </span>
      )}
    </div>
  )
}

const GuideArrow: React.FC = () => {
  return (
    <div
      className="absolute top-[12px] -right-[8px] w-0 h-0
       border-t-[8px] border-t-transparent
       border-b-[8px] border-b-transparent
       border-l-[8px] border-l-input"
    >
      <div
        className="absolute top-[-6px] left-[-8px] w-0 h-0
         border-t-[6px] border-t-transparent
         border-b-[6px] border-b-transparent
         border-l-[6px] border-l-background"
      ></div>
    </div>
  )
}

interface PlayerLayoutProps {
  discRender: React.ReactNode
  musicianRender: React.ReactNode
  progressRender: React.ReactNode
  timeRender: React.ReactNode
}

const DesktopPlayerLayout: React.FC<PlayerLayoutProps> = ({
  discRender,
  musicianRender,
  progressRender,
  timeRender,
}) => {
  return (
    <div className="flex gap-3 w-full h-full">
      {discRender}

      <div className="flex flex-col gap-2 justify-center flex-1 overflow-hidden">
        {musicianRender}

        <div className="flex shrink-0 items-center gap-3 w-full">
          {progressRender}
          {timeRender}
        </div>
      </div>
    </div>
  )
}

const MobilePlayerLayout: React.FC<PlayerLayoutProps> = ({
  discRender,
  musicianRender,
  progressRender,
  timeRender,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="flex gap-3 flex-1 overflow-hidden">
        {discRender}
        {musicianRender}
      </div>

      <div className="flex shrink-0 items-center gap-3 w-full">
        {progressRender}
        {timeRender}
      </div>
    </div>
  )
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isMobile,
  src,
  title,
  musician = '',
  albumCover,
  loop = true,
  preload = 'auto',
  controls = true,
  ...rest
}) => {
  const {
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
  } = useMusicPlayer()

  const [visible, setVisible] = useState(false)

  const animationStyle: React.CSSProperties = useMemo(
    () => ({
      animationDuration: playing ? '3000ms' : undefined,
    }),
    [playing],
  )

  const brbStyle = getBrbStyle(isMobile ? 2 : 1, isMobile)

  const discRender = useMemo(
    () => (
      <MusicDisc
        isMobile={isMobile}
        title={title}
        musician={musician}
        albumCover={albumCover}
        style={animationStyle}
        playing={playing}
        togglePlay={togglePlay}
      />
    ),
    [
      animationStyle,
      musician,
      albumCover,
      isMobile,
      playing,
      title,
      togglePlay,
    ],
  )

  const musicianRender = useMemo(
    () => <Musician isMobile={isMobile} title={title} musician={musician} />,
    [isMobile, musician, title],
  )

  const progressRender = useMemo(
    () => (
      <Progress
        value={progress}
        max={100}
        className="flex flex-1 overflow-hidden h-1"
      />
    ),
    [progress],
  )

  const timeRender = useMemo(
    () => (
      <span
        className={cn('flex shrink-0 text-muted-foreground text-xs', {
          invisible: loading,
          'w-[80px] justify-end': !isMobile,
        })}
      >
        {timeDisplay(currentTime)} / {timeDisplay(duration)}
      </span>
    ),
    [currentTime, duration, isMobile, loading],
  )

  const PlayerLayout = useMemo(
    () => (isMobile ? MobilePlayerLayout : DesktopPlayerLayout),
    [isMobile],
  )

  return (
    <>
      <Button
        size="icon"
        variant={!isMobile && visible ? 'outline' : getBrbVariant(isMobile)}
        style={brbStyle}
        onClick={() => setVisible((v) => !v)}
      >
        <CD
          className={cn('size-5', { 'animate-spin': playing })}
          style={animationStyle}
        />
      </Button>

      <div
        className={cn(
          'fixed right-[72px]',
          'not-prose bg-background',
          'flex items-center justify-between gap-6 box-border p-3',
          'border border-solid border-input rounded-md',
          visible ? 'flex' : 'hidden',
          {
            'right-[72px] bottom-[20px] left-[20px] h-[144px]': isMobile,
            'right-[64px] bottom-[12px] w-[300px] h-[92px]': !isMobile,
          },
        )}
        style={{ zIndex: brbStyle.zIndex }}
      >
        <audio
          {...rest}
          ref={audioRef}
          className="hidden"
          src={src}
          loop={loop}
          preload={preload}
          controls={controls}
          onLoadedMetadata={(e) => {
            const target = e.target as HTMLAudioElement
            setDuration(+target.duration)
            setLoading(false)
          }}
          onTimeUpdate={() => {
            const ctime = audioRef.current?.currentTime ?? 0
            setCurrentTime(ctime)
          }}
        />

        <GuideArrow />

        <PlayerLayout
          discRender={discRender}
          musicianRender={musicianRender}
          progressRender={progressRender}
          timeRender={timeRender}
        />
      </div>
    </>
  )
}

export default memo((props: MusicPlayerProps) => <MusicPlayer {...props} />)
