import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps={
     country : "in",
     pageSize : 8,
     category : 'general'
  }
  static propTypes ={
     country : PropTypes.string,
     pageSize : PropTypes.number,
     category : PropTypes.string
  }
 capatalizer=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props)
  {
    super(props);
    console.log("this is a constructor from news components");
    this.state ={
      articles : [],//this.articles,
      loading : false,
      page:1,
      totalResults:0
    }
    document.title = `NewsApp - ${this.capatalizer(this.props.category)}` 
  }
  async UpdateNews()
  {
    this.props.setProgress(10);
   // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    //&apiKey=6bf62594eac240f29cbccca64110bd4f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf62594eac240f29cbccca64110bd4f&page=${this.state.page}`;
    this.setState({loading : true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles : parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    }) 
    this.props.setProgress(100);
  }
  async componentDidMount(){
   /* console.log("cmd");
    //Actual API
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=6bf62594eac240f29cbccca64110bd4f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })*/
    this.UpdateNews();
  }
  HandlePrevClick= async()=>{
        /* console.log("prev");

         let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=6bf62594eac240f29cbccca64110bd4f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
         this.setState({loading : true})
         let data = await fetch(url);
         let parsedData = await data.json()
         console.log(parsedData)
       
         this.setState({
         page : this.state.page - 1,
         articles : parsedData.articles ,
         loading : false       
      })*/
      this.setState({page : this.state.page-1});
      this.UpdateNews()
  }
  HandleNextClick= async()=>{
    /*console.log('next');

    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pazeSize)))
      {
        let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=6bf62594eac240f29cbccca64110bd4f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData)
      this.setState({
      page : this.state.page+1,
      articles : parsedData.articles ,
      loading : false              
 })*/
 this.setState({page : this.state.page+1});
 this.UpdateNews()
} 
 fetchMoreData = async() => {
  this.setState({page : this.state.page+1});
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf62594eac240f29cbccca64110bd4f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
    })
}; 
  render() {
    console.log("render");
    return (
      <div className='container my-3'>
      <h1 className="text-center"  style={{margin:"35px"}}>NewsApp - Top {this.capatalizer(this.props.category)} Headlines</h1>
      {this.state.loading && <Spinner/>}
    <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        > 
        <div className="container">
      <div className="row">
      {/*{!this.state.loading &&this.state.articles.map((element)=>{*/}
     {this.state.articles.map((element)=>{
        return <div className='col-md-4' key={element.url}>
      <NewsItem title ={element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} 
      newsUrl ={element.url} imageUrl={element.urlToImage} author = {element.author} date = {element.publishedAt} source={element.source.name}/>
      </div>
      })}
      </div>
      </div>
      </InfiniteScroll>
      {/*<div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.HandlePrevClick}>&laquo; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark mx-3" onClick={this.HandleNextClick}>&raquo;Next</button>
      </div>*/}
      </div>
    )
  }
}

export default News
