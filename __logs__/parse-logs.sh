#!/bin/bash

# Configuration
LOG_FILE="./logs/app.log"

# Check if log file exists
if [ -f "$LOG_FILE" ]; then
  # Display a summary of log levels
  echo "Log level summary:"
  
  # Count occurrences of different log levels
  grep "INFO" "$LOG_FILE" | wc -l | awk '{print "INFO: " $1}'
  grep "WARN" "$LOG_FILE" | wc -l | awk '{print "WARN: " $1}'
  grep "ERROR" "$LOG_FILE" | wc -l | awk '{print "ERROR: " $1}'

else
  echo "Log file not found: $LOG_FILE"
fi

