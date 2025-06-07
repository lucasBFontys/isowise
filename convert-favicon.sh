#!/bin/bash

# Install required tools if not present
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    brew install imagemagick
fi

# Convert SVG to different sizes
convert -background none -size 32x32 public/favicon.svg public/favicon.ico
convert -background none -size 32x32 public/favicon.svg public/icon.png
convert -background none -size 180x180 public/favicon.svg public/apple-icon.png

echo "Favicon files have been generated!" 