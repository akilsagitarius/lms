import React, { Component } from 'react';

import List from './List';
import Details from './Details';
import ErrorHandler from '../ErrorHandler';
import ActivityIndicator from '../ActivityIndicator';
import Uploader from './Uploader';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term:       '',
      selection:  null,
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-8">

            <div className={ "fade" + ( this.props.media.length > 0 && !this.props.error ? ' show' : '' ) }>
              {
                this.props.media.length > 0 && !this.state.error &&
                <List
                  data={ this.props.media }
                  onSelect={ selection => this.setState({ selection }) }
                  selection={ this.state.selection }
                  grouping={ this.props.grouping }
                  groupingField={ this.props.groupingField } />
              }
            </div>
            { this.props.media.length === 0 && !this.props.fetching && !this.props.error && <ErrorHandler message="No media found" /> }
            { this.props.media.length === 0 && this.props.fetching && <ActivityIndicator padded /> }
          </div>
          <div className="col-4">

            { this.state.selection !== null && <Details { ...this.props.media.filter( media => media.id === this.state.selection )[0] } /> }

          </div>
        </div>
      </div>
    );
  }
}

export default Main;