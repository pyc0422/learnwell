'use client';

const FullScreenPlayer:React.FC<{url:string}> = ({ url }) => (
  <div>
    <video controls autoPlay style={{ width: '100%', height: '100%' }}>
      <source src={url} type="video/mp4" />
    </video>
  </div>
);

export default FullScreenPlayer;
