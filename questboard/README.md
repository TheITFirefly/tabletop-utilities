# Usage Instructions
## Displaying The Board
The quest board was written with static `HTML/CSS/JS`, and makes use of local browser storage for importing quests, no internet connection required. The `CSS` has been made responsive to screen size, so just throw up a web browser with the `index.html`, make use of the provided example JSON to make your quests, sort by your party's level, and have fun! When you want to make a change to the board status, change the `JSON` appropriately, and reupload the new version.

## Hiding/Showing quests
Got a quest that's too high level for your party, but it's essential for the campaign? Not a problem, that's what the `overrideVisibility` in the `JSON` is for. Got a quest that you don't quite want your party to take on yet, even though they're of a correct level? Well you can do that too! The tooltip on the quest board shows you possible values for this optional field in the `JSON`.

# Acknowledgements
Don't forget to check the [acknowledgements](acknowledgements.md). I want to make sure if I use others' work, they get acknowledged for it.
