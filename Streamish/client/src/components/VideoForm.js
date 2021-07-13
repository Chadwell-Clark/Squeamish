import React, { useState } from "react";
import { useHistory } from "react-router";
import { addVideo } from "../modules/videoManager";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
} from "reactstrap";

const VideoForm = ({ getVideos }) => {
  // create object with keys and empty values or you can set it directly in the use State
  const videoToAdd = {
    Title: "",
    Url: "",
    Description: "",
  };

  // create useState object to set video values in
  const [video, setvideo] = useState({ videoToAdd });
  const history = useHistory();
  // create handleChange that copies the current state of the useState video and continually updates the current key values and re sets the useState video
  const handleChange = (e) => {
    const tempVideo = { ...video };
    const valueChange = e.target.value;
    tempVideo[e.target.id] = valueChange;
    setvideo(tempVideo);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addVideo(video).then((res) => {
      setvideo(videoToAdd);
      history.push("/");
    });
  };

  return (
    <Card>
      <CardBody>
        <Form>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              onChange={handleChange}
              id="Title"
              name="Title"
              placeholder="Title - required"
              value={video.Title}
              bsSize="lg"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Youtube Video Url</Label>
            <Input
              type="text"
              onChange={handleChange}
              id="Url"
              name="Url"
              placeholder="Url - required"
              value={video.Url}
              bsSize="lg"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              onChange={handleChange}
              id="Description"
              placeholder="Description"
              value={video.Description}
              bsSize="lg"
            />
          </FormGroup>

          <Button
            className="mt-3"
            outline
            color="primary"
            type="submit"
            onClick={handleClick}
          >
            Save New Video
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default VideoForm;
