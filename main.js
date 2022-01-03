objects=[]
function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocoSSD',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function preload() {
    song=loadSound("intruder_alert.mp3");
}
function draw() {
    image(video,0,0,380,380);
    if(status!= "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="Status: object detected";
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person") {
                document.getElementById("baby").innerHTML="baby found";
                song.stop();
            }
            else {
                document.getElementById("baby").innerHTML="baby not found";
                song.play();
            }
        }
        if(objects.length==0) {
            document.getElementById("baby").innerHTML="baby not found";
            song.play();
        }
    }
}