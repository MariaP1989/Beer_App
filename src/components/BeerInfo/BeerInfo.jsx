import React from 'react';
import SingleBeer from '../../components/SingleBeer/SingleBeer';
import Spinner from '../../components/Spinner/Spinner';
import "./beerInfo.css"
const Style = {
    beerDetailes:        'beer-details',
    generalInfo:         'beer-details__general-info',
    parameters:          'beer-details__parameters',
    photo:               'beer-details__photo',
    detailedInfo:        'beer-details__detailed-info',
    matchedFood:         'beer-details__matched-food',
    recommendedBeer:     'beer-details__recomended-beers',
    noRecommandedBeer:   'beer-details__no-recomended-beers',
};

class BeerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            beerData: null,
            recommendedBeer: null,
        };
    }

    /*Function allows to display detailed information about particular beer, in both situations - after changing id parameter in URL and after clicking button MORE INFO*/
    beerDetaile(){
        this.id = window.location.href.split('/').pop();
        fetch(`https://api.punkapi.com/v2/beers/${this.id}`, {
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Error');
            }
        }).then(object => this.setState({
            beerData: object,
        })).catch(error => error);
    }
    /*IBU: International Bitterness Units (scale 0-100), measures the bitterness from hops in a beer,
    ABV: Alcohole By Volume (4%-6%)
    EBC: European Brewery Convention, measure the beer color*/

    /*function for recommended beer search which is similar due to IBU, ABV and EBC parameters*/
    recommendBeer(beer) {
        this.abv = Math.floor(beer[0].abv);
        this.ebc = Math.floor(beer[0].ebc);
        this.ibu = Math.floor(beer[0].ibu);
        this.text = '';

        /*Condition to avoid parameters with value below 0, and error of undefind*/
        if(this.ebc <= 10 || this.ibu <= 5){
            this.url = `{https://api.punkapi.com/v2/beers?abv_gt=${this.abv}&abv_lt=${this.abv+1}&ebc_gt=${this.ebc}&ebc_lt=${this.ebc+10}&ibu_gt=${this.ibu}&ibu_lt=${this.ibu+5}}`;
        } else {
            this.url = `https://api.punkapi.com/v2/beers?abv_gt=${this.abv}&abv_lt=${this.abv+1}&ebc_gt=${this.ebc-10}&ebc_lt=${this.ebc+10}&ibu_gt=${this.ibu-5}&ibu_lt=${this.ibu+5}`;
        }
        /* API request for beer search with choosen parameters*/
        fetch(this.url, {
            method: 'GET'
        }).then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error('Error');
            }
        }).then(object => this.setState({
            recommendedBeer: object,
        })).catch(error => error);
    }

    /*function to choose random element in an array*/
    generateRandomInteger(min, max){
        return Math.floor(min + Math.random()*(max+1 - min));
    }

    componentDidMount(){
        this.beerDetaile();
        setTimeout(() => this.recommendBeer(this.state.beerData), 1000);
    }

    render(){
        const { beerData }        = this.state;
        const { recommendedBeer } = this.state;

        /*data to dispaly must exist in component state*/
        if( beerData !== null && recommendedBeer !== null) {
            /*variable for food match*/
            const food = (
                <div>
                    {
                        beerData[0].food_pairing.map((element, index) =>
                            <p key={index} className='ingredient-name'> - {element} </p>)
                    }
                </div>
            );
            /*array with beers which have simmilar parameters, one beer in an array is the one which is displayed in detailed*/
            let beer_elem_array = recommendedBeer;
            let beers = [];
            let beer_list = [];

            /*condtition to create array with beers similar to the one displayed, added else if to avoid element repetition,
          if array has one element, this means it is the same beer that is displayed, no beers to show*/
            if(recommendedBeer.length <= 1){
                beers = (
                    <div className={Style.noRecommandedBeer}>
                        <p><b>{'No similar beer available'}</b></p>
                    </div>
                );
            } else {
            /*returned has 4 elements, one of them is the same beer that is displayed, only 3 out of 4 beers to show*/
                if(recommendedBeer.length > 1 && recommendedBeer.length < 5){
                    beer_elem_array.forEach((element) => {
                    /*condition to exclude repeted beer*/
                        if(element.id !== beerData[0].id){
                            beer_list.push(element);
                        }
                        return beer_list;
                    });
                /*more than 4 elements are returned, one of them is the same beer that is displayed, need only 3 RANDOM beers without repetition*/
                } else if(recommendedBeer.length > 4){
                    for(var i = 0; i < 3; i++){
                        let randomIndex=this.generateRandomInteger(0,beer_elem_array.length-1);
                        if(beerData[0].id !== recommendedBeer[randomIndex].id){
                            beer_list.push(beer_elem_array[randomIndex]);
                            beer_elem_array.splice(randomIndex, 1);
                        } else {
                            beer_elem_array.splice(randomIndex, 1);
                            randomIndex = this.generateRandomInteger(0,beer_elem_array.length-1);
                            beer_list.push(beer_elem_array[randomIndex]);
                            beer_elem_array.splice(randomIndex, 1);
                        }
                    }
                }
                let list = beer_list.map((element,index) =>
                    <SingleBeer key={index} detaile={element} id={element.id} class={'recommanded-beer-list__element'} />
                );
                beers = (
                    <div className={Style.recommendedBeer}>
                        <p><b>You might also like:</b></p>
                        <div className={'recomended-beers-list'}>
                            {list}
                        </div>
                    </div>
                );
            }

            return (
                <div className={Style.beerDetailes}>
                  <div className="details--container-top">
                    <div className={Style.generalInfo}>
                        <p>{beerData[0].name}</p>
                        <p>{beerData[0].tagline}</p>
                    </div>
                    <div className={Style.parameters}>
                        <p><b>{'IBU:'}</b><span>{beerData[0].ibu}</span></p>
                        <p><b>{'ABV:'}</b><span>{`${beerData[0].abv}%`}</span></p>
                        <p><b>{'EBC:'}</b><span>{beerData[0].ebc}</span></p>
                    </div>
                  </div>
                  <div className="details--container-middle">
                    <div className={Style.photo}>
                        <img src={beerData[0].image_url} alt=''/>
                    </div>
                    <div className='beer-description'>
                        <p>{beerData[0].description}</p>
                        <p>{beerData[0].brewers_tips}</p>
                    </div>
                  <div className="details--container-bottom">
                    </div>
                    <div className="detailContainer">
                        <div className={Style.matchedFood}>
                            <p><b>{'Best served with:'}</b></p>
                            {food}
                        </div>
                        {beers}
                      </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Spinner className={'spinner'}/>
            );
        }
    }
}

export default BeerInfo;
