
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
        onClick={() => changePlaybackRate(0.5)}
        className="fs-btn"
      >
        0.5x
      </button>
      <button
        onClick={() => changePlaybackRate(1)}
        className="fs-btn"
      >
        1x
      </button>
      <button
        onClick={() => changePlaybackRate(1.5)}
        className="fs-btn"
      >
        1.5x
      </button>
      <button
        onClick={() => changePlaybackRate(2)}
        className="fs-btn"
      >
        2x
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