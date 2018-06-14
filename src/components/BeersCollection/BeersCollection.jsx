import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleBeer from '../../components/SingleBeer/SingleBeer';
import Spinner from '../../components/Spinner/Spinner';
import './beersCollection.css';

class BeersCollection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resultAPI: [],
            pageNumber: 1,
            hasMore: true,
            spinnerClass: 'spinner',
        };
    }

    /*function for all beer records search*/
    beerSearch() {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.pageNumber}&per_page=20`, {
            method: 'GET',
        }).then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Error');
            }
        }).then(object => {
        /*condition which block infinite scroll if there are no new beers to display*/
            if(object.length === 20){
                this.setState({
                    resultAPI: this.state.resultAPI.concat(object),
                    pageNumber: this.state.pageNumber + 1,
                    spinnerClass: 'spinner-infinite',
                });
            } else {
                this.setState({
                    resultAPI: this.state.resultAPI.concat(object),
                    pageNumber: this.state.pageNumber + 1,
                    hasMore: false,
                });
            }
        }).catch(error => error);
    }

    componentDidMount(){
        this.beerSearch();
    }

    /*component render ONLY when new results are downloaded*/
    shouldComponentUpdate(nextProps, nextState){
        if (nextState.resultAPI !== this.state.resultAPI) {
            return true;
        } else {
            return false;
        }
    }

    render(){
        let spinner = <Spinner className={this.state.spinnerClass} />

        if(this.state.resultAPI.length > 0){
            let listItems = this.state.resultAPI.map((element,index) =>
                <SingleBeer key={index} detaile={element} id={element.id} class={'beer-card'}/>
            );
            return (
                <div className='scroll'>
                    <InfiniteScroll
                        next={() => this.beerSearch()}
                        hasMore={this.state.hasMore}
                        loader={spinner}>
                        <div className='beer-container'>
                            {listItems}
                        </div>
                    </InfiniteScroll>
                </div>
            );
        } else {
            return (
                <div>
                    {spinner}
                </div>
            );
        }
    }
}

export default BeersCollection;
