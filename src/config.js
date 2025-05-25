module.exports.config = {
  imap: {
    user: "yourname@gmail.com", // Replace with your Gmail address
    password: "your-app-specific-password", // Replace with App-Specific Password
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  emlDir: "/path/to/eml/files/", // Directory containing .eml files
  gmailLabel: "Imported", // Gmail label to upload to (create in Gmail first)
  logFile: "import_eml_log.txt",
  processedFile: "processed_eml.txt", // Tracks processed files
};
