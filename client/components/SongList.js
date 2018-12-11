import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => {
        this.props.data.refetch();
      })
      .catch(() => {});
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <NavLink to={`/songs/${id}`}>{title}</NavLink>

          <i
            className="material-icons right"
            onClick={() => {
              this.onSongDelete(id);
            }}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading..</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <NavLink className="btn-floating btn-large red right" to="/songs/new">
          <i className="material-icons">add</i>
        </NavLink>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
