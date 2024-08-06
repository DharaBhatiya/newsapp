// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types'

// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
//   }

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   constructor() {
//     super();
//     console.log("Hello I am a consructor from news components");
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0,
//     };
//   }

//   async componentDidMount() {
//     let url =`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apikey=ec13be715f9049b397f613cbdd457939&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
//   }

//   handlePrevClick = async () => {
//     console.log("previous");
//     let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apikey=ec13be715f9049b397f613cbdd457939&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       page: this.state.page - 1,
//       articles: parsedData.articles,
//     });
//   };

//   handleNextClick = async () => {
//     console.log("Next");
//     if( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

//     }
//     else{
//        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apikey=ec13be715f9049b397f613cbdd457939&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log(parsedData);
//       this.setState({
//         page: this.state.page + 1,
//         articles: parsedData.articles,
//     });
//   }
//   };

//   render() {
//     return (
//       <div className="container" my-2>
//         <h1 className="text-center my-2">NewsMonkey - Top Headlines</h1>
//         <div className="row">
//           {this.state.articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItem
//                   title={element.title ? element.title : ""}
//                   description={element.description ? element.description : ""}
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                 />
//               </div>
//             );
//           })}
//         </div>
//         <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevClick}
//           >
//             {" "}
//             &larr; Previous
//           </button>
//           <button
//             disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from news components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async (retryCount = 0) => {
    this.props.setProgress(10);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=41d240a991df4585b7da1015f0eb4a59&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);

      if (data.status === 429 && retryCount < 3) {
        // Rate limited, retry with exponential backoff
        const retryAfter = (1 << retryCount) * 1000; // Exponential backoff
        setTimeout(() => this.fetchArticles(retryCount + 1), retryAfter);
      } else if (data.ok) {
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
        });
      } else {
        console.error("Error fetching articles:", data.statusText);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }

    this.props.setProgress(100);
  };

  handlePrevClick = async () => {
    console.log("Previous");
    this.setState(
      (prevState) => ({
        page: prevState.page - 1,
      }),
      this.fetchArticles
    );
  };

  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        this.fetchArticles
      );
    }
  };

  fetchMoreData = () => {
    this.setState({page: this.state.page+1})
    this.fetchArticles()
  };


  render() {
    return (
      <>
        <h1 className="text-center my-2">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="conatiner">

          <div className="row">
            {this.state.articles.length > 0 ? (
              this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={!element.author ? "unknown" : element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))
            ) : (
              <p>No articles available</p>
            )}
          </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
        
      </>
    );
  }
}

export default News;
