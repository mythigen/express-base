#!/bin/bash

# Configuration
LOG_DIR="./logs"
LOG_FILE="app.log"
ARCHIVE_DIR="${LOG_DIR}/archive"
DATE=$(date +"%Y-%m-%d")

# Create archive directory if it doesn't exist
mkdir -p "$ARCHIVE_DIR"

# Rotate the log files
if [ -f "${LOG_DIR}/${LOG_FILE}" ]; then
  # Move the current log file to archive with date
  mv "${LOG_DIR}/${LOG_FILE}" "${ARCHIVE_DIR}/${LOG_FILE}-${DATE}.log"
  
  # Compress the archived log file
  gzip "${ARCHIVE_DIR}/${LOG_FILE}-${DATE}.log"

  # Create a new empty log file
  touch "${LOG_DIR}/${LOG_FILE}"
  
  echo "Logs rotated: ${LOG_FILE} moved to ${ARCHIVE_DIR}/${LOG_FILE}-${DATE}.log.gz"
else
  echo "No log file found to rotate."
fi

