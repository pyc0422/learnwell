
interface ControlProps {
  fullScreen:boolean,
  toggleFullScreen:(val:boolean) => void,
  volume:number,
  changeVolume: (volumn:number) => void,
  playbackRate:number,
  changePlaybackRate: (rate:number) => void
}

const ControlBtns: React.FC<ControlProps> = ({
  fullScreen, toggleFullScreen,volume, changeVolume, playbackRate,changePlaybackRate
}) => {

  return (
    <div className="absolute bottom-2 right-2 p-2 flex gap-2 mt-2">
      <button
        onClick={() => changePlaybackRate(playbackRate - 0.25)}
        className="fs-btn"
      >
        Speed Down
      </button>
      <button
        onClick={ () => changePlaybackRate(1)}
        className="fs-btn"
      >
        Normal
      </button>
      <button
        onClick={ () => changePlaybackRate(playbackRate + 0.25)}
        className="fs-btn"
      >
        Speed Up
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        className="w-24"
      />
      <span className="text-gray-700 dark:text-gray-300">{volume}%</span>
      <button
      onClick={() => toggleFullScreen(!fullScreen)}
      className="p-2 bg-black bg-opacity-50 text-white rounded"
    >
      {fullScreen ? 'Exit Full Screen' : 'Full Screen'}
    </button>
    </div>
  )
}

export default ControlBtns;