import React, { useState } from "react";

import { useHistory } from "react-router";
import { addVideo } from "../modules/videoManager";
import { Button, Card, CardBody } from "reactstrap";

const VideoForm = ({ getVideos }) => {
  // create object with keys and empty values or you can set it directly in the use State
  const videoToAdd = {
    Title: "",
    Url: "",
    Description: "",
  };
  // create useState object to set video values in
  const [video, setvideo] = useState({ videoToAdd });

  // create handleChange that copies the current state of the useState video and continually updates the current key values and re sets the useState video
  const handleChange = (e) => {
    const tempVideo = { ...video };
    let valueChange = e.target.value;
    tempVideo[e.target.id] = valueChange;
    setvideo(tempVideo);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addVideo(video).then((res) => {
      getVideos();
      setvideo(videoToAdd);
    });
  };

  return (
    <Card>
      <CardBody>
        <form className="container px-2">
          <fieldset>
            <div className="container text-left">
              <label>Title</label>
              <input
                type="text"
                onChange={handleChange}
                id="Title"
                name="Title"
                placeholder="Title - required"
                value={video.Title}
                required
              />
            </div>
            <div className="container">
              <label>Youtube Video Url</label>
              <input
                type="text"
                onChange={handleChange}
                id="Url"
                name="Url"
                placeholder="Url - required"
                value={video.Url}
                required
              />
            </div>
            <div className="container">
              <label>Description</label>
              <input
                type="text"
                onChange={handleChange}
                id="Description"
                placeholder="Description"
                value={video.Description}
              />
            </div>
            <Button outline color="primary" type="submit" onClick={handleClick}>
              Save New Video
            </Button>
          </fieldset>
        </form>
      </CardBody>
    </Card>
  );
};
export default VideoForm;
