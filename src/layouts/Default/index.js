/**
 * Base Page template
 */
import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
// import invariant from 'invariant'
import classnames from 'classnames'
import { BodyContainer, joinUri } from 'phenomic'
import { setItem } from '../../utils/storage'
import getURLParams from '../../utils/urlHelpers'
import Header from '../../fragments/Header'
import Footer from '../../fragments/Footer'
import styles from './Default.css'

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  __filename: PropTypes.string.isRequired,
  __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  header: PropTypes.element,
  footer: PropTypes.element,
  /** if true, page will be full width */
  fullWidth: PropTypes.bool,
  phenomicLoading: PropTypes.bool,
  className: PropTypes.string
}

class DefaultShell extends Component {
  componentDidMount() {
    const urlParams = getURLParams(window.location.href)
    if (urlParams) {
      console.log('urlParams', urlParams)
    }
    // Set last page viewed for 404 tracker
    setItem('sls_last_page', window.location.href)
  }
  render() {
    const {
      __filename,
      __url,
      head,
      body,
      header,
      footer,
      children,
      className,
      fullWidth,
      isLoading
    } = this.props
    let metaTitle
    let meta

    if (!isLoading) {
      // invariant(
      //   typeof head.title === 'string',
      //   `Your page '${__filename}' needs a title`
      // )

      metaTitle = head.metaTitle || head.title

      meta = [
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: metaTitle },
        {
          property: 'og:url',
          content: joinUri(process.env.PHENOMIC_USER_URL, __url),
        },
      { property: 'og:description', content: head.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: metaTitle },
      { name: 'twitter:creator', content: `@${process.env.TWITTER}` },
      { name: 'twitter:description', content: head.description },
      { name: 'description', content: head.description },
      ]
    }

    /* const linkTags = [
      {
        'rel': 'canonical',
        'href': joinUri(process.env.PHENOMIC_USER_URL, __url)
      },
       link={linkTags}
    ]*/

    /* Markdown content will display if it exists */
    const markdown = (
      <BodyContainer>
        {body}
      </BodyContainer>
    )

    const contentWrapperClass = (fullWidth) ? styles.fullWidth : styles.page

    let customScript
    if (head && head.script) {
    // if script defined in markdown frontmatter include it
      customScript = (
        <Helmet script={[{ src: head.script, type: 'text/javascript' }]} />
      )
    }
    const classes = classnames(contentWrapperClass, className)
    return (
      <div>
        <Helmet title={metaTitle} meta={meta} />
        <Header />
        <div className={classes}>
          {header}
          {children || markdown}
          {footer}
        </div>
        <Footer />
        {customScript}
      </div>
    )
  }
}

DefaultShell.propTypes = propTypes
export default DefaultShell
