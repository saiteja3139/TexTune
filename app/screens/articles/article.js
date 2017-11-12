import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { data } from '../../data';
import { story_data } from '../../stories';
import { Avatar } from '../../components';
import { SocialBar } from '../../components';

import Swiper from 'react-native-swiper';
let moment = require('moment');
var Sound = require('react-native-sound');

//Music files placed in android/app/srx/main/res/raw
var song_types = [
	{ song_name: 'music1_app.mp3', volume: 0.5 },
	{ song_name: 'music2_app.mp3', volume: 0.4 },
	{ song_name: 'music1_app.mp3', volume: 0.2 },
	{ song_name: 'music1_app.mp3', volume: 0.7 }
];
export class Article extends React.Component {
	static navigationOptions = {
		title: 'Article View'.toUpperCase()
	};

	constructor(props) {
		super(props);
		let { params } = this.props.navigation.state;
		let id = params ? params.id : 0;
		this.data = story_data.getStoryData(id);
		this.state = {
			song: '',
			volume: 0.4,
			songLength: ''
		};
	}

	componentWillMount() {
		var that = this;
		setTimeout(function() {
			that.getSong(0);
		}, 3000);
	}

	getSong(index) {
		var current_song = song_types[index];
		var music_name = current_song.song_name;
		var volume = current_song.volume;
		var song = new Sound(music_name, Sound.MAIN_BUNDLE, error => {
			if (error) {
				console.log('failed to load the sound', error);
				this.setState({
					error: error.message
				});
			} else {
				// loaded successfully
				console.log(
					'duration in seconds: ' +
						song.getDuration() +
						'number of channels: ' +
						song.getNumberOfChannels()
				);
				this.setState({
					volume: volume,
					song: song,
					songLength: song.getDuration()
				});
				this.state.song.play();
				song.setNumberOfLoops(-1);
			}
		});
	}

	componentWillUnmount() {
		this.state.song.release();
	}

	onPageSwipe(index) {
		if (this.state.song) {
			this.state.song.pause();
		}
		var that = this;
		setTimeout(function() {
			that.getSong(index);
		}, 1500);
	}

	render() {
		return (
			<Swiper onIndexChanged={index => this.onPageSwipe(index)}>
				<View style={styles.root}>
					<RkCard rkType="article">
						<View rkCardHeader>
							<View>
								<RkText style={styles.title} rkType="header4">
									{this.data.story_name}
								</RkText>
							</View>
						</View>
						<View rkCardContent>
							<View>
								<RkText rkType="primary3 bigLine">
									{this.data.story_text}
								</RkText>
							</View>
						</View>
					</RkCard>
				</View>

				<View style={styles.root}>
					<RkCard rkType="article">
						<View rkCardContent>
							<View>
								<RkText rkType="primary3 bigLine">
									{this.data.story_text}
								</RkText>
							</View>
						</View>
					</RkCard>
				</View>
			</Swiper>
		);
	}
}

let styles = RkStyleSheet.create(theme => ({
	root: {
		backgroundColor: theme.colors.screen.base
	},
	title: {
		marginBottom: 5
	}
}));
