import React, { useState } from "react";
import { animated, Transition, config } from 'react-spring/renderprops'
import { Textfit } from 'react-textfit';
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from "prop-types"

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import * as Scroll from 'react-scroll';



var ball = {}
var ball2 = {}

var Element = Scroll.Element;

function Feed(props) {
  console.log(props.values)
  let data = [

    {
      height: window.innerHeight / 1.5,
      heading: "Photography",
      backgroundImage: "https://images.unsplash.com/photo-1567030132446-171caa53eb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80",
      imageColor: "none",
      color: "#ffa24c",
      backgroundColor: "rgba(0,0,0,0)",
      delay: 0,
      template: "post",
      key: "post-" + 0


    },
    {
      height: window.innerHeight / 1.5,
      heading: "Typography",
      backgroundImage: "https://images.unsplash.com/photo-1533747350731-7769151f6db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      imageColor: "none",
      color: "#50e5c3",
      backgroundColor: "rgba(0,0,0,0)",
      delay: 0,
      template: "post",
      key: "post-" + 1


    },
    {
      height: window.innerHeight / 2,
      imageColor: "none",
      color: "#ffc0cb",
      backgroundImage: "https://images.unsplash.com/photo-1535953267280-5fd672f9bfa3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
      backgroundColor: "pink",
      heading: "Textures",
      delay: 0,
      template: "project",
      key: "project-" + 0

    },
    {
      height: window.innerHeight / 2,
      image: ball,
      imageColor: "none",
      color: "#fff",
      backgroundColor: "pink",
      heading: "Materials",
      delay: 0,
      scrollDirection: true,
      scroll: true,
      template: "project",
      key: "project-" + 1

    },
    {
      height: window.innerHeight / 1.5,
      image: "https://images.unsplash.com/photo-1566809503329-135dacbfce27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=985&q=80",
      imageColor: "blue",
      color: "blue",
      backgroundColor: "lightgray",
      heading: "Render",
      delay: 0,
      template: "post",
      key: "post-" + 2


    },
    {
      height: window.innerHeight / 1.5,
      image: "https://images.unsplash.com/photo-1553011829-8fefcbc144e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80",
      imageColor: "#f3c335",
      color: "#f3c335",
      backgroundColor: "lightgray",
      heading: "Render",
      delay: 500,
      template: "post",
      key: "post-" + 3


    },
    {
      height: window.innerHeight / 1.5,
      image: ball,
      imageColor: "none",
      color: "#fff",
      backgroundColor: "pink",
      heading: "Glass Ball",
      delay: 0,
      template: "post",
      key: "post-" + 4
    },
    {
      height: window.innerHeight / 1.5,
      image: ball2,
      imageColor: "none",
      color: "#fff",
      backgroundColor: "#959e94",
      heading: "Brick Wall",
      delay: 500,
      template: "post",
      key: "post-" + 5

    },

  ]
  const [value, setValue] = React.useState(0);
  var pagedata = feed(value, data)
  function feed(value, data) {
    var entries = []
    if (value === 1) {
      entries = data.filter(item => item.template === "post")
    }
    if (value === 2) {
      entries = data.filter(item => item.template === "project")
    }
    if (value === 0) {
      entries = data
    }
    return entries
  }
  function handleChange(event, newValue) {
    setValue(newValue)
  }


  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
      style={{
        marginTop: 50,
        marginBottom: 0
      }}>
      <Grid item xs={12}>
        <Element name="myScrollToElement">
          <Textfit mode="single" style={{
            paddingTop: 40,
            paddingBottom: 40
          }}>
            Animationen
      </Textfit>


          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Alles" />
            <Tab label="Animationen" />
            <Tab label="Projekte" />
          </Tabs>
        </Element>

      </Grid>
      <Transition
        items={pagedata}
        initial={true}
        from={{ opacity: 0, x: 300, height: 0, padding: 0 }}
        enter={{ opacity: 1, x: 0, height: 500, padding: 13 }}
        leave={{ opacity: 0, x: 300, height: 0, padding: 0 }}
        update={{ opacity: 1 }}
        config={config.slow}
        keys={item => item.key}>
        {item => ({ x, opacity, height, padding }) => (
          <FeedItem item={item} x={x} height={height} padding={padding} opacity={opacity} />
        )}
      </Transition>
    </Grid>

  )
}


function FeedItem(props) {
  const item = props.item
  const x = props.x
  const height = props.height
  const padding = props.padding
  const opacity = props.opacity
  const [open, toggle] = useState(false)

  const stylesOpen = {
    position: open ? "fixed" : "relative",
    zIndex: open ? 90000 : 1,
    left: 0,
    top: 0,
    width: open ? "100vw" : "auto"
  }

  return (
    <Grid item xs={12} md={item.template === "post" ? open ? 12 : 6 : 12} style={{ padding: 0, margin: 0, ...stylesOpen }}>
      <animated.div
        onClick={() => toggle(!open)}
        className="box"
        style={{
          opacity,
          padding: open ? "0px" : padding,
          height: open ? "100vh" : height,
          transform: `translate3d(0px, ${x}px,0px)`,
        }}
      >
        <div style={{
          backgroundColor: item.backgroundColor ? item.backgroundColor : null,
          height: "100%",
          backgroundImage: item.backgroundImage ? "url(" + item.backgroundImage + ")" : null,
          backgroundSize: "cover",
          overflow: "hidden"
        }}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-end"
            style={{ height: open ? "100vh" : 500, position: "relative", transition: "all 0.5s ease-in-out" }}
          >
            {item.image ?
              <div style={{
                width: 200,
                height: 200,
                position: "absolute",
                left: "calc(50% - 100px)",
                top: open ? "calc(50vh - 100px)" : 150,
                backgroundColor: item.imageColor ? item.imageColor : null,
                transition: "all 0.5s ease-in-out"
              }}>
                <img alt="" src={item.image} style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transition: "0.5s ease-out",
                  transform: "rotate(" + item.scroll && item.scroll === true ? props.scroll : 0 + "deg)"
                }}
                />
              </div>
              : null}
            {item.heading ?
              <Grid item>
                <p style={{
                  color: item.color ? item.color : null,
                  fontSize: 47,
                  textTransform: "uppercase",
                  width: "100%",
                  fontWeight: 900,
                }}>{item.heading}</p>
              </Grid>
              : null
            }
          </Grid>
        </div>
      </animated.div>
    </Grid>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query SearchQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
            edges {
              node {
                frontmatter {
                  title
                  image {
                      childImageSharp {
                        fluid(maxWidth: 240, quality: 64) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                }
                fields {
                  slug
                }
              }
            }
          }
        }
    `}
    render={values => <Feed values={values.allMarkdownRemark.edges} />}
  />
)
Feed.propTypes = {
  values: PropTypes.array.isRequired,
}