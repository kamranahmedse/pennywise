<p align="center">
  <img src="https://i.imgur.com/bKsns66.png" height="148">
  <h2 align="center">Pennywise</h2>
  <p align="center">Cross-platform application to open website or media in a floating window<p>
  <p align="center">
    <a href="https://github.com/kamranahmedse/pennywise/blob/master/license">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
    <a href="https://github.com/kamranahmedse/pennywise">
    	<img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue.svg" alt="platforms" />
    </a>
    <a href="https://github.com/kamranahmedse/pennywise">
	    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="prs welcome">
    </a>
  </p>
</p>

Pennywise opens any website or media in a **small floating window that remains on top of all other applications**. Pennywise windows stays up **all the time**. No need to keep struggling with <kbd>alt + tab</kbd>, use Pennywise for **easy multitasking**.

## Features
* Always **stays on top** of any open applications
* **Adjustable opacity** – it gets out of your way while you work
* **Resize and place** it anywhere
* **Shortcuts** to make you more productive
* Lets you **multitask** while you work
* **Opensource** licensed under MIT
* **Lean** small resource footprint, minimal User Interface.
* **Cross-platform** works on MacOS, Windows and Linux

## Installation

Download and install the relevant distribution from the [releases page](http://github.com/kamranahmedse/pennywise/releases).

If you are on MacOS, you can use [Homebrew](https://brew.sh/) to install it

```
brew cask install pennywise
```

## Usecases

> Here is the list of some of the possible usecases off the top of my head

* Use it as a floating window for your calendar/checklist/assigned-tickets etc
* Watching tutorial while you code? Open the video in Pennywise and keep it in front of you
* Making a video course? Open the demo in Pennywise and show the output in real time
* Working on some web UI? Open it in Pennywise to avoid pressing <kbd>alt + tab</kbd> again and again
* Play some video, watch some talk or play some TV series while you work
* Working on something non-familiar? Open the docs in Pennywise
* Open that live football match that you won't want to miss
* Use it as a desktop widget

## Development

Clone the repository, install the dependencies and start the app

```bash
yarn install
yarn start
```

## Shortcuts

> Here is the list of available shortcuts that you may use

| **Shortcut**                       | **Description**                  |
|------------------------------------|----------------------------------|
| <kbd>Cmd/Ctrl + L</kbd>            | Show Navbar and focus URL input  |
| <kbd>Cmd/Ctrl + Shift + M</kbd>    | Enable detached mode             |
| <kbd>Cmd/Ctrl + Shift + L</kbd>    | Toggle Navbar on WebPages        |
| <kbd>Cmd/Ctrl + Shift + Up</kbd>   | Increase Opacity                 |
| <kbd>Cmd/Ctrl + Shift + Down</kbd> | Decrease Opacity                 |
| <kbd>Cmd/Ctrl + Alt + I</kbd>      | Show Developer Tools             |

> **Note** – Changing the opacity is only supported in Windows and MacOS

**Detached Mode** 
* Enabling the detached mode makes Pennywise non-interactive – it will let any interactions fall through to the window below it. To remove the detached mode, focus the window either by clicking the dock icon or by activating it using <kbd>alt + tab</kbd>

## Screenshots

> Homescreen for the application

![](https://i.imgur.com/u7fAT99.png)

![](https://i.imgur.com/CeLYoux.png?1)

> Anything running in pennywise stays on top of everything

![](https://i.imgur.com/BbqZmcK.png)

![](https://i.imgur.com/8VDKGYX.png)

> You can change the opacity too

![](https://i.imgur.com/Xa7inTY.png)

![](https://i.imgur.com/9D3gZwn.png)

## Auto-embed Videos
For some video streaming websites such as Youtube, Vimeo, Twitch, Daily Motion etc, Pennywise shows you the video only web page by default (using the auto-generated embed links), showing you the video in a distract free manner. You can disable that by toggling the `Edit > Embed Videos`.

> **Note** – In case of youtube, [it might not work sometime](https://github.com/kamranahmedse/pennywise/issues/62) when the user has put restrictions on the video – in that case, you will have to disable "Auto Embed" option from the Edit menu to make them work. 

#### Why is it named Pennywise?

Because the application helps in floating and [Pennywise loved to do that](http://www.youtube.com/watch?v=WzjWMLv_ZJI&t=3m15s)

![](https://i.imgur.com/bN2ixL7.gif)

## Planned Roadmap

* [ ] Persist options and linking options to website
* [ ] Bookmarking links for later use
* [ ] Write tests

## Contributions
Feel free to implement anything from the roadmap, submit pull requests, create issues, discuss ideas or spread the word.

## License
MIT &copy; [Kamran Ahmed](https://twitter.com/kamranahmedse)
