import React, { useState } from "react";
import { animated, Transition, config } from 'react-spring/renderprops'
import { Textfit } from 'react-textfit';
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from "prop-types"

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import * as Scroll from 'react-scroll';

var Element = Scroll.Element;

function Feed(props) {
  const [value, setValue] = React.useState(0);
  function feed(value, data) {
    var entries = []

    if (value === 1) {
      entries = data.filter(item => item.node.frontmatter.templateKey === "blog-post")
    }
    if (value === 2) {
      entries = data.filter(item => item.node.frontmatter.templateKey === "project")
    }
    if (value === 0) {
      entries = data.filter(item => item.node.frontmatter.templateKey === "project" || item.node.frontmatter.templateKey === "blog-post")
    }    
    return entries
  }
  var pagedata = feed(value, props.allMarkdownRemark)

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
            {props.title}
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
        keys={item => item.node.id}>
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
    <Grid item xs={12} md={item.node.frontmatter.templateKey === "blog-post" ? open ? 12 : 6 : 12} style={{ padding: 0, margin: 0, ...stylesOpen }}>
      <animated.div
        onClick={() => toggle(!open)}
        className="content-box"
        style={{
          opacity,
          padding: open ? "0px" : padding,
          height: open ? "100vh" : height,
          transform: `translate3d(0px, ${x}px,0px)`,
        }}
      >
        <div style={{
          backgroundColor: item.node.frontmatter.backgroundcolor ? item.node.frontmatter.backgroundcolor : '#ffffff',
          height: "100%",
          backgroundImage: item.node.frontmatter.backgroundimage ? "url(" + item.node.frontmatter.backgroundimage.childImageSharp.fluid.src + ")" : null,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden"
        }}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-end"
            style={{ height: open ? "100vh" : 450, position: "relative", transition: "all 0.5s ease-in-out" }}
          >
            {item.node.frontmatter.featuredimage ?
              <div style={{
                width: 200,
                height: 200,
                position: "absolute",
                left: "calc(50% - 100px)",
                top: open ? "calc(50vh - 100px)" : 150,
                backgroundColor: item.imageColor ? item.imageColor : null,
                transition: "all 0.5s ease-in-out"
              }}>
                <img alt="" src={item.node.frontmatter.featuredimage.childImageSharp.fluid.src} style={{
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
            {item.node.frontmatter.title ?
              <Grid item>
                <p style={{
                  color: item.node.frontmatter.color ? item.node.frontmatter.color : "#000000",
                  fontSize: 47,
                  textTransform: "uppercase",
                  width: "100%",
                  fontWeight: 900,
                }}>{item.node.frontmatter.title}</p>
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
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {date: {nin: "null"}}}) {
          edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date
          color
          backgroundcolor
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 1080) {
                src
              }
            }
          }
        backgroundimage {
            childImageSharp {
              fluid(maxWidth: 1080) {
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
    render={values => <div>
      {console.log(values)}
      <Feed  allMarkdownRemark={values.allMarkdownRemark.edges} title={props.title} />
    </div>}
  />
)
Feed.propTypes = {
  allMarkdownRemark: PropTypes.array.isRequired,
}