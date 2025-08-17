import React, { Fragment } from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MetaData from "../MetaData";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/ujjwal_saini_45/";
  };

  return (
    <Fragment>
      <MetaData title="About us" />
      <div className="aboutSection">
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>

          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/dhtnodfhl/image/upload/v1657456443/avatars/i0s4v1z8zdr2jlu5czdb.avif"
                alt="Founder"
              />
              <Typography>Ujjwal Saini</Typography>
              <Button onClick={visitInstagram} color="primary">
                Visit Instagram
              </Button>
              <span>This is a sample wesbite made by @ujjwalsaini.</span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Follow Us On</Typography>

              <a
                href="https://www.instagram.com/ujjwal_saini_45/"
                target="blank"
              >
                <InstagramIcon className="instagramSvgIcon" />
              </a>
              <a href="https://twitter.com/sujjwal2011" target="blank">
                <TwitterIcon className="twitterSvgIcon" />
              </a>

              <a href="https://www.facebook.com/ujjwasaini" target="blank">
                <FacebookIcon className="instagramSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
