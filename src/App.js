import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            value: '',
        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    componentDidMount() {

        fetch('seriesList.json', {})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("well");
            });

        fetch('seriesEpisodesList.json', {})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    render() {
        return (
            <div>
                <input type="text" id="seriesTitleSearch" placeholder="Rechercher" value={this.state.value} onChange={this.onChange} />
                <ul>
                    {this.state.seriesList.length ?
                        this.state.seriesList.map(item => <li key={item.id}>{item.seriesName}</li>)
                        : <li>Loading...</li>
                    }


                    {this.state.value !== "" ?

                        this.state.seriesList.filter(
                            first => first.seriesName.trim().indexOf(this.state.value) > -1
                        ).map(item => <li key={item.id}>{item.seriesName}

                            <ul>
                                {
                                    this.state.seriesEpisodesList.filter(
                                        second => second.serie_id == item.id
                                    ).map(episode => episode.episodes_list.filter(
                                        third => third.episodeName
                                        ).map(name => <li>{name.episodeName}</li>)
                                    )
                                }
                            </ul>
                        </li> ) : <li></li>
                    }
                </ul>

            </div>
        )
    }

}



export default App;
