from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# songs #
@app.route('/api', methods=['GET'])
def api():
  return {
      "songs": [
          {"title": "Why Would You Be Loved", "artist": "Hozier", "src": "audio_files/why_would_you_be_loved-hozier.mp3"},
          {"title": "NFWMB", "artist": "Hozier", "src": "audio_files/nfwmb-hozier.mp3"},
          {"title": "Love Of", "artist": "Hozier", "src": "audio_files/love_of-hozier.mp3"}
      ]
  }

if __name__ == '__main__':
  app.run()