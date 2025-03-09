import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Progress,
} from 'blackwork'
import { CD, Paused, Play } from 'blackwork/icons'
import React from 'react'
import { type BgmConfig } from '@/config/content-config'
import { getBrbStyle, getBrbVariant } from '@/config/style-config'
import { cn } from '@/utils'
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
        'relative flex shrink-0 overflow-hidden rounded-full',
        isMobile ? 'size-[90px]' : 'size-[66px]',
      )}
    >
      <Avatar
        className={cn(
          'size-full',
          'border-input box-border border border-solid p-3',
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
          className="border-input box-border overflow-hidden rounded-full border border-solid"
          src={albumCover}
          alt={fullName}
        />
        <AvatarFallback>{fullName}</AvatarFallback>
      </Avatar>

      <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="size-full !bg-transparent"
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
      <span className="text-foreground line-clamp-2 text-base font-medium">
        {title}
      </span>

      {musician && (
        <span className="text-muted-foreground truncate text-xs">
          {musician}
        </span>
      )}
    </div>
  )
}

const GuideArrow: React.FC = () => {
  return (
    <div
      className="border-l-input absolute right-[-8px] top-[12px] size-0
       border-y-8 border-l-8
       border-y-transparent"
    >
      <div
        className="border-l-background absolute left-[-8px] top-[-6px] size-0
         border-y-[6px] border-l-[6px]
         border-y-transparent"
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
    <div className="flex size-full gap-3">
      {discRender}

      <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden">
        {musicianRender}

        <div className="flex w-full shrink-0 items-center gap-3">
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
    <div className="flex size-full flex-col gap-3">
      <div className="flex flex-1 gap-3 overflow-hidden">
        {discRender}
        {musicianRender}
      </div>

      <div className="flex w-full shrink-0 items-center gap-3">
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

  const [visible, setVisible] = useState(!isMobile)

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
        className="flex h-1 flex-1 overflow-hidden"
      />
    ),
    [progress],
  )

  const timeRender = useMemo(
    () => (
      <span
        className={cn('text-muted-foreground flex shrink-0 text-xs', {
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
          'box-border flex items-center justify-between gap-6 p-3',
          'border-input rounded-md border border-solid',
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
