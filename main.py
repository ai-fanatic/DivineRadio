from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/songs')
def get_songs():
    # GitHub API call to fetch MP3 files
    # Assuming the repository's content is public
    response = requests.get('https://api.github.com/repos/ai-fanatic/DivineRadio/contents/Audio')
    songs = [file for file in response.json() if file['name'].endswith('.mp3')]
    return jsonify(songs)

if __name__ == '__main__':
    app.run(debug=True)
