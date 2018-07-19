import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
    user: {
        name: 'Bob',
        playlists: [
            {
                name: 'My favorites',
                songs: [{name: 'Sober Up', duration: 1345},
                        {name: 'The Next Episode', duration: 1236},
                        {name: 'The Impression That I Get', duration: 1237}
                       ]
            },
            {
                name: 'Deadpool',
                songs: [{name: 'Ashes', duration: 1235},
                        {name: 'All Out of Love', duration: 1236},
                        {name: 'We Belong', duration: 1237}
                       ]
            },
            {
                name: 'Guardians Of The Galaxy',
                songs: [{name: 'Mr. Blue Sky', duration: 1235},
                        {name: 'Fox On The Run', duration: 1236},
                        {name: 'O-o-h Child', duration: 1237}
                       ]
            },
            {
                name: 'Discover Weekly',
                songs: [{name: 'Le song', duration: 1235},
                        {name: 'The song', duration: 1236},
                        {name: 'Songs', duration: 1237}
                       ]
            }
        ]
    }
};

class PlaylistCounter extends Component {
    render() {
        return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
    render() {
        let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
            return songs.concat(eachPlaylist.songs)
        }, [])
        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration
        }, 0)
        return (
        <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
            <h2>{Math.round(totalDuration/60)} hours</h2>
        </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <div style={defaultStyle}>
                <img/>
                <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
            </div>
        );
    }
}

class Playlist extends Component {
    render() {
        let playlist = this.props.playlist
        return (
        <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
            <img />
            <h3>{playlist.name}</h3>
            <ul>
                {playlist.songs.map(songs =>
                <li>{songs.name}</li>
                )}
            </ul>
            </div>
        );
    }
}

class App extends Component {
constructor() {
    super();
    this.state = {
        serverData: {},
        filterString: ''
    }
}
  componentDidMount() {
      setTimeout(() => {
          this.setState({serverData: fakeServerData});
      }, 1000);
  }
  render() {
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}
export default App;
