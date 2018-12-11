import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { NavLink } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>loading..</div>;
    }
    if (this.props.data.error) {
      return (
        <div>
          <NavLink to="/">Back</NavLink>
          <h3>Error. </h3>
        </div>
      );
    }
    return (
      <div>
        <NavLink to="/">Back</NavLink>
        <h3> {this.props.data.song.title}</h3>
        <LyricList lyrics={this.props.data.song.lyrics} />
        <LyricCreate songId={this.props.data.song.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.match.params.id } };
  }
})(SongDetail);
