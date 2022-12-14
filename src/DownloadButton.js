import React, { useState, useEffect } from "react";

import axios from "axios";

function DownloadButton(props) {
    const [videoqualities, setVideoqualities] = useState([]);
    const [qualityanditag, setQualityAndItag] = useState("");
    const [videotext, setVideoText] = useState("");
    const [audiotext, setAudioText] = useState("");

    const [ids, setIds] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        {
            props.type === "mp4" ? setVideoText(<h5>Downloading...</h5>)
                : setAudioText(<h5>Downloading...</h5>)
        }

        if (qualityanditag) {
            var [quality, itag] = qualityanditag.split(":");
            quality = quality.trim();
            itag = itag.trim();
        }

        if(!qualityanditag)
        {
            itag = 'highest';
        }



        props.type === "mp4" ?

            await axios.get(`/api/downloadVideo/${props.id}/${itag}`)
                .then((response) => {
                    // console.log(response.data);
                    alert(response.data);
                    setVideoText(<h5>{response.data}</h5>);
                }).catch(err => {
                    // console.log(err);
                    setVideoText(<h5>{err}</h5>);
                })
            :
            await fetch(`/api/downloadAudio/${props.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                return response.text();
            }).then(function (data) {
                // console.log(data);
                alert(data);
                setAudioText(<h5>{data}</h5>);
            });
    }

    const handleChange = (event) => {
        event.preventDefault();
        setQualityAndItag(event.target.value);
    }

    useEffect(() => {

        setAudioText("");
        setVideoText("");


        const response = async () => {

            await fetch(`/api/qualities/${props.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(
                response => response.json()
            ).then(
                data => {
                    // console.log(data);

                    const allFormats = data;

                    for (let i = 0; i < allFormats.length; i++) {

                        const quality = allFormats[i]['qualityLabel'];
                        const itag = allFormats[i]['itag'];

                        const value = `${quality} : ${itag}`;

                        // console.log("ids", ids);
                        if (!ids.includes(i)) {

                            const obj = <div key={i}><input type="radio" id={i} name={"VideoQuality"}
                                value={value}
                                // checked={quality}
                                onChange={handleChange} />
                                <label htmlFor={i}>{quality}</label><br></br></div>
                            setIds(current => [...current, i]);
                            setVideoqualities(current => [...current, obj]);
                        }
                    }
                }
            );

            // console.log(videoqualities);
        }

        response();

    }, [props.url, props.id]);

    return (
        <div className="download">
            <h2 id="hello">Download {props.type === "mp3" ? "music" : "video"} file</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Download</button>
            </form>

            {props.type === "mp4" ? videotext : audiotext}
            {props.type === "mp4" ? props.url !== "" ? videoqualities : <></> : <></>}
        </div>
    );
}

export default DownloadButton;