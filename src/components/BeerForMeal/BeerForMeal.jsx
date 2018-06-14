import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleBeer from '../../components/SingleBeer/SingleBeer';
import Spinner from '../../components/Spinner/Spinner';
import SearchBox from '../../components/SearchBox/SearchBox';
import './beerForMeal.css';

class BeerSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ingredientName: '',
            resultAPI: [],
            pageNumber: 1,
            className: 'boxsearch--visible',
            spinnerClass: 'spinner--hidden',
            hasMore: true,
        };
    }

    /*function for beer search according to inserted food ingredient*/
    matchFood() {
        fetch(`https://api.punkapi.com/v2/beers?food=${this.state.ingredientName}&page=${this.state.pageNumber}&per_page=20`, {
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
                    spinnerClass: 'spinner--hidden',
                    pageNumber: this.state.pageNumber + 1,
                    hasMore: true,
                });
            } else {
                this.setState({
                    resultAPI: this.state.resultAPI.concat(object),
                    spinnerClass: 'spinner--hidden',
                    hasMore: false,
                });
            }
        }).catch(error => error);
    }

    /*function for state clear, when new ingredient name is typed during active infinite scroll*/
    stateClear() {
        this.setState({
            resultAPI: [],
            pageNumber: 1,
            className: 'boxsearch--visible',
        });
    }
    // function for spinner visibility
    classChange() {
        this.setState({
            spinnerClass: 'spinner-boxsearch',
        });
    }
    //function for beer search and spinner to hide
    spinnerOff() {
        this.classChange();
        if(this.state.resultAPI.length > 0){
            this.timeOutFirst = setTimeout(() => this.stateClear(), 300);
        }
        this.timeOutSecond = setTimeout(() => this.matchFood(), 500);
    }
    //changeHandler for input in boxsearch
    onChangeHandler(event) {
        event.preventDefault();
        this.setState({
            ingredientName : event.target.value
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState !== this.state){
            return true;
        } else {
            return false;
        }
    }

    render(){
        let box = (
            <SearchBox
                className={this.state.className}
                onChangeHandler={this.onChangeHandler.bind(this)}
                spinnerType={this.spinnerOff.bind(this)}
            />
        );

        let box_spinner = (
            <div>
                {box}
                <Spinner
                    className={this.state.spinnerClass}
                />
            </div>
        );

        if(this.state.resultAPI.length === 0){
        //no results to display, no API request- display only boxsearch, spinner hidden
            return (
                <div>
                    {box}
                </div>
            );
        } else if (this.state.resultAPI.length > 0 && this.state.spinnerClass === 'spinner-boxsearch') {
        //no results to display, API request pending- display boxsearch and spinner
            return (
                <div>
                    {box_spinner}
                </div>
            );
        } else {
        /*results to display, API request accepted - display boxsearch and beers in container with infinite scroll*/
            let listItems = this.state.resultAPI.map((element,index) =>
                <SingleBeer key={index} detaile={element} id={element.id} class={'beer-card'}/>
            );
            return (
                <div>
                    {box}
                    <InfiniteScroll
                        next={() => this.matchFood()}
                        hasMore={this.state.hasMore}
                        loader={box_spinner}>
                        <div className='beer-container__food'>
                            {listItems}
                        </div>
                    </InfiniteScroll>
                </div>
            );
        }
    }
}

export default BeerSearch;
