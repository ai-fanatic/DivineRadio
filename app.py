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
    #return jsonify(songs)

    # Add a mockup example of adding PDF URL for each song
    songs_with_pdf = []
    for song in songs:
        song_with_pdf = song
        song_name = song['name']
        pdf_url = f"https://raw.githubusercontent.com/ai-fanatic/DivineRadio/main/PDF/{song_name.replace('.mp3', '.pdf')}"  # Adjust the URL pattern as needed
        song_with_pdf['pdf_url'] = pdf_url
        songs_with_pdf.append(song_with_pdf)
    return jsonify(songs_with_pdf)


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/acknowledgements')
def acknowledgements():
    return render_template('acknowledgements.html')

if __name__ == '__main__':
    app.run(debug=True)
