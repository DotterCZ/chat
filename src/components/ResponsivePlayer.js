import React from 'react'
import ReactPlayer from 'react-player';

const ResponsivePlayer = ({url}) => {

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        controls
        playing
        muted

        className='react-player'
        url={url}
        width='95%'
        height='95%'
      />
    </div>
  )
}

export default ResponsivePlayer;