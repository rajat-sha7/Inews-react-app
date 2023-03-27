import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";




export default class News extends Component {

    static defaultProp = {
        country: "in",
        pageSize: 2,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capfunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }







    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,



        }
        document.title = `iNEWS ${this.capfunction(this.props.category)}`;

    }





    async updateNews() {
        this.props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51ddd364220b46f9a106b30ad4a69c0e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })

        
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json()
        console.log(parsedData)
        this.props.setProgress(70)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)

    }





    async componentDidMount() {
        this.updateNews()

    }
                                         



    fetchMoreData = async () => {
        this.setState({ loading: true })
        this.setState({ page: this.state.page+1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51ddd364220b46f9a106b30ad4a69c0e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
     
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),

            totalResults: parsedData.totalResults
            ,
            loading: false
        })
    


        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.articles.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
    };

    // handlePrevClick = async () => {
    // console.log("clicked on previous")
    // console.log("clicked on next")

    // this.setState({ loading: true })

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51ddd364220b46f9a106b30ad4a69c0e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`



    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData)

    // this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })

    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()

    // }

    // handleNextClick = async () => {
    //     console.log("clicked on next")


    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {



    // } else {
    //     this.setState({ loading: true })
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51ddd364220b46f9a106b30ad4a69c0e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`


    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData)

    //     this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()

    // }









    render() {
        console.log(this.state.articles)
        return (
            <>

                <h1 style={{marginTop:'100px'}} className='text-center' >iNEWS- Top {this.capfunction(this.props.category)} Headlines</h1><p className="card-text"><small className="text-muted">By Rajat Sharma</small></p>
                {this.state.loading && <Spinner />}





                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >


                    <div className='container my-3'>
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItem source={element.source.name} author={element.author} date={element.publishedAt} newsUrl={element.url} title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} url={element.urlToImage} />
                                </div>


                            })

                            }
                        </div>
                        </div>

                </InfiniteScroll>





                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className='btn btn-dark'>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className='btn btn-dark'>Next &rarr;</button>

                </div> */}
           

            </>

        )
    }
}
