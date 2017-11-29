var story_title = 'Virtual Friend';

var story1_text =
	'“Son”, He was playing Minecraft on a public server.\
	His eyes were locked into the action. Comments scrolled down the side of the screen in a chat box.' +
	'\n' +
	'“Son, can you stop your game for a minute?”' +
	'\n' +
	'He exited the world, closed the laptop, and looked up to at me.' +
	'\n' +
	'“Dad, is this going to be another cheesy scary story ?“' +
	'\n' +
	"“Whhaaaat? , I thought you liked my cautionary tales”\
	He grew up listening stories about children who encountered witches, ghosts, werewolves. Like many generations of parents, I used scary stories to reinforce morals and teach lessons about safety. Single dad like me should use all the parenting tools at their disposal.\
	He scrunched his face a little, “Dad, They were fine when I was six, I'm Ten now, give me better stories”" +
	'\n' +
	"“Hmmm.... Okay. I'll try.” I began, “Once upon a time, there was a boy named Colby…..”";

var story2_text =
	"His expression indicated that he wasn't impressed by the introduction. He sighed deeply and settled in for one of Dad's cheesy stories.\
	I continued..." +
	'\n' +
	"“Colby went online and joined several children's websites. After a while, he made friends with another Ten year old boy named Helper23.\
	 They liked the same video games and shows.\
	They laughed at each other’s jokes, explored new games together.\
	After several months of friendship, Colby gave Helper23 six diamonds in a game they were playing.\
	This was a very generous gift. Colby's birthday was coming up and Helper23 wanted to send him a cool present in real life.\
	Colby figured it wouldn't hurt to give Helper23 his home address - as long as he promised not to tell it to any strangers or grown-ups.\
	Helper23 swore he wouldn't tell anyone else, not even his own parents, and set about mailing the package.”" +
	'\n' +
	'I paused the story and asked my son, “Do you think that was a good idea?” “No!”, he said shaking his head vigorously.';

var story3_text =
	'In spite of himself, he was getting into the story. I continued...' +
	'\n' +
	'“After School that day, Colby ran to his house, holding his zest to unpack the gift from Helper23. \
	He was welcomed to a grim silence and an empty hallway. Feeling aloof, he started calling out his Mom and Dad.”' +
	'\n' +
	'In spite of his tough talk, my son leaned forward wide-eyed. I continued the story quietly and deliberately .' +
	'\n' +
	"“Colby heard his baby brother coo in the nursery.  Finally, his dad's footsteps echoed down the hall“." +
	'\n' +
	'“Hey Dad?” He called out nervously but there was no response. He saw his dad standing in a corner enervated.\
Feeling petrified, he asked “Is Mom around?”' +
	'\n' +
	"“Here I am!” Mom's head popped into the doorway below Dad's. “Were you about to tell us that you gave our home address to Helper23?\
 You shouldn't have done that! We told you never to give out personal information on the Internet!”" +
	'\n' +
	'“Do you know what he did?”';

var story4_text =
	'“He came to  our house, broke in, and murdered both of us! Just so he could spend some time with you!”, \
	 said his mother with a croaky voice rolling her eyes over Colby. ' +
	'“Having Sensed a presence behind him, Colby was shaken to the core. With a contentious picture in his mind, \
	 he tried to turn around. Everything seemed in slow motion, he could hear his heart beat rising up. \
	 He was staggered by the sight of severed heads of his parents hanging from hands of a wet jacket fat man. \
	 Before he could recover his senses, he saw the heads being rolled down and a knife racing towards him in a flash“.' +
	'\n' +
	'My son screamed too. He twisted his hands defensively over his face. But I was just getting started.' +
	'\n' +
	'“The killer noticed the wailing of a baby in another room and took his knife off Colby. \
	 Helper23 left Colby to die and followed the cries through the house like a homing beacon.\
	 In the nursery, he walked to the crib, picked the baby up, and held it in his arms.';

var story5_text =
	" But as he held the baby, the crying died down. “The baby Looked up and smiled. Helper23 had never held a baby, but he gently bounced it in his arms like a pro.\
		He wiped his bloody hands on the blanket so he could stroke the baby's cheek“." +
	'\n' +
	'“Hey there, sweet little guy”.' +
	'\n' +
	'”The beautiful rage of sadism melted into something warmer and softer.\
		He walked out of the nursery, took the baby home, named him William, and raised him as his very own.”' +
	'\n' +
	"After I finished the story, my son was visibly shaken. Between ragged staccato breaths, he stammered, \
	“But dad, My name's William.” I gave him a smile and tousled his hair." +
	'\n' +
	'“Of course it is son…”';

var story_pages_text = [
	story1_text,
	story2_text,
	story3_text,
	story4_text,
	story5_text
];

class story1 {
	constructor() {
		this.story_title = story_title;
		this.story_pages_text = story_pages_text;
	}

	get_story_text(id) {
		return stories[id];
	}
}

export let story = new story1();
