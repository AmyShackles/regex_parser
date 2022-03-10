# regex parser

## Vision
The end goal for this project is the ability to create a VSCode extension that can scan JavaScript/TypeScript files, identify regular expressions being used within those files, and then display (on hover) a human-readable description of what that regular expression is matching.

## Caveats
This is one of those projects that can easily get out of hand quickly.  There is a _lot_ of functionality available in JavaScript's flavor of regular expressions and one can descend into the madness that is the infinite possibility of what this project could be.  Believe me.  I've _been there_.  Multiple times.  This is not the first iteration of this project.  😅

## Plan

I have tried to map out all the different parts of regular expressions I want this project to be able to handle in [this](https://trello.com/b/ffUsEjSm/organizing-chaos) Trello board.

However, I have _not_ made clear what's already been implemented.  Though, I suppose since none of it is tested, it's a bit like none of it has been. 😅

Steps:
- [x] Come up with linting/formatting rules for the project.  Those currently in place are by no means final
- [x] Set up linting/formatting hooks to ensure committed code is styled according to the rules of the repo (I think this part's done)
- [ ] Go through code already written in a feverish excited fugue state and add more comments to describe what's happening where it might not be obvious
- [ ] Split individual parts off into functions to make testing of them easier
- [ ] Add testing for work already done
- [ ] Once there is 100% code coverage, add a rule to enforce it
- [ ] Continue working on building out the parser
