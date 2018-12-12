import React, { Component } from "react";
import Tracklist from "../Tracklist/TrackList";
import axios from "axios";
import { format } from "url";

function formatTime(date) {
  date = new Date(date);
  return date.toLocaleDateString();
}

const Stat = props => (
  <div className={props.className + " stat"}>
    <div className="stat-name">{props.display}</div>
    <div className="stat-value">{props.stat}</div>
  </div>
);

const Profile = props => (props.user ?
  <main className="profile-page">
    <div className="profile-header">
      <div className="profile-pic">
        <img className="pic" src={props.user.imageUrl} alt="user avatar"/>
      </div>
    </div>

    <div className="profile-bar">
      <div className="stats">
        <Stat className="trax" display="Trax" stat={props.user.tracks.length || 0} />
        <Stat className="record" display="Record" stat="1.4m" />
        <Stat className="rank" display="Rank" stat="33" />
        <Stat className="retrax" display="Retrax" stat={5} />
        <Stat className="dislikes" display="Dislikes" stat="16" />
      </div>

      <div className="edit-profile">
        <a href="/settings"><p>Edit Profile</p></a>
      </div>
    </div>

    <div className="profile-content">
      <div className="profile-profile">
        <div className="profile-names">
          <p className="screen-name">{props.user.displayName}</p>
          <p className="handle">#{props.user.username}</p>
        </div>

        <div className="profile-info">
          {props.user.location ? <p>
            <i className="fas fa-map-marker-alt" />
            {props.user.location}
          </p> : ''}
          {props.user.website ? <p className="website">
            <i className="fas fa-link" />
            {props.user.website}
          </p> : ''}
          <p>
            <i className="far fa-calendar-alt" />
            Joined {formatTime(props.user._joinedAt)}
          </p>
          {props.user.birthday ? <p>
            <i className="fas fa-birthday-cake" />
            Born {formatTime(props.user.birthday)}
          </p> : ''}
        </div>
      </div>
      <div className="profile-newsfeed">
        <Tracklist />
      </div>
    </div>
  </main>
  : '');

class classProfile extends React.Component {
  state = {
    user: null
  }
  getUserInfo() {

  }

  componentWillMount() {
    if (this.props.user) {
      if (this.props.user.username !== this.props.match.params.username) {
        axios
          .get(`/api/users/${this.props.match.params.username}`)
          .then(res => {
            console.log(res);
            if (res.data.error) {
              // window.location.pathname = '/';
            } else {
              this.setState({
                user: res.data
              })
            }
          })
          .catch(err => console.error(err))
      }
    } else if (!this.props.loggedIn) {
      axios
        .get(`/api/users/${this.props.match.params.username}`)
        .then(res => {
          console.log(res);
          if (res.data.error) {
            // window.location.pathname = '/';
          } else {
            this.setState({
              user: res.data
            })
          }
        })
        .catch(err => console.error(err))
    }
  }

  render() {
    return (
      this.props.user ?
        this.props.user.username === this.props.match.params.username ?
          <Profile user={this.props.user} />
          : <Profile user={this.state.user} />
        : <Profile user={this.state.user} />
    )
  }
}


export default classProfile;
