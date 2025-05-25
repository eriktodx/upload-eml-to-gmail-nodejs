# Gmail EML Importer

This Node.js application imports `.eml` email files into a specified Gmail label using the IMAP protocol. It processes email files from a designated directory, uploads them to Gmail, and tracks processed files to avoid duplicates. The script includes logging, retry logic for robustness, and a keep-alive mechanism to maintain the IMAP connection.

## Features
- Imports `.eml` files into a Gmail label via IMAP.
- Tracks processed files to prevent re-importing.
- Logs operations to both console and a file for debugging.
- Implements retry logic for handling transient errors.
- Maintains IMAP connection with periodic keep-alive queries.
- Preserves email dates during import.

## Prerequisites
- **Node.js**: Version 14 or higher.
- **Gmail Account**: With IMAP enabled and an App-Specific Password (if 2FA is enabled).
- A directory containing `.eml` files to import.
- The target Gmail label created in your Gmail account.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/gmail-eml-importer.git
   cd gmail-eml-importer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Application**:
   Create a `config.js` file based on the provided template or edit the existing one. Update the following fields:
   - `imap.user`: Your Gmail address (e.g., `yourname@gmail.com`).
   - `imap.password`: An App-Specific Password (generate one in your Google Account settings if 2FA is enabled).
   - `emlDir`: Path to the directory containing `.eml` files (e.g., `/path/to/eml/files/`).
   - `gmailLabel`: The Gmail label to import emails into (e.g., `Imported`). Ensure this label exists in Gmail.
   - `logFile`: Path to the log file (e.g., `import_eml_log.txt`).
   - `processedFile`: Path to the file tracking processed `.eml` files (e.g., `processed_eml.txt`).

   Example `config.js`:
   ```javascript
   module.exports.config = {
     imap: {
       user: "yourname@gmail.com",
       password: "your-app-specific-password",
       host: "imap.gmail.com",
       port: 993,
       tls: true,
       tlsOptions: { rejectUnauthorized: false },
     },
     emlDir: "/path/to/eml/files/",
     gmailLabel: "Imported",
     logFile: "import_eml_log.txt",
     processedFile: "processed_eml.txt",
   };
   ```

## Setup Gmail
1. **Enable IMAP**:
   - Go to Gmail Settings > "See all settings" > "Forwarding and POP/IMAP".
   - Enable IMAP under the "IMAP access" section.
2. **Generate an App-Specific Password** (if 2FA is enabled):
   - Go to your Google Account > Security > 2-Step Verification > App passwords.
   - Generate a new password for "Mail" and use it in `config.js`.
3. **Create the Target Label**:
   - In Gmail, create the label specified in `config.gmailLabel` (e.g., `Imported`).

## Usage
1. **Run the Script**:
   ```bash
   node index.js
   ```

2. **What Happens**:
   - The script connects to Gmail via IMAP.
   - It reads `.eml` files from the specified `emlDir`.
   - Each `.eml` file is parsed and uploaded to the specified Gmail label.
   - Processed files are logged in `processed_eml.txt` to avoid re-processing.
   - Logs are written to both the console and `import_eml_log.txt`.
   - The script retries up to 100 times on failure, with a 5-second delay between attempts.
   - A keep-alive query runs every 30 seconds to maintain the IMAP connection.

3. **Monitoring**:
   - Check `import_eml_log.txt` for detailed logs, including successes, failures, and errors.
   - The console displays real-time progress, including the number of files processed, successes, and failures.

## File Structure
- `index.js`: Main script that handles IMAP connection, file processing, and uploading.
- `config.js`: Configuration file for IMAP settings, file paths, and Gmail label.
- `package.json`: Project metadata and dependencies.
- `LICENSE`: MIT License for the project.
- `import_eml_log.txt`: Generated log file (after running the script).
- `processed_eml.txt`: Generated file tracking processed `.eml` files.

## Dependencies
- `fs-extra`: Enhanced file system operations.
- `imap`: IMAP protocol client for Gmail interaction.
- `mailparser`: Parses `.eml` files to extract email data.
- `moment`: Date parsing (used indirectly via mailparser).
- `winston`: Logging to console and file.

## Troubleshooting
- **IMAP Connection Errors**:
  - Verify `imap.user` and `imap.password` in `config.js`.
  - Ensure IMAP is enabled in Gmail settings.
  - If using 2FA, use an App-Specific Password.
- **Label Not Found**:
  - Ensure the `gmailLabel` exists in Gmail (case-sensitive).
- **File Not Found**:
  - Check that `emlDir` points to a valid directory with `.eml` files.
- **Logs**:
  - Review `import_eml_log.txt` for detailed error messages.

## Contributing
Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author
Erik Kralj, 2025