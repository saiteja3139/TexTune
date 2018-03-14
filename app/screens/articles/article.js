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
	Animated,
	InteractionManager,
	findNodeHandle,
	StatusBar
} from 'react-native';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import { data } from '../../data';
import { story_data } from '../../stories';
import { Avatar } from '../../components';
import { SocialBar } from '../../components';
import JustifiedText from 'react-native-justified-text';
import { Immersive } from 'react-native-immersive';
import { BlurView, VibrancyView } from 'react-native-blur';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
let moment = require('moment');
let song = '';
var Sound = require('react-native-sound');

//Music files placed in android/app/srx/main/res/raw
var song_types = [
	{ song_name: 'amar_1.mp3' },
	{ song_name: 'amar_2.mp3' },
	{ song_name: 'amar_3.mp3' },
	{ song_name: 'amar_4.mp3' },
	{ song_name: 'amar_5.mp3' },
	{ song_name: 'amar_6.mp3' },
	{ song_name: 'amar_7.mp3' }
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

// var fadeOut = setInterval(function(low, range, interval, self) {
// 	let range = range ? range : 0.1;
// 	let low = low ? low : 0;
// 	let interval = interval ? interval : 100;
// 	if (prevState.song == self.state.song && self.state.volume > low) {
// 		self.setState({
// 			volume: parseFloat(self.state.volume - range).toFixed(1)
// 		});
// 	} else if (self.state.screenTap == false || self.state.volume <= low) {
// 		clearTimeout(fadeOut);
// 	}
// 	self.state.song.setVolume(parseFloat(self.state.volume));
// }, interval);
//
// var fadeIn = setInterval(function(high, range, interval, self) {
// 	let range = range ? range : 0.1;
// 	let high = high ? high : 0.7;
// 	let interval = interval ? interval : 100;
// 	if (self.state.volume < high) {
// 		self.setState({
// 			volume: parseFloat(parseFloat(self.state.volume) + 0.1).toFixed(1)
// 		});
// 	} else {
// 		clearTimeout(fadeIn);
// 	}
// 	self.state.song.setVolume(parseFloat(self.state.volume));
// }, interval);

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
			screenTap: false,
			viewRef: null,
			blurType: 'dark',
			pageNumber: ''
		};
	}

	componentWillMount() {
		var self = this;
		setTimeout(function() {
			self.getSong(0);
		}, 1);
		Immersive.on();
		Immersive.setImmersive(true);

		self._panResponder = PanResponder.create(
			{
				// onStartShouldSetPanResponderCapture: (e, gestureState) => {
				// 	self.setState({ screenTap: true });
				// },
				// onPanResponderEnd: (e, gestureState) => {
				// 	console.log('e', e);
				// 	console.log('gestureState', gestureState);
				// 	self.setState({ screenTap: false });
				// },
				// onMoveShouldSetPanResponder: (e, gestureState) => true,
				// onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
				// onStartShouldSetPanResponder: (e, gestureState) => true,
				// // onStartShouldSetPanResponderCaptu	re: (e, gestureState) => true,
				// // onPanResponderReject: (e, gestureState) => {
				// // 	console.log('5');
				// // },
				// // onPanResponderGrant: (e, gestureState) => {
				// // 	console.log('6');
				// // },
				// // onPanResponderStart: (e, gestureState) => {
				// // 	console.log('7');
				// // },
				// // onPanResponderEnd: (e, gestureState) => {
				// // 	console.log('8');
				// // },
				// onPanResponderRelease: (e, gestureState) => {
				// 	console.log('9');
				// }
				// // onPanResponderMove: (e, gestureState) => {
				// // 	console.log('10');
				// // },
				// // onPanResponderTerminate: (e, gestureState) => {
				// // 	console.log('11');
				// // },
				// // onPanResponderTerminationRequest: (e, gestureState) => {
				// // 	console.log('12');
				// // },
				// // onShouldBlockNativeResponder: (e, gestureState) => {
				// // 	console.log('13');
				// // }
			}
		);
	}

	componentDidMount() {
		StatusBar.setHidden(true, 'slide');
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
		if (prevState.pageNumber != self.state.pageNumber) {
			self.getSong(self.state.pageNumber);
		}

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
	handleScroll(event, self) {
		console.log('screenH	eight', event.nativeEvent.contentOffset.y);
		let scrollY = event.nativeEvent.contentOffset.y;
		let pageNumber = parseInt(scrollY / screenHeight * 1.3);
		if (
			4488 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 543
		) {
			self.setState({ pageNumber: 0 });
		} else if (
			579 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 1207
		) {
			self.setState({ pageNumber: 1 });
		} else if (
			1228 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 1480
		) {
			self.setState({ pageNumber: 2 });
		} else if (
			1480 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 1920
		) {
			self.setState({ pageNumber: 3 });
		} else if (
			1954 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 2083
		) {
			self.setState({ pageNumber: 4 });
		} else if (
			2085 < event.nativeEvent.contentOffset.y &&
			event.nativeEvent.contentOffset.y < 2330
		) {
			self.setState({ pageNumber: 5 });
		} else if (2405 < event.nativeEvent.contentOffset.y) {
			self.setState({ pageNumber: 6 });
		}
	}

	render() {
		// console.log('screenHeight', screenHeight);

		return (
			<View style={styles.root}>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						height: screenHeight * 0.1,
						backgroundColor: 'black'
					}}
				>
					<RkText
						style={{
							marginBottom: 0,
							marginTop: 20,
							fontSize: 20,
							color: 'white'
						}}
						rkType="header4"
					>
						{this.data.story_name}
					</RkText>
				</View>
				<LinearGradient
					locations={[0.0, 0.05, 0.15, 0.15, 0.35, 0.35, 0.5, 0.75, 1]}
					colors={[
						'rgba(0, 0, 0, 1)',
						'rgba(0, 0, 0, 0.5)',
						'rgba(0, 0, 0, 0)',
						'rgba(0, 0, 0, 0)',
						'rgba(0, 0, 0, 0)',
						'rgba(0, 0, 0, 0)',
						'rgba(0, 0, 0, 0.5)',
						'rgba(0, 0, 0, 1)',
						'rgba(0, 0, 0, 1)'
					]}
					style={styles.linearGradient}
				>
					<ScrollView
						style={styles.scrollView}
						onScroll={e => this.handleScroll(e, this)}
					>
						<JustifiedText
							text={this.data.pages[0]}
							color="black"
							fontFamily="Muli-Regular.ttf"
							fontSize={16}
							lineHeightMultiplicator={1.45}
							style={{
								flexDirection: 'row',
								height: screenHeight * 4.65,
								marginTop: 90
							}}
						/>
					</ScrollView>
				</LinearGradient>
			</View>
		);
	}
}

let styles = RkStyleSheet.create(theme => ({
	root: {
		backgroundColor: theme.colors.screen.base,
		height: screenHeight
	},
	title: {
		marginBottom: 5
	},
	scrollView: {
		paddingHorizontal: 25
	},
	blurView: {
		position: 'absolute',
		left: 0,
		top: 200,
		bottom: 0,
		right: 0,
		zIndex: 1,
		backgroundColor: 'rgba(0, 0, 0, .8)'
	}
}));
