import React from 'react';
import {
	ScrollView,
	Image,
	View,
	TouchableOpacity,
	WebView,
	Text,
	Dimensions,
	TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableNativeFeedback,
	PanResponder, // we want to bring in the PanResponder system
	Animated
} from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { data } from '../../data';
import { story_data } from '../../stories';
import { Avatar } from '../../components';
import { SocialBar } from '../../components';
import JustifiedText from 'react-native-justified-text';
import { Immersive } from 'react-native-immersive';

import Swiper from 'react-native-swiper';
let moment = require('moment');
let song = '';
var Sound = require('react-native-sound');

//Music files placed in android/app/srx/main/res/raw
var song_types = [
	{ song_name: 'page_1_2.mp3' },
	{ song_name: 'page_1_2.mp3' },
	{ song_name: 'page_3.mp3' },
	{ song_name: 'page_4.mp3' },
	{ song_name: 'page_5.mp3' }
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
			volume: 0.7,
			songLength: '',
			screenTap: false
		};
	}

	componentWillMount() {
		var self = this;
		setTimeout(function() {
			self.getSong(0);
		}, 1);
		Immersive.on();
		Immersive.setImmersive(true);

		self._panResponder = PanResponder.create({
			onStartShouldSetPanResponderCapture: (e, gestureState) => {
				self.setState({ screenTap: true });
			},
			onPanResponderEnd: (e, gestureState) => {
				console.log('e', e);
				console.log('gestureState', gestureState);
				self.setState({ screenTap: false });
			},
			onMoveShouldSetPanResponder: (e, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
			onStartShouldSetPanResponder: (e, gestureState) => true,
			// onStartShouldSetPanResponderCaptu	re: (e, gestureState) => true,
			// onPanResponderReject: (e, gestureState) => {
			// 	console.log('5');
			// },
			// onPanResponderGrant: (e, gestureState) => {
			// 	console.log('6');
			// },
			// onPanResponderStart: (e, gestureState) => {
			// 	console.log('7');
			// },
			// onPanResponderEnd: (e, gestureState) => {
			// 	console.log('8');
			// },
			onPanResponderRelease: (e, gestureState) => {
				console.log('9');
			}
			// onPanResponderMove: (e, gestureState) => {
			// 	console.log('10');
			// },
			// onPanResponderTerminate: (e, gestureState) => {
			// 	console.log('11');
			// },
			// onPanResponderTerminationRequest: (e, gestureState) => {
			// 	console.log('12');
			// },
			// onShouldBlockNativeResponder: (e, gestureState) => {
			// 	console.log('13');
			// }
		});
	}

	// console.log() requires firebug

	getSong(index) {
		this.state.song ? this.state.song.pause() : console.log('no music');
		var current_song = song_types[index];
		var music_name = current_song.song_name;
		var volume = this.state.volume;
		// console.log('music_name', music_name);
		song = new Sound(music_name, Sound.MAIN_BUNDLE, error => {
			// console.log('song', song);
			if (error) {
				// console.log('failed to load the sound', error);
				this.setState({
					error: error.message
				});
			} else {
				// loaded successfully
				// console.log(
				// 	'duration in seconds: ' +
				// 		song.getDuration() +
				// 		'number of channels: ' +
				// 		song.getNumberOfChannels()
				// );
				this.setState({
					volume: volume,
					//song: song,
					songLength: song.getDuration()
				});
				this.state.song.play();
				song.setNumberOfLoops(-1);
			}
		});

		this.setState({ song: song });
	}

	componentDidUpdate(prevProps, prevState) {
		var self = this;

		if (
			prevState.screenTap != self.state.screenTap &&
			self.state.screenTap == true &&
			self.state.song
		) {
			var fadeOut = setInterval(function() {
				if (prevState.song == self.state.song && self.state.volume > 0) {
					self.setState({
						volume: parseFloat(self.state.volume - 0.1).toFixed(1)
					});
				} else if (self.state.screenTap == false || self.state.volume <= 0) {
					clearTimeout(fadeOut);
				}
				self.state.song.setVolume(parseFloat(self.state.volume));
			}, 100);
		} else if (
			prevState.screenTap != self.state.screenTap &&
			self.state.screenTap == false &&
			self.state.song
		) {
			var fadeIn = setInterval(function() {
				if (self.state.volume < 0.7) {
					self.setState({
						volume: parseFloat(parseFloat(self.state.volume) + 0.1).toFixed(1)
					});
				} else {
					clearTimeout(fadeIn);
				}
				self.state.song.setVolume(parseFloat(self.state.volume));
			}, 100);
		}
	}

	componentWillUnmount() {
		this.state.song.pause();
		this.state.song.release();
		Immersive.off();
		Immersive.setImmersive(false);
	}

	onPageSwipe(index) {
		//console.log('onPageSwipe', index, this.state.volume);
		// var self = this;
		// setTimeout(function() {
		var self = this;
		self.getSong(index);
		var fadeIn = setInterval(function() {
			if (self.state.volume < 0.7) {
				self.setState({
					volume: parseFloat(parseFloat(self.state.volume) + 0.1).toFixed(1)
				});
			} else {
				clearTimeout(fadeIn);
			}
			self.state.song.setVolume(parseFloat(self.state.volume));
		}, 100);

		// }, 1000);
	}

	onPressButton() {
		//	console.log('You tapped the screen!');
	}

	setScreenHeight(index) {
		if (index == 0) {
			return screenHeight * 0.8;
		} else {
			return screenHeight * 0.9;
		}
	}

	render() {
		var pages = this.data.pages.map(
			(page, index) => {}
			// console.log('index is:', index)
		);
		console.log('state', this.state.volume);

		return (
			<Swiper
				onIndexChanged={index => this.onPageSwipe(index)}
				showsPagination={false}
				loop={false}
				paginationStyle={{ position: 'absolute', bottom: 2 }}
				bounces={true}
			>
				{this.data.pages.map((page, index) =>
					<TouchableNativeFeedback onPress={this.onPressButton} key={index}>
						<View
							style={styles.root}
							key={index}
							{...this._panResponder.panHandlers}
						>
							{renderIf(
								index == 0,
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										marginBottom: 20,
										height: screenHeight * 0.05
									}}
								>
									<RkText
										style={{ marginBottom: 0, marginTop: 3, fontSize: 20 }}
										rkType="header4"
									>
										{this.data.story_name}
									</RkText>
								</View>
							)}

							<JustifiedText
								text={this.data.pages[index]}
								color="black"
								fontFamily="Muli-Regular.ttf"
								fontSize={16}
								lineHeightMultiplicator={1.45}
								style={{ height: this.setScreenHeight(index), marginTop: 10 }}
							/>

							<View
								style={{
									alignItems: 'center',
									marginBottom: 0,
									justifyContent: 'center',
									position: 'absolute',
									bottom: 0,
									height: screenHeight * 0.1,
									alignItems: 'center'
								}}
							>
								<Text
									style={{
										marginBottom: 5,
										justifyContent: 'center',
										marginLeft: screenWidth / 2,
										fontWeight: '500'
									}}
								>
									{index + 1}
								</Text>
							</View>
						</View>
					</TouchableNativeFeedback>
				)}
			</Swiper>
		);
	}
}

let styles = RkStyleSheet.create(theme => ({
	root: {
		backgroundColor: theme.colors.screen.base,
		padding: 25,
		height: screenHeight
	},
	title: {
		marginBottom: 5
	}
}));
