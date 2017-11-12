import { story } from './story1';

class storyData {
	getStories() {
		var stories = [
			{
				story_name: 'Virtual Friend',
				image:
					'https://elderhsquill.org/wp-content/uploads/2017/05/2016-05-09-1462819580-1765342-thumbnail_videogamecontrollers640.jpg',
				read_time: '5',
				id: '0',
				author_name: 'Sravan',
				author_avatar:
					'http://arswiki.info/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg'
			},
			{
				story_name: 'Under Construction',
				image:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHemwQPIFG6zIklLhq5r-UtC4aLBpvu34EXP1ALoKSCOsYmalf',
				read_time: '8',
				id: '1',
				author_name: 'Sachin',
				author_avatar:
					'http://arswiki.info/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg'
			}
		];
		return stories;
	}

	getStoryData(id) {
		var story_data = {
			story_name: 'Virtual Friend',
			id: '0',
			story_text: story.get_story1_text()
		};
		return story_data;
	}
}

export let story_data = new storyData();
