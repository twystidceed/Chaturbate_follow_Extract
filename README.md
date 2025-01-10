# Extract Chaturbate Followed Cams

A **Tampermonkey script** designed to help you extract usernames and URLs of online followed models from Chaturbate. The script adds a button to the page, allowing you to download the data as a text file with just a single click.

## Features
- Extract URLs of all **online/offline followed models**.
- Automatically generates and downloads a `.txt` file with the data.
- User-friendly **button interface**, positioned at the **top center** of the page.
- Works seamlessly with Chaturbate's dynamic content.

## How It Works
1. **Install** the script in Tampermonkey or a similar userscript manager.
2. **Visit** the [Chaturbate Followed Cams page](https://chaturbate.com/followed-cams/).
3. **Click the "Extract Followed Cams" Button**:
   - The button is located at the **top center** of the page.
   - Once clicked, it generates a text file containing the URLs of all online followed models with a date/time stamp included.

4. **Download the Data**:
   - The script automatically downloads the text file named `followed_cams.txt`.

## Installation
1. Install the [Tampermonkey extension](https://www.tampermonkey.net/) for your browser.
2. Create a new script:
   - Open Tampermonkey, click **Dashboard**, and then click **Create a New Script**.
3. Paste the script into the editor:
4. There are 2 versions..
- 2.1 will only include a date/time stamp in the file name
- V2.1.1 will include page numbers in the filename for those who wish to know which page they have downloaded. This will help for downloading more than 2 or 3 pages of model urls. 
5. Save the script.
6. Navigate to the Followed Cams page on Chaturbate and you're ready to go!
7. The button will only display while you are in one of the followed pages, once you navigate away it will vanish. 

## Usage
1. Open the Chaturbate Followed Cams page.
2. Look for the Blue "Extract Displayed Cams" button at the top center of the page.
3. Click the button to start extracting the data.
A text file (.txt) will be downloaded automatically, containing the profile URLs tht were displayed on that particular page.

## Example Output
- The downloaded .txt will look like this:
...
- `https://chaturbate.com/username1/`
- `https://chaturbate.com/username2/`
- `https://chaturbate.com/username3/`
...
- All urls will be put into alphabetical order as well.

## Requirements
- Browser: Any modern web browser that allows userscript extensions (Chrome, Firefox, Edge, etc.).
- Tampermonkey extension (or similar userscript manager).

## Limitations
- The script only works when logged into your Chaturbate account.
- Designed for the Followed Cams page will not work on other parts of the site.
- If Chaturbate updates its page structure, the script may require modifications.

## Contributing
- Feel free to contribute by submitting issues or pull requests. Suggestions for improvements are always welcome!

## License
- This project is licensed under the GNU GENERAL PUBLIC LICENSE v3 License. See the LICENSE file for details.
