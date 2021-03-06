import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'


import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';


import * as Scroll from 'react-scroll';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Typography from '@material-ui/core/Typography';
import VisibilitySensor from "react-visibility-sensor";
import { Textfit } from 'react-textfit';

export const AboutPageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (

              <Page title={title} image={image} >
                <PageContent className="content" content={content} />
              </Page>
              
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`


class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: 0,
      active: false
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.updateDimensions);

  }
  updateDimensions() {
    this.setState({
      scroll: window.pageYOffset
    })

  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateDimensions);
  }
  render() {
    var scroller = Scroll.scroller;
    
    return (
      <Grid container direction="row"
        justify="center"
        alignItems="center"
        style={{
          backgroundColor: "cadetblue",
          minHeight: "100vh",
          overflow: "hidden"
        }}
      >
        <Grid item xs={11} style={{
          marginTop: 50
        }}>
          <Textfit mode="single" style={{
            paddingTop: 50,
          }}>
            {this.props.title}
          </Textfit>
          <Grid container direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={6} style={{ marginBottom: 100 }}>
              {this.props.children}
              
              <Fab aria-label="add" style={{ marginRight: 16, marginTop: 50 }} onClick={() =>
                scroller.scrollTo('myScrollToElement', {
                  duration: 1100,
                  delay: 10,
                  smooth: true,
                  offset: 0, // Scrolls to element + 50 pixels down the page
                })} >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </Fab>

              <Fab aria-label="add" style={{ marginRight: 16, marginTop: 50 }} onClick={() =>
                scroller.scrollTo('myScrollToElement', {
                  duration: 1100,
                  delay: 10,
                  smooth: true,
                  offset: 0, // Scrolls to element + 50 pixels down the page
                })} >
                <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
              </Fab>
              <Fab aria-label="add" style={{ marginRight: 16, marginTop: 50 }} onClick={() =>
                scroller.scrollTo('myScrollToElement', {
                  duration: 1100,
                  delay: 10,
                  smooth: true,
                  offset: 0, // Scrolls to element + 50 pixels down the page
                })} >
                <FontAwesomeIcon icon={['fab', 'vimeo-v']} size="lg" />
              </Fab>
            </Grid>
            <Grid item xs={12} md={6}>
              <VisibilitySensor partialVisibility onChange={(e) => this.setState({ active: e })} active={!this.state.active}>
                {({ isVisible }) => (
                  <img alt="" src={this.props.image ? this.props.image.childImageSharp.fluid.src : null} style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: 3,
                    filter: this.state.active === true ? "brightness(1.1)" : "brightness(0)",
                    transition: "filter 0.8s 1s ease-in"

                  }} />
                )}
              </VisibilitySensor>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}