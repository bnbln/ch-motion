import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

import Header from '../components/Header'
import Feed from '../components/Feed'

import video01 from "../../static/img/header.mp4"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: 0
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
    var {image, video, title, heading, subheading} = this.props

    return (
      <div className="app" style={{
        width: "100%",
        overflow: "hidden"
      }}>
        <Grid container direction="row"
          justify="center"
          alignItems="center"
          style={{
            zIndex: 1,
            position: "relative",
            backgroundColor: "white",
            marginBottom: 300,
            boxShadow: "0px -15px 60px -10px black"
          }}>
          <Header
            image={!!image.childImageSharp ? image.childImageSharp.fluid.src : image}
            scroll={this.state.scroll}
            video={video01}
            title={this.props.title} heading={this.props.heading} subheading={this.props.subheading}

          />
          <Grid item xs={11} style={{ marginBottom: 150, backgroundColor: "white" }}>
            <Feed height={400} scroll={this.state.scroll} title={this.props.title} />
          </Grid>
          
    
          
        </Grid>
      </div>
    )
  }
}



export const IndexPageTemplate = ({
  image,
  video,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
    <div>
      <App image={image} video={video} title={title} heading={heading} subheading={subheading} >

      </App>
                      {/* <h1 className="title">{mainpitch.title}</h1>
                      <h3 className="subtitle">{mainpitch.description}</h3>
                      <p>{description}</p>
                      <Features gridItems={intro.blurbs} />
                      <BlogRoll /> */}
       
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
      <IndexPageTemplate
        image={frontmatter.image}
        video={frontmatter.video}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
