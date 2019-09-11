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
  let data = props.values
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
          projects: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "project"}}}) {
    edges {
      node {
        frontmatter {
          title
          templateKey
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 10) {
                src
              }
            }
          }
        }
      }
    }
  }
  posts: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
    edges {
      node {
        frontmatter {
          title
          templateKey
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 10) {
                src
              }
            }
          }
        }
      }
    }
  }
        }
    `}
    render={values => <Feed values={values.posts.edges} projects={values.projects.edges} />}
  />
)
Feed.propTypes = {
  values: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}