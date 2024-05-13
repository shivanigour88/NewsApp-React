import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let{title , description ,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{source}</span>
       <img src={imageUrl?imageUrl:"https://video.cgtn.com/public/2024-05-05/public/video/364609/364609.jpg"} className="card-img-top" alt="..."/>
       <div className="card-body">
       <h5 className="card-title">{title}...</h5>
       <p className="card-text">{description}...</p>
       <p className="card-text"><small className ="text-muted">By {!author ? "Unknown":author} on {new Date(date).toGMTString()}</small></p>
       <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
