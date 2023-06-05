**GETTING STARTED**
- Change directory to the desired location 
```
cd /path/location/here
```
- Pull the GitHub repository onto your local machine. Please ensure that the branch of the repository being pulled is `master`; this is the main branch with all of the functioning code.
```
git clone https://github.com/niztg/FindAChamp && git pull
```

- Ensure that `node.js` is downloaded on your machine and the `npx` command is working. [Instructions on how to download node.js](https://nodejs.org/en/download)
Run
```
npx install-expo-modules@latest
```
- Change directory to project folder
```
cd FindAChamp
```
Run in terminal 
```
npm install
```
- Change your directory to `server copy` by running in terminal:
```
cd server copy
```
- Run in the terminal:
```
npx expo start
```
- Download the `Expo Go` app on your mobile device.
  > Note: An Android or Apple device may be used, but the app is intended for Android functionality. Therefore, some of the App’s features and layout may be omitted from iOS devices.

- Scan the QR code in order to access the server
    > Alternatively: input the address to the app.
        > usually in the format {expo:// $$$.$$$.$.$:PORT}
