import React from 'react';
import {
	ScrollView,
	Image,
	View,
	TouchableOpacity,
	WebView,
	Text,
	Dimensions
} from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { data } from '../../data';
import { story_data } from '../../stories';
import { Avatar } from '../../components';
import { SocialBar } from '../../components';
import JustifiedText from 'react-native-justified-text';

import Swiper from 'react-native-swiper';
let moment = require('moment');
let song = '';
var Sound = require('react-native-sound');

//Music files placed in android/app/srx/main/res/raw
var song_types = [
	{ song_name: 'music1_app.mp3', volume: 0.5 },
	{ song_name: 'music2_app.mp3', volume: 0.4 },
	{ song_name: 'music1_app.mp3', volume: 0.2 },
	{ song_name: 'music1_app.mp3', volume: 0.7 },
	{ song_name: 'music1_app.mp3', volume: 0.1 }
];

function renderIf(condition, content) {
	if (condition) {
		return content;
	}
	return null;
}

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export class Article extends React.Component {
	static navigationOptions = {
		// title: 'Article View'.toUpperCase()
		header: null
	};

	constructor(props) {
		super(props);
		let { params } = this.props.navigation.state;
		let id = params ? params.id : 0;
		this.data = story_data.getStoryData(0);
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
		}, 2000);
	}

	getSong(index) {
		this.state.song ? this.state.song.pause() : console.log('no music');
		var current_song = song_types[index];
		var music_name = current_song.song_name;
		var volume = current_song.volume;
		song = new Sound(music_name, Sound.MAIN_BUNDLE, error => {
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
		this.state.song.pause();
		this.state.song.release();
	}

	onPageSwipe(index) {
		console.log(this.state.volume);
		// var self = this;
		// setTimeout(function() {
		this.getSong(index);
		// }, 1000);
	}

	render() {
		var pages = this.data.pages.map((page, index) =>
			console.log('index is:', index)
		);
		return (
			<Swiper
				onIndexChanged={index => this.onPageSwipe(index)}
				showsPagination={false}
				loop={false}
				paginationStyle={{ position: 'absolute', bottom: 2 }}
				bounces={true}
			>
				{this.data.pages.map((page, index) =>
					<View style={styles.root} key={index}>
						{renderIf(
							index == 0,
							<View rkCardHeader style={{ alignItems: 'center' }}>
								<View style={{ alignItems: 'center' }}>
									<RkText style={{ marginBottom: 0 }} rkType="header4">
										{this.data.story_name}
									</RkText>
								</View>
							</View>
						)}
						<View rkCardContent>
							<RkText
								rkType="primary3 bigLine"
								style={{
									fontFamily: 'Muli-Regular',
									fontSize: 16,
									lineHeight: 30,
									textAlign: 'justify'
								}}
							>
								{this.data.pages[index]}
							</RkText>
						</View>
						<View rkCardFooter style={{ alignItems: 'center' }}>
							<Text>
								{index + 1}
							</Text>
						</View>
					</View>
				)}
			</Swiper>
		);
	}
}

let styles = RkStyleSheet.create(theme => ({
	root: {
		backgroundColor: theme.colors.screen.base,
		padding: 35,
		height: screenHeight
	},
	title: {
		marginBottom: 5
	}
}));
