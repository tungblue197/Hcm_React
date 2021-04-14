import React, { Component } from 'react'
import { SearchInput, Heading } from 'evergreen-ui';
import './SearchBar.scss';

export class SearchBar extends Component {
    constructor(props){
        super(props);
    }
  
    render() {
        return (
            <div className="search-bar">
                <div className="title">
                    <Heading>{this.props.title || 'Heading...'}  </Heading>
                </div>
                <div className="search">
                    <SearchInput placeholder="Tìm kiếm..." width="100%" onChange={(e) => this.props.onSearch(e.target.value)} />
                </div>
            </div>
        )
    }
}

export default SearchBar
