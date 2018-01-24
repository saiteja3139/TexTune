import React from 'react';
import {
	View,
	Image,
	ScrollView,
	Dimensions,
	InteractionManager,
	findNodeHandle
} from 'react-native';

import { RkText, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';

import { FontAwesome } from '../../assets/icons';
import { BlurView, VibrancyView } from 'react-native-blur';

import {
	ProgressChart,
	DoughnutChart,
	AreaChart,
	AreaSmoothedChart
} from '../../components/';

export class Dashboard extends React.Component {
	static navigationOptions = {
		title: 'Dashboard'.toUpperCase()
	};

	constructor(props) {
		super(props);
		this.state = {
			// showBlur: true,
			viewRef: null,
			blurType: 'light'
		};
		this.data = {
			statItems: [
				{
					name: 'Stars',
					value: '4,512',
					icon: 'github',
					background: RkTheme.current.colors.dashboard.stars
				},
				{
					name: 'Tweets',
					value: '2,256',
					icon: 'twitter',
					background: RkTheme.current.colors.dashboard.tweets
				},
				{
					name: 'Likes',
					value: '1,124',
					icon: 'facebook',
					background: RkTheme.current.colors.dashboard.likes
				}
			]
		};
	}
	imageLoaded() {
		// Workaround for a tricky race condition on initial load.
		console.log('hey', findNodeHandle(this.refs.backgroundImage));
		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => {
				this.setState({ viewRef: findNodeHandle(this.refs.backgroundImage) });
			}, 500);
		});
	}

	renderStatItem(item) {
		return (
			<View
				style={[styles.statItemContainer, { backgroundColor: item.background }]}
				key={item.name}
			>
				<View>
					<RkText rkType="header6" style={styles.statItemValue}>
						{item.value}
					</RkText>
					<RkText rkType="secondary7" style={styles.statItemName}>
						{item.name}
					</RkText>
				</View>
				<RkText rkType="awesome hero" style={styles.statItemIcon}>
					{FontAwesome[item.icon]}
				</RkText>
			</View>
		);
	}

	render() {
		let chartBlockStyles = [
			styles.chartBlock,
			{
				backgroundColor: RkTheme.current.colors.control.background
			}
		];

		return (
			<View>
				<ScrollView
					style={styles.screen}
					// ref={'backgroundImage'}
					// onScroll={this.imageLoaded.bind(this)}
				>
					{this.state.viewRef &&
						<BlurView
							viewRef={this.state.viewRef}
							style={styles.blurView}
							blurRadius={9}
							blurType={this.state.blurType}

							// The following props are also available on Android:

							// blurRadius={20}
							// downsampleFactor={10}
							// overlayColor={'rgba(0, 0, 255, .6)'}   // set a blue overlay
						/>}
					<View
						style={chartBlockStyles}
						ref={'backgroundImage'}
						onMoveShouldSetResponderCapture={this.imageLoaded.bind(this)}
					>
						<DoughnutChart />
					</View>

					<View style={styles.statItems}>
						{this.data.statItems.map(item => this.renderStatItem(item))}
					</View>

					<View style={chartBlockStyles}>
						<AreaChart />
					</View>
					<View style={chartBlockStyles}>
						<ProgressChart />
					</View>
					<View style={chartBlockStyles}>
						<AreaSmoothedChart />
					</View>
				</ScrollView>
			</View>
		);
	}
}

let styles = RkStyleSheet.create(theme => ({
	screen: {
		backgroundColor: theme.colors.screen.scroll,
		paddingHorizontal: 15
	},
	blurView: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
		zIndex: 1
		//backgroundColor: 'white'
	},
	statItems: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 15
	},
	statItemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 3,
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	statItemIcon: {
		alignSelf: 'center',
		marginLeft: 10,
		color: 'white'
	},
	statItemValue: {
		color: 'white'
	},
	statItemName: {
		color: 'white'
	},
	chartBlock: {
		padding: 15,
		marginBottom: 15,
		justifyContent: 'center'
	}
}));
