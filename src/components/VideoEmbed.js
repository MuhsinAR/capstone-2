import React from 'react';

const VideoEmbed = ({ videoId }) => {
  return (
    <div className="lg:ml-0"> {/* This class will ensure left alignment on large screens */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full max-w-xl mx-auto lg:mx-0" // Adjusted class
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
