import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { BodyContainer } from 'phenomic'
import { Link } from 'react-router'
import Svg from 'react-svg-inline'
import Page from '../Default'
import ContentLoading from '../../components/ContentLoading/Paragraph'
import FixedSocialButtons from '../../components/FixedSocialButtons'
import Block from '../../components/Block'
import BetaCTA from '../../fragments/BetaCTA'
import AuthorCTA from '../../fragments/AuthorCTA'
import gitHubSvg from '../../assets/icons/github.svg'
import styles from './Post.css'
import disqus from './disqus-script'


class Post extends Component {
  static hasLoadingState = true
  render() {
    const { props } = this
    const { head, body, isLoading, loadingData } = props
    let pageDate
    let postMeta
    let githubURL
    let title = (head) ? head.title : 'Default Loading Title'

    if (loadingData && loadingData.title) {
      title = loadingData.title
    }

    if (!isLoading) {
      pageDate = head.date ? new Date(head.date) : null
      postMeta = (
        <header>
          {pageDate &&
            <time key={pageDate.toISOString()}>
              {pageDate.toDateString()}
            </time>}
        </header>
      )
      githubURL = `https://github.com/serverless/blog/edit/master/posts${head.gitLink}`
      title = head.title
    }

    let markdownContent = (
      <BodyContainer>
        {body}
      </BodyContainer>
    )

    if (isLoading) {
      markdownContent = <ContentLoading numberOfLines={30} />
    }

    return (
      <Page {...props} className={styles.postPage} >
        <FixedSocialButtons
          url={`https://serverless.com/${this.props.__url}`}
          title={title}
        />
        <div className={styles.postWrapper}>
          <div className={styles.content}>

            <h1>{title}</h1>

            <div className={styles.postMeta}>
              {postMeta}
            </div>
            {markdownContent}
          </div>

          <div className={styles.sidebar}>
            <Block className={styles.sidebarBlock}>
              <h2>Quick Links</h2>
              <div className={styles.sidebarLinks}>
                <Link to='/framework/docs/guide'>
                  Read the Serverless Guide
                </Link>
              </div>
              <div className={styles.sidebarLinks}>
                <Link to='/framework/docs'>
                  Serverless documentation
                </Link>
              </div>
              <div className={styles.sidebarLinks}>
                <a href='https://gitter.im/serverless/serverless'>
                  Chat in Gitter
                </a>
              </div>
              <div className={styles.sidebarLinks}>
                <a href='http://forum.serverless.com'>
                  Ask Questions on the Forum
                </a>
              </div>
            </Block>
            <div className={styles.editLinkWrapper}>
              <span className={styles.editLink}>
                <Svg svg={gitHubSvg} cleanup />
                <a target='_blank' rel='noopener noreferrer' href={githubURL}>
                  Edit this post on github
                </a>
              </span>
            </div>
            <BetaCTA buttonText='Get early access' />

            <AuthorCTA style={{ marginTop: '20px' }} />
          </div>
        </div>
        <div className={styles.comments} id='disqus_thread' />
        <Helmet script={[{ type: 'text/javascript', innerHTML: disqus }]} />
      </Page>
    )
  }
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
  __url: PropTypes.string,
  phenomicLoading: PropTypes.bool,
}

export default Post
