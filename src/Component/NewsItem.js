import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    let { key, title, desc, url, newsUrl, author, date, source } = this.props;

    return (
      <div className='my-3' key={key}>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"84%", zIndex:"1"}}>
{source}
             
            </span>
          <img src={url ? url : "https://ichef.bbci.co.uk/news/1024/branded_news/3838/production/_128929341_bracy_resized_cb.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {date ? new Date(date).toGMTString() : "0:-:0"}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Know more...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
