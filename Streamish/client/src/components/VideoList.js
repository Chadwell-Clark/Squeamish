import React, { useEffect, useState } from "react";
import Video from "./Video";
import {
  getAllVideos,
  getAllVideosWithComments,
  searchVideos,
} from "../modules/videoManager";
import { Button } from "reactstrap";
import VideoForm from "./VideoForm";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [criterion, setCriterion] = useState("");

  const getVideos = () => {
    getAllVideosWithComments().then((videos) => setVideos(videos));
  };

  const handleChange = (e) => {
    setCriterion(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    searchVideos(criterion, true).then((videos) => setVideos(videos));
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="container">
      <input type="text" placeholder="Search..." onChange={handleChange} />
      <Button outline color="primary" type="submit" onClick={handleClick}>
        Search Videos
      </Button>
      <div className="row justify-content-center">
        {/* <VideoForm getVideos={getVideos} /> */}
        {videos.map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
