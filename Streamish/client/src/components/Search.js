import React, { useEffect, useState } from "react";
import {searchVideos} from "../modules/videoManager";
import {Button} from 'reactstrap';
import Video from './Video';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const[criterion, setCriterion] = useState("");
    const [videos, setVideos] = useState([]);

const getVideos= () => {
    searchVideos(searchTerm).then(videos => setVideos(videos))
}

const handleClick = (e) => {   
setSearchTerm(criterion)
}

useEffect(() => {
    getVideos();
  }, []);

    

    return (
        <div className = "container">
            {/* <div classname="row justify-content-center ">
                <p>
                <input type="text"
                 placeholder= "Search..." 
                 onChange={e => setCriterion(e.target.value)} 
                 />
                <Button outline color="primary"
                type="submit" 
                onClick={handleClick}
                >
                    Search Videos</Button>
                <p>{criterion}</p>
                </p>
                {const x= videos === null ? <></> :
                {videos.map((video) => (
                <Video video={video} key={video.id} />
        ))}}

            </div> */}
            </div>
    )

};
export default Search;