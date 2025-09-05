---
title: "Perpetual Motion"
summary: "My first real job Developing Software"
date: "04-09-2025"
edited: "05-09-2025"
---

# Software Developer & IT Manager
# My First Coop

I joined the Perpetual Motion team in April 2025 as a Software Developer co-op student. Perpetual Motion 
is a small business in Guelph that organizes sports leagues throughout the city. You might be wondering, 
“Why does a business running sports leagues need a full time software developer under its umbrella?” - well, 
let me tell you.

The company is almost entirely managed by only three people on the day-to-day over the summer. 
Dave, the owner of the company, a marketing co-op student, and a software developer co-op student 
(me as of writing). That's right, three people managing over 580 teams across 8 different sports 
over the summer, and just one person from fall through spring. How do we do this? Largely in part 
by proprietary software built entirely by past and present University of Guelph software engineering 
and computer science co-op students.

Student developers employed by Dave at Perpetual Motion have from the ground up built a custom control 
panel that automates an enormous amount of tasks that would traditionally take up crazy amounts of 
time, some of which include the following:

- Accepting player score submissions though a user facing score reporter interface
- Automatically calculating and posting standings online after games
- Automatically sending out emails when players forget to submit scores
- Tools to drag and drop individual players or groups of players to build teams
- Tracking teams who have been consistently reported of having low spirit (unfriendly team)
- Automatically accepting payments
- Archiving team photos and data from previous years
- Systems to import xlsx schedule files into beautifully rendered html schedules for the web

Or even just simple tasks that need to be performed more and more often as the leagues grow over time. Some examples include:

- The generation of emails for various important information, such as informing a player who signed up individually who is on their team, where the first game is, where to find the schedule, and more.
- Systems that catch when there are mismatches between scores that teams upload though the score reporting system (e.g. both teams claim they won)
- Markers to track which teams are in need of more males or female players

While there are a lot of tools nowadays that can do many of these tasks, there are simply no tools that 
exist that perform many of the hyper specific applications we have well. Building out our own tool set 
allows us to save money on third party services, as well as have tools designed specifically for our 
applications. Many of the tasks the control panel helps perform on their own are pretty minuscule. However, 
as our leagues grow larger and larger the sheer amount of tasks that arise on the day to day become way 
too much for a team of people to handle, let alone just three over the summer, and only one person 
for the remaining seasons.

<br/>

## My Projects

During the seasons the company does not employ co-op students (fall though to spring), tasks that are 
time-consuming, as well as tasks that could be considered worth automating are noted down by Dave. As 
this year's co-op student, it was my job to take the list and implement the tools to the best of my
abilities. At the start of my work term this is what my initial list of “TODOs” looked like.

1. Rebuild the system responsible for generating the user facing UI to display schedules, standings, and team pages. This included porting an older system built with PHP and vanilla html with javascript to React, as well as implementing features the old system lacked.
2. Build out a set of administrative tools to track and visualize which teams/players have and have not signed waivers (either on paper or online), send out automated emails to players who have not completed waivers, all while allowing the information to be easily searchable.
3. Build out an email template system to quickly pull data for various common situations, such as when a game is cancelled, when people report conflicting scores, or when people have not paid their fees or signed waivers.
4. A slew of bug fixes and UI tweaks to make the admin control panel easier to use, and less cumbersome in certain areas. This included fixing various pages not loading, fixing certain buttons that were not working as expected, adding small missing features like the ability to move people on and off registration waitlists, opening player information quick edit pages when their names are clicked in various places though the control panel, and so much more.

As I worked my way through the list, more and more ideas and tasks would pop up. Part of my job was to notice 
what things could be improved, then tackle improving them. There was never a shortage of features to add, 
or bugs to fix. There is always something.

<br/>

## Implementation - Email Template System:

Originally the plan for this was just simply hard code a few email templates for certain cases. Where we are friendly, 
sending similar emails. This changed when we realized how many places we could apply this system to, and we want the ability 
to change them on the day to day easily.  The system I created allows admins (us) to quickly prepare emails to people for 
certain events, some of which include:

- Notifying teams of certain matches that have been cancelled
- Asking team captains to get their team members to sign waivers
- Asking team captains to submit scores from a previous night
- Asking team captains for clarification on reported score data in cases of mismatches
- Requesting team captains to send payments for emails
- Sending first game information regarding where the first game will take place, who is on their team, and where to sign waivers and submit scores

<br/>

### Snippet of the UI built

