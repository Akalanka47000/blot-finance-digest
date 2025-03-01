package=$(echo $(cat ./package.json) | jq '.workspaces = ["'"$1"'", "packages/*"]')
echo "$package" > "./package.json"