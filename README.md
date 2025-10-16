# 🎵 YouTube Music Downloader (Desktop App)

Fully open source desktop app for downloading audio (MP3 or WebM) with ease.
Perfect for personal use by musicians, beatmakers, or hobbyists who want to download free-to-use YouTube beats for practice, remixing, or sampling without going to sketchy website tools.

> [!IMPORTANT]
> Star 🌟 the repo, its free, and helps me build more features as it showcases the usage and demand! <br>
> [Join our discord server](discord.gg/4enDY8yhuS) for support, questions and our community built around our ecosystems of many open source free to use tools


## 🚀 Features

- 🎧 **Download high-quality audio** from YouTube videos
- 🎵 **Choose format**: MP3 (with conversion) or WebM (original audio)
- 📁 **Set and remember your download folder** across sessions
- 📊 **Download progress bar** for real-time feedback
- 💾 **Locally stores preferences** (no cloud dependencies)
- 💡 Simple, clean, and dark-themed interface
- ✅ Fully self-contained `.exe` build (no Python or FFmpeg install required)


## 📸 Screenshot UI Showcase

> ![image](https://github.com/user-attachments/assets/12dc521c-f890-4ba1-9c83-54247c917366)

## Download from releases
https://github.com/Refloow/YouTube-Music-Download/releases

# DISCORD Server:
On the server anyone can feel free to ask questions, engage in the comunity and discover other free open source software i build
**https://discord.gg/4enDY8yhuS**


### 🧩 What This App Really Is

This app is **not a breakthrough tool**, nor does it use any advanced techniques, YouTube APIs, or backend scraping.  
It's simply a **clean, user-friendly wrapper** for:

- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) – For downloading audio streams  
- [`ffmpeg`](https://ffmpeg.org/) – For optional MP3 conversion

The app provides a lightweight GUI over existing, open-source command-line tools.  
No hidden logic. No data collection. No manipulation of YouTube systems.


## 📦 Installation (from Source) - for contributors, everyone else head to [ Releases](https://github.com/Refloow/YouTube-Music-Download/releases) to download the built installer or other options

### Prerequisites for installation from source

1. Node.js v20.10.0 https://nodejs.org/en/download
2. Python v3.11 https://www.python.org/downloads/

(i provided versions so exact environment as development can be reproduced)

### 1. Clone the repo
```bash
git clone https://github.com/Refloow/youtube-music-download.git
cd youtube-music-download
```

### 2. Install dependencies
```bash
npm install
```

### 3. Download Required Binaries
Create a `bin/` folder and place the following files inside:

#### ✅ `ffmpeg.exe`
- Download from: [ffmpeg-n7.1-latest-win64-gpl-7.1.zip](https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/ffmpeg-n7.1-latest-win64-gpl-7.1.zip)
- Extract `bin/ffmpeg.exe` and copy it into your project's `bin/` folder

#### ✅ `yt-dlp.exe`
- Download from: [yt-dlp.exe](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe)
- Place it inside the `bin/` folder

### 4. Run the app in development
```bash
npm start
```

### 5. Build the app (Windows)
```bash
npm run dist
```
> The final `.exe` and `portable` version will be in the `/dist` folder.


## 💼 Packaging Notes
- Uses `electron-builder` for cross-platform packaging
- `extraResources` includes `yt-dlp.exe` and `ffmpeg.exe`
- Settings are stored in Electron's `app.getPath('userData')`


## ⚠️ Disclaimer

This application is provided for **personal and educational use only**. I built it to practice coding skills, electron framework app creation and working with audio files.

Downloading videos from YouTube or any other platform **may violate their Terms of Service**. It is the **user's responsibility** to ensure they are authorized to download and use any content.

> The developer of this app does not condone piracy or copyright infringement and takes no responsibility for how this tool is used.


## 📄 License

[MIT License](./LICENSE)

## 👨‍💻 Author

**Veljko Vuckovic**  
MIT Licensed — open to contributions, forks, or improvements!

---

## 🌟 Star the Repo if You Find It Useful!

Happy downloading 🎧
