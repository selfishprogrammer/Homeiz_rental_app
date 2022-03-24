set -e

# Setup project dependencies
printf "NPM installing\n"
npm install

# Setup ScanditSDK
printf "Setting up ScanditSDK\n"
cd ios
printf "Pod installation\n"
# for intel chip mac
pod install

# for M1 chip mac
# arch -x86_64 pod install

printf "Completed! (:\n"
