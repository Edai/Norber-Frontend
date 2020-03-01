import React, { useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import { Divider, Grid } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Developed by "}
      <MuiLink color="inherit" href="https://github.com/Edai">
        {process.env.author}
      </MuiLink>
      {" - "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function VideoPreviewCard() {
  const [videoFileURL, setVideoFileURL] = useState("");
  const [videoFileObject, setVideoFileObject] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    setLoading(true);
  };

  const onUpload = e => {
    let files = e.target.files;
    let url = "";
    if (files && files.length === 1) {
      url = URL.createObjectURL(files[0]);
      setVideoFileObject(files[0]);
    }
    setVideoFileURL(url);
  };

  return videoFileURL ? (
    <Card style={{ margin: "1em" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {videoFileObject.name.toUpperCase()}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
          <video
            autostart="true"
            loop
            autoPlay
            src={videoFileURL}
            type="video/mp4"
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          onClick={e => {
            setVideoFileURL("");
            setLoading(false);
          }}
        >
          Reset
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={e => {
              onSubmit();
            }}
          >
            Make it big !
          </Button>
        )}
      </CardActions>
    </Card>
  ) : (
    <Button
      style={{
        marginBottom: "1em"
      }}
      variant="contained"
      component="label"
      onClick={e => {
        onUpload(e);
      }}
    >
      Select your video
      <input
        onChange={onUpload}
        accept="video/*"
        type="file"
        style={{ display: "none" }}
      />
    </Button>
  );
}

export default function Index() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        {process.env.projectName}
      </Typography>
      <VideoPreviewCard />
      <Divider />
      <Copyright />
    </div>
  );
}
