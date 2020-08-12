# Helpful Human Applicant Interview Challenge

Welcome to Helpful Human's at home proficiency challenge! This challenge gauges your knowledge on a few different metrics that we use, in part, to evaluate your skills. In this repo, you will find the assets that are required to replicate the design that is also included in this repo. Both .sketch and .png assets are available.

To get started, clone this repo. Add your work to it in whatever structure you prefer, then push it to your own, renamed repo. When you are finished, follow the instructions at the end of this document.

This challenge has different milestones.

## Core
Stated briefly, the core goal is to create a simple but functional app that has a data, view and logic layer. The app will display color swatches, and that's about it!

The core goals should be completed in full. 

## Stretch
The stretch goals can also be met if you choose to do so. Not completing the stretch goals does not disqualify you in any way nor will it lead to a disadvantage in comparison to other applicants.

## Bonus Stretch
Bonus stretch goals inherit properties of stretch goals but completing these goals will say to us, "I believe the code I've written for the core goals and the stretch goals is production ready".

## Additional Information
An applicant completing a well thought out solution to the core challenges is just as meaningful to us as a solution that completes all goals but is not implemented very well.

If you'd like to implement additional functionality, or change the functionality of this challenge, feel free but be prepared to discuss your reasoning for doing so. We like critical thinking. We don't like improper implementation without reason.

## Time
Keep track of how much time you spent on the challenge but also feel free to spend as much time as you want. Your time is very valuable and we are thankful you're taking the time demonstrate your skills for us.


## Core Goals
- Replicate design
  - [Font](./FONT.md)
  - Styles
  - Iconography
- Replicate functionality
  - Create a database of colors (minimum 100)
  - Paginate your data to show a certain number of swatches at a time
  - Display both the color swatch and the label of the color
  - Ability to select random color and modify view accordingly
  - Clicking swatch changes to color detail view

## Stretch Goals
- Design
  - Make it responsive
- Functionality
  - Generate color list from a script

## Bonus Stretch Goals
- Design
  - Include interaction design
  - Add tints/shades in detail view

- Functionality
  - Add search functionality
  - Color generation script guarantees same colors and order
  - Group by color (Make sidebar menu functional)

- Data
  - Fetch data with GraphQL


## Deliverables
In your email submission response to the test invitation from AngelList, please include the following:
- Link to your repo
- URL to your hosted App (Use a free hosting service of your choice)
- [Include a Donger](http://dongerlist.com/) that best represents your state of mind when complete

Thanks and we look forward to your submission!

ლ ( ◕  ᗜ  ◕ ) ლ


# Reflections
୧〳 ” ʘ̆ ᗜ ʘ̆ ” 〵୨

I really enjoyed working on this application! While I think the overall quality of my code needs improvement, this was a perfect way to throw myself into learning javascript.

This definitely took me longer to finish than it should have, but in my defense I spent a lot of time learning.

I should note, for color conversions (hex -> rgb -> hsl) I snagged code from `https://css-tricks.com/converting-color-spaces-in-javascript/`.

## Things I learned:
- Laying out structure beforehand is important. I had to rewrite a bunch of code, because it wasn't set up for switching between the grid & detail views.
- For this app, any questions I had were inherently pretty basic. So, most of my questions had answers on youtube and stackoverflow. However, sometimes these answers meant nothing to me, because I didn't fully understand why I had an error.
- Diving straight in w/o a plan = no bueno.

## Things to improve:
- Organized code: I found that when I was making adjustments on my code, I found it quite difficult to navigate to where I needed to go.
- Intentional code: Some of my code I sort of just threw at the wall, hoping it would form properly. Next time it will make things easier if I think things out beforehand.
- Time efficiency: When I was trying to learn about a topic I found myself reading up on offshoots in order to try and get a better scope on the topic. However, this meant I spent a lot of time on things that weren't as important. I will need to be much more intention when learning about a topic in the future.

## Things to investigate:
- I'm not totally sure my pagination/view switching system is... proper.
- In this case, it might have been better to split my javascript into multiple files.
- Javascript files interacting w/ each other
- JSON data retrieval: I wrote node.js code for successful JSON writing/reading, but when I tried adding it to my main.js file, things broke. In different cases, either `require()` wasn't defined (meaning that the node.js code wasn't working) or `document` was not defined (meaning that my html js code wasn't working). I need to figure out why I had to pivot to one or the other. 
- Using Heroku: how the whole 'ecosystem' works. I thought I had node.js set up properly, but the `require()` method didn't seem to be working properly...
- GraphQL