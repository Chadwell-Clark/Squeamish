import { getUserVideos } from "../modules/usersManager";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const getVideosByUserId = () => {
    getUserVideos(id).then((userProfile) => setVideos(userProfile.videos));
  };

  useEffect(() => {
    getVideosByUserId(id);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {videos.map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default UserVideos;
