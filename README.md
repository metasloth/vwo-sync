# vwo-sync
Update your VWO variations from local files in real-time

## Requirements
* node.js
* VWO API token with admin privilages

## Usage

1. Install the dependencies with `sudo npm install`

2. Copy the contents of `config-template.json` into a file `config.json` and update the values accordingly

3. Launch the watcher with `node main.js` or `npm start`

4. With the app running, everytime a watched file is saved the VWO variation will be updated