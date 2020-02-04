import os
from flask import Flask

app = Flask(__name__)

@app.route('/generate-course')
def generate():
    list_of_videos = ["file './public/videos/a2.mp4'", "file './public/videos/b2.mp4'"]
    string_of_videos = '\n'.join(list_of_videos)

    f = open('temp.txt', 'w')
    f.write(string_of_videos)
    f.close()

    os.system("ffmpeg -f concat -safe 0 -i temp.txt -c copy course.mp4")
    return '{ done: true }' 