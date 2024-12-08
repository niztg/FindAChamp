<h1>Find a Champ</h1>
Find a Champ is a mobile app which allows users to take pictures of and identify mushrooms they find in their travels. Intended for mushroom enthusiasts of all forms, Find a Champ offers an intuitive way to store all the mushrooms you find along your travels and retain information regarding them. With a slick and minimalistic UI, Find a Champ allows users to take pictures of mushrooms and have them automatically identified by a robust machine learning algorithm, and store notes about all their finds for future reference. The clients being avid nature venturers have reported a high degree of satisfaction with Find a Champ as this educational and practical app gives them an easy and compact way to enrich their travels.
<br>
<br>

**GETTING STARTED**
- Pull the GitHub repository onto your local machine. Please ensure that the branch of the repository being pulled is `master`; this is the main branch with all of the functioning code.
- Ensure that `node.js` is downloaded on your machine and the `npx` command is working.
- Change directory to project folder ($cd FindAChamp)
- Change directory to Machine Learning ($cd “Machine Learning”)
- Install the machine learning requirements ($pip install -r requirements.txt)
- Run $python creatingModel.py to save the model
- Change host in app.py to be set to your IP Address
- Run python app.py when the model is saved to start the server
- Go back to the parent directory ($cd ../)
- Run in terminal: $ npm install
- Change the url of the post request in ImageTaken (in src/components) to http:// Your IP ADDRESS:5000/mushroom
- Run  `npx expo start` in the terminal.
- Download the `Expo Go` app on your mobile device.
- Note: An Android or Apple device may be used, but the app is intended for Android functionality. Therefore, some of the App’s features and layout may be omitted from iOS devices.
- Scan the QR code in order to access the server 
- Alternatively: input the address to the app.
- usually in the format {expo:// $$$.$$$.$.$:PORT}

<br>
Developer note:
Repository from which REST API and other backend modules run can be found at the following link: https://github.com/TamirPol/FindAChampBackendAPI
Developers: Tamir Polyakov, Nizamullah Ansari, Khalid Bedir

