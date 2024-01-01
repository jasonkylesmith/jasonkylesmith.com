import React from "react"

const YouTubeEmbed = ({ module }) => {
  const { youtubeId, name } = module

  return (
    <div className="ratio ratio-16x9">
      {youtubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          style={{ width: "100%", height: "100%" }}
          title={name ?? "Jason Kyle Smith Photography"}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  )
}

export default YouTubeEmbed