![Email Templates UI](https://www.metallicgoat.ca/blogs/pmotion/EmailTemplatesUI.png)

As you can see, each template has a list of copyable placeholders relevant to the situation of the template. 
It even supports cheating hyperlinks, and editing the placement of the cursor when the email modal (shown below) 
is open. This hard coded situations are accessible as buttons throughout the panel as shown in the example below:

![Unbalanced Standings UI](https://www.metallicgoat.ca/blogs/pmotion/UnbalancedStandingsEmailButton.png)

Here we can see “Huck It” reported a tie, where “Fat Stacks” reported a win. Due to this conflict the unbalanced 
standings email template button appears. When clicked, an email will be prepared with all the relevant information pre-filled 
in using the placeholders specified in the edit templates UI (ie, their name, what game we are referring to, 
and what conflicting information was reported). Building this email by hand is repetitive and time-consuming. In the past we 
would manually have to search for their email, the names of who reported what, what team was played against, and what 
was reported all by hand. Then, we would repeat the process for the opposing team. All this information was 
already available in our database, so a template for this was a no-brainer. Since it merely opens a template to work 
off of, we can easily manage specific issues that are out of the norm. For example if teams intentionally input 
conflicting scores due to interpersonal conflicts (disagreements over who won and such). Those situations often 
require more care, and the beauty of my template system is that it allows for that.

In addition to having templates for hard coded situations, the email template system also allows for building 
“mass-email” templates. An example of this might be we want to remind all volleyball teams to lock the equipment 
up before they leave. In this case a template can be made. And we select which players we want to target in an email.

![Email List Blurred](https://www.metallicgoat.ca/blogs/pmotion/EmailListBlurred.jpg)

In the UI shown in the image above, you can see how the panel allows you to select a sport, then league, then 
team to target whatever group we need to target. To the left you can select a template, then press email to finally 
prepare the email! Once the button is pressed the prefilled email modal is opened. You can then choose to edit the 
email as you see fit (or not), then open a browser mailto window, or send it directly from our local email server.

![Email Modal Blurred](https://www.metallicgoat.ca/blogs/pmotion/EmailModalBlurred.jpg)

<br/>

## Implementation - Schedules and Standings Widgets:

The schedules and standings widgets are definitely what I enjoyed working on most, for reasons which I will go into 
later. Our previous UI was built with PHP, vanilla HTML, and Javascript. The UIs were embedded into our website 
using HTML IFrames. They had a variety of issues, mainly being that with every season we were required to update 
the url of every one of our schedule, standings, and team page iFrames for every league individually. Not only was 
this enormously time-consuming, it suffered a lot from human error (i.e. forgetting to update the standings page from 
season to season, or mismatching league schedule pages). In addition to being time-consuming to maintain and prone to 
errors for us admins, the IFrames made the user experience horrible. Embedding iFrames into pages often introduced 
weird behaviors such as double scrolling on pages, and even triple embedded scrolling occasionally. My task was to 
design a new system to allow schedules to be easy to update, and much more user-friendly, all while looking a lot 
cleaner at the same time.

My new widgets were made with React and Typescript. Instead of using iFrames to display the pages, my new system relied 
on an empty div placed in our WordPress page, with a script next to it. The script would look for the empty div, 
then inject the content directly into the div. This made the experience less clunky, especially on mobile devices. 
The new UI is also built to be vastly more compact, and easier to read and navigate. The new system implemented 
various basic features the old system lacked such as back buttons (which previously would require used to reload 
their page to go back)

### Here is what the new system looks like:

![Schedules Standings Widget](https://www.metallicgoat.ca/blogs/pmotion/SchedulesStandingsWidget.png)

Previously each page was nested under vertical wordpress dropdowns. To maintain the sections, we would have had to 
manually update the URL of 15 different iFrames for the case shown above. Now, no editing is required, since the information 
is pulled from the rest API. The new system I designed allows the user to navigate both between leagues, and their league’s 
corresponding tabs, all from a single UI. It can be entirely controlled and updated from our admin control panel as shown later.

![Schedules UI](https://www.metallicgoat.ca/blogs/pmotion/SchedulesUI.png)
![Standings UI](https://www.metallicgoat.ca/blogs/pmotion/StandingsUI.png)
![Team Page Widget](https://www.metallicgoat.ca/blogs/pmotion/TeamPageWidget.png)

The new corresponding administrative UI allows us to control when leagues and schedules become available though the web 
as a whole, with specific configurations that are available for leagues individually for the cases where a schedule needs 
to be rethought do to a team dropping out (or whatever other reason):

### General Sport Controls
![Timeline Controls](https://www.metallicgoat.ca/blogs/pmotion/TimelineControls.png)

### League Specific Controls
![Sport Settings UI](https://www.metallicgoat.ca/blogs/pmotion/SchedulesStandingsControls.png)

Our admin server hosts a rest API that the user facing widgets on wordpress then pulls their data from. This allows us to 
make immediate changes, and have them instantly live on our website. It's simple, but very effective.

There were a variety of reasons why these widgets were what I enjoyed working on most. The biggest reason being that I had the 
opportunity to work on all aspects of web development, and specifically our webstack. I got to work on the server's API written 
in PHP, the new client written in Typescript in React, as well as the old system which was written with Vanilla Javascript and HTML.
I got to build the admin tools to control the widgets, including the admin UI, and the related databases. I also built the client 
UI which interacts with data hosted on the rest API I just built. I actually got to see my work in action, with real people using 
it and providing feedback. Over the summer I played in our volleyball leagues, becoming a user from both the admin, and client facing 
tools I built. It's one thing to build something cool, and another thing to see something you build in real action, and I got too up close.

<br/>

## Implementation - Waiver Tracking System

All in all, the waiver tracking system was pretty simple compared to the rest of what I have worked on. It works as follows. 
When people sign waivers, they are required to enter their name, and optionally their email address. When they do, they are 
added to a waivers database table with the information they filled out, as well as a time stamp. The tool can then simply 
just pull information for all the players currently registered, and compare it against the waiver information within the 
database. This is the resultant UI I built:

![Waivers Control Panel](https://www.metallicgoat.ca/blogs/pmotion/WaiversControlPanel.jpg)


Once all the people who have not signed are identified, the tool can integrate with the email template system I built 
to allow us to quickly contact the team captains prefilled with the names of players who have not signed, and how to sign online.

![Waivers Email Template](https://www.metallicgoat.ca/blogs/pmotion/WaiversEmailTemplate.png)

Data is only compared against people who have not signed waivers or for at least a year. It also provides us with an option 
to mark a player as having signed on paper, so we can easily remove them from our list if they decide to hand in paper waivers.

![Sign On Paper](https://www.metallicgoat.ca/blogs/pmotion/SignOnPaper.png)

We can also press a button to queue out mass emails to all people who have not signed waivers.

<br/>

## Implementation: Other Admin UI’s Built

Tools to edit, add and delete venues and their information that are currently in use. When building the web schedules, 
this information is pulled to automatically add google maps hyperlinks and such.

![Venues Control Panel](https://www.metallicgoat.ca/blogs/pmotion/VenuesControlPanel.png)


A tool to edit sport specific settings. In the past, these settings were changed manually in our database, which becomes 
more and more of a problem if we need to update settings more and more frequently.

![Sport Settings UI](https://www.metallicgoat.ca/blogs/pmotion/SportSettingsUI.png)

<br/>
<hr/>
<br/>

I joined the team having a few years of programming experience already under my belt. This allowed me to jump right in 
feeling fairly confident with what I was doing. That being said, there was so much that I did not know and had to learn. 
Before joining Perpetual Motion, my only experience working web applications was limited to my own personal websites, 
as well as a website for another one of my projects, MBedwars. Both of these websites generally just render static content. 
Working on a web app that needs to interact with a database on such a large scale was very different from anything I have 
previously worked on. Vastly more complicated. I was required to learn new languages such as PHP, as well as how to work 
with SQL databases, how to build web UI’s that work with a rest API, as well as how to build out the rest API’s the client 
would actually be interacting with.

After my experience, I feel I now have a solid understanding of the PHP language, how SQL databases are structured and how 
to properly query them, how rest API’s work and how they should generally be designed, how to build intuitive web UIs, what 
Bootstrap CSS and why its so handy, how emails servers work along with how to host them, what SPF records are, and sooo 
much more. I also feel a lot more comfortable writing PHP, HTML, working with React, JavaScript and TypeScript, and working 
with front end JavaScript libraries like Mantine.

All and all I had a fantastic time working at Perpetual Motion. The atmosphere working at a small company was a great experience. 
I had the freedom to both design and implement the front and back end of our web stack with awesome guidance and support. 
We would have opportunities to take breaks from working at our computers to help out clean up our volley courts, or prepare 
equipment for our teams - which became the best times to discuss our ideas. I am very happy I got to work with Perpetual Motion 
over my co-op. I plan to come to do some part time shifts this fall!

<br/>
<br/>

# Special Thanks
Huge thank you to Dave Kelly for having me for my summer co-op this summer. I had an awesome time learning about how to 
efficiently operate a small business. Playing in the VolleyBall leagues, and meeting so many people around the city was 
a great experience as well. I also want to thank Darek Dekroon for code reviewing all my pull requests, and giving me so
much amazing advice and tips. I really appreciate it!


