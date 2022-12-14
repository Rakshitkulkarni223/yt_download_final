import React, { useEffect, useState } from "react";
import DownloadButton from './DownloadButton';
import DownloadButtonDefault from './DownloadButtonDefault';
import DownloadButtonInvalid from './DownloadButtonInvalid';
import { useLocation } from 'react-router-dom';


export default function YouTube() {

    const [videoUrl, setVideoUrl] = useState("");
    const [id, setId] = useState("");
    
    const location = useLocation();

    
    
    
    useEffect(() => {
        const id = videoUrl.replace("https://www.youtube.com/watch?v=", "");
        setId(id);
    }, [videoUrl]);
    
    const HandleChange = (e) => {
        setVideoUrl(e.target.value)
        // console.log(videoUrl);
    }


    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <h1 className="utheading">Youtube Video Downloader</h1>
                <input
                    value={videoUrl}
                    onChange={HandleChange}
                    placeholder="Paste youtube video url here..."
                />
            </form>
            {videoUrl === "" ? (
                <DownloadButtonDefault />
            ) : (
                <div>
                    {videoUrl.startsWith("https://www.youtube.com/watch?v=") ||
                        videoUrl.startsWith("https://youtube.com/watch?v=") ||
                        videoUrl.startsWith("www.youtube.com/watch?v=") ||
                        videoUrl.startsWith("youtube.com/watch?v=") ||
                        videoUrl.startsWith("https://youtu.be/") ||
                        videoUrl.startsWith("https://youtube.com/shorts/") ||
                        videoUrl.startsWith("https://m.youtube.com/watch?v=") ||
                        videoUrl.startsWith("v=") ? (
                        <div>
                            <DownloadButton url={videoUrl} id={id} type="mp3"  />
                            <br />
                            <DownloadButton url={videoUrl} id={id} type="mp4" />
                        </div>
                    ) : (
                        <DownloadButtonInvalid />
                    )}
                </div>
            )}
        </div>

    )
}
