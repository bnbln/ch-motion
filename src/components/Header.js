import React, { Component } from 'react';
// import Hero from './Hero.js';
// import logoanimation from "../data.json"
// import '../App.css';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import IconDown from '@material-ui/icons/KeyboardArrowDown';
import * as Scroll from 'react-scroll';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { fab, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons'
library.add(fab, faInstagram, faVimeoV, faEnvelope)

export default class Header extends Component {
  render() {
    var scroller = Scroll.scroller;
    return (
      <Grid container direction="row"
        justify="center"
        alignItems="center"
      >
        {/* <Grid item xs={12}>
            <Hero scroll={this.state.scroll} animation={logoanimation} video={video}>
              <h1>Christoph Halstenberg</h1>
            </Hero>
          </Grid> */}
        <Grid item xs={12} style={{
          height: "calc(100vh - 50px)",
          position: "relative",
          backgroundImage: "url(" + this.props.image + ")",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          overflow: "hidden"

        }}>
          {this.props.video ?
            <video
              autoPlay loop muted
              onLoad={() => console.log("loaded")}
              style={{
                position: "absolute",
                zIndex: 0,
                objectFit: "cover",
                objectPosition: "center",
                minWidth: "100%",
                minHeight: "100%",
                height: "auto",
                width: "auto"
              }}>
              <source src={this.props.video}  ></source>
            </video>
            : null}
          <Grid container direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            style={{
              height: "100vh",
              width: "100%",
              position: "relative",
              zIndex: 10,
              transform: "translateY(" + this.props.scroll + "px)"
            }}>
            <Grid item xs={8} sm={4}>
              <h3 style={{
                textAlign: "center",
                backgroundColor: "white",
                padding: "40px 20px",
                fontSize: "26px",
                color: "#3a3764",
                letterSpacing: "-0.2px",
                fontFamily: "Gibson",
                textTransform: "uppercase",
                boxShadow: "-1px 4px 30px -30px black",
              }}>Christoph Halstenberg</h3>
              <h3 style={{
                textAlign: "center",
                backgroundColor: "white",
                padding: "20px 10px",
                fontSize: "12px",
                color: "#3a3764",
                letterSpacing: "1.43px",
                fontFamily: "Gibson",
                textTransform: "uppercase",
                boxShadow: "-1px 4px 30px -30px black",
                fontWeight: 600,
                margin: "0px 50px"
              }}>Motion Design</h3>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Fab aria-label="add" onClick={() =>
                scroller.scrollTo('myScrollToElement', {
                  duration: 1100,
                  delay: 10,
                  smooth: true,
                  offset: 0, // Scrolls to element + 50 pixels down the page
                })} >
                <IconDown />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

