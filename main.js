song1 = "";
song2 = "";
function preload()
{
	song1 = loadSound("music.mp3");
	song2 = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;



function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);
		song2.stop();
		song1.play();
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		song1.stop();
		song2.play();
		
	}

}

function play()
{
	song1.play();
	
}
