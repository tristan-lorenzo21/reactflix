import { Component } from 'react';
import '../Search.css'
import axios from 'axios'

class SearchBar extends Component {

    constructor( props ) {
        super ( props );

        this.state =  {
            query: '',
            results: {},
            loading: false,
            message: ''
        };

        this.cancel = '';
    }

    fetchSearchResults = ( updatedPageNo= '', query ) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}`: '';
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=23d2860375da167fa19998ec1ba7feae&language=en-US&query=${query}${pageNumber}&include_adult=false`;

        if (this.cancel) {
            this.cancel.cancel();
        } else {
            this.cancel = axios.CancelToken.source();
        }

        axios.get( searchUrl, {
            cancelToken: this.cancel.token
        } )
            .then ( res => {
                // const resultNotFoundMesg = 
                console.warn( res );
            } )
        .catch ( error => {
            if ( axios.isCancel(error) || error ) {
                this.setState ( {
                    loading: false,
                    message: 'Failed to fetch results. Please check network'
                } )
            }
        } )
    }

    handleOnInputChange = ( event ) => {
        const query = event.target.value;
        this.setState( { query: query, loading: true, message: '' }, () => {
            this.fetchSearchResults( 1, query );
        } );
    }

    render() {
        const { query } = this.state;
        console.warn(this.state);
        return (
            <div className="container">

                <h2 className="heading"> Movie Search </h2>

                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search" aria-hidden="true"/>
                </label>

            </div>
        )
    }
  
}

export default SearchBar;