import React from 'react';
import PropTypes from 'prop-types';
import	{ Link }	from	'react-router-dom';
import './singleBeer.css';

class SingleBeer extends React.Component {

    shouldComponentUpdate(nextProps){
        if(nextProps !== this.props){
            return true;
        } else {
            return false;
        }
    }

    render(){
        if(this.props !== null){
            return (
                <div className={this.props.class}>
                    <img src={this.props.detaile.image_url} alt='' />
                    <div className='card__info'>
                        <div className='card__info-text'>
                            <p>{this.props.detaile.name}</p>
                            <p>{this.props.detaile.tagline}</p>
                        </div>
                        <div className='button_more-info'>
                            <Link to={`/details/${this.props.id}`} target='_blank'>
                                <button>{'More Info'}</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

SingleBeer.propTypes = {
    class: PropTypes.string,
    detaile: PropTypes.object,
    id: PropTypes.number,
};

export default SingleBeer;
